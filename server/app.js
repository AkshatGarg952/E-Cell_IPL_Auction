const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const crypto = require('crypto');
require('dotenv').config();
const questions = require('./data/questions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize PostgreSQL Pool
const connectionString = process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL;

const poolConfig = connectionString
    ? {
        connectionString,
        ssl: {
            rejectUnauthorized: false, // Required for Railway/Heroku
        },
        max: 20, // Max clients in pool
        idleTimeoutMillis: 30000,
    }
    : {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'ecell_db',
        password: process.env.DB_PASSWORD || 'password',
        port: process.env.DB_PORT || 5432,
        max: 20, // Max clients in pool
        idleTimeoutMillis: 30000,
    };

const pool = new Pool(poolConfig);

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Initialize Schema
const initDb = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS teams (
                id VARCHAR(255) PRIMARY KEY,
                teamName TEXT NOT NULL,
                leaderName TEXT NOT NULL,
                scholarNumber TEXT NOT NULL,
                score INTEGER DEFAULT 0,
                status VARCHAR(50) DEFAULT 'registered',
                startTime BIGINT,
                endTime VARCHAR(255),
                answers TEXT,
                timeTaken INTEGER,
                sessionToken VARCHAR(255)
            );
        `);
        console.log("PostgreSQL Schema Initialized.");
    } catch (err) {
        console.error("Error initiating schema:", err);
    } finally {
        client.release();
    }
};

initDb();

// Helper: Database Wrappers for easier migration
const dbRun = async (sql, params = []) => {
    const res = await pool.query(sql, params);
    return res;
};

const dbGet = async (sql, params = []) => {
    const res = await pool.query(sql, params);
    return res.rows[0];
};

const dbAll = async (sql, params = []) => {
    const res = await pool.query(sql, params);
    return res.rows;
};

// --- Routes ---

// 1. GET /api/questions (Sanitized - NO ANSWERS)
app.get('/api/questions', (req, res) => {
    const sanitizedQuestions = questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options
    }));
    res.json(sanitizedQuestions);
});

// Helper to generate token (Replaced by crypto.randomUUID)

// 2. POST /api/register (Check if team exists, else create)
app.post('/api/register', async (req, res) => {
    const { teamName, leaderName, scholarNumber } = req.body;

    if (!teamName || !leaderName) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        // Check for duplicates (Case Insensitive)
        const existing = await dbGet("SELECT * FROM teams WHERE LOWER(teamName) = LOWER($1)", [teamName]);

        if (existing) {
            // Generate NEW session token (invalidates old sessions)
            const token = crypto.randomUUID();
            await dbRun("UPDATE teams SET sessionToken = $1 WHERE id = $2", [token, existing.id]);

            return res.json({
                message: "Welcome back!",
                teamId: existing.id,
                startTime: existing.starttime ? parseInt(existing.starttime) : null, // Handle BigInt
                sessionToken: token
            });
        }

        const newTeamId = crypto.randomUUID();
        const token = crypto.randomUUID();

        await dbRun(
            `INSERT INTO teams (id, teamName, leaderName, scholarNumber, sessionToken) VALUES ($1, $2, $3, $4, $5)`,
            [newTeamId, teamName, leaderName, scholarNumber, token]
        );

        res.json({ message: "Registered", teamId: newTeamId, sessionToken: token });

    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ error: "Database error during registration" });
    }
});

// 2.5 POST /api/heartbeat (Check if session is valid)
app.post('/api/heartbeat', async (req, res) => {
    const { teamId, sessionToken } = req.body;

    if (!teamId || !sessionToken) {
        return res.status(400).json({ error: "Missing identity" });
    }

    try {
        const team = await dbGet("SELECT sessionToken FROM teams WHERE id = $1", [teamId]);

        if (!team) {
            return res.status(401).json({ error: "Team not found. Please login." });
        }

        if (team.sessiontoken !== sessionToken) {
            return res.status(409).json({ error: "Session active on another device." });
        }

        res.json({ status: "active" });

    } catch (err) {
        console.error("Heartbeat Error:", err);
        res.status(500).json({ error: "Internal error" });
    }
});

// 2.5 POST /api/start-quiz (Sets the official start time)
app.post('/api/start-quiz', async (req, res) => {
    const { teamId } = req.body;

    try {
        const team = await dbGet("SELECT startTime FROM teams WHERE id = $1", [teamId]);

        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        // If already started, return existing start time
        if (team.starttime) {
            return res.json({
                startTime: parseInt(team.starttime), // Handle BigInt
                message: "Quiz already in progress"
            });
        }

        // First time starting
        const startTime = Date.now();
        await dbRun("UPDATE teams SET startTime = $1 WHERE id = $2", [startTime, teamId]);

        res.json({ startTime, message: "Quiz started" });

    } catch (err) {
        console.error("Start Quiz Error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// 3. POST /api/submit (Calculate Score & Save)
app.post('/api/submit', async (req, res) => {
    const { teamId, answers, timeTaken } = req.body;

    if (!teamId || !answers) {
        return res.status(400).json({ error: "Invalid payload" });
    }

    // SERVER-SIDE SCORING logic
    let score = 0;
    questions.forEach(q => {
        const userSelected = answers[q.id];
        if (userSelected === q.correctOption) {
            score += 1;
        }
    });

    try {
        const team = await dbGet("SELECT id FROM teams WHERE id = $1", [teamId]);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        await dbRun(
            `UPDATE teams SET 
                score = $1, 
                answers = $2, 
                timeTaken = $3, 
                status = 'completed', 
                endTime = $4 
            WHERE id = $5`,
            [score, JSON.stringify(answers), timeTaken, new Date().toISOString(), teamId]
        );

        console.log(`Team ID ${teamId} scored: ${score}`);
        res.json({ success: true, score: score, total: questions.length });

    } catch (err) {
        console.error("Submit Error:", err);
        res.status(500).json({ error: "Database error during submission" });
    }
});

// 4. GET /api/leaderboard (For Admin)
app.get('/api/leaderboard', async (req, res) => {
    try {
        // Sort by Score (Desc), then TimeTaken (Asc)
        const rows = await dbAll("SELECT * FROM teams WHERE status = 'completed' ORDER BY score DESC, timeTaken ASC");

        const parsedRows = rows.map(r => ({
            id: r.id,
            teamName: r.teamname,
            leaderName: r.leadername,
            scholarNumber: r.scholarnumber,
            score: r.score,
            status: r.status,
            startTime: r.starttime ? parseInt(r.starttime) : null,
            endTime: r.endtime,
            timeTaken: r.timetaken,
            answers: r.answers ? JSON.parse(r.answers) : {}
        }));

        res.json(parsedRows);

    } catch (err) {
        console.error("Leaderboard Error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
    console.log(`- Connected to PostgreSQL at ${process.env.DB_HOST || 'localhost'}:5432`);
});
