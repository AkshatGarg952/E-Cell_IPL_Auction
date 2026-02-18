// This file contains the CORRECT ANSWERS.
// It is only used by the Backend (server).
// The frontend will receive a sanitized version WITHOUT correctOption.

const questions = [
    {
        id: 'q1',
        question: "What is the primary function of a Venture Capitalist?",
        options: [
            "To provide loans to small businesses",
            "To invest in high-potential startups in exchange for equity",
            "To manage the daily operations of a company",
            "To regulate the stock market"
        ],
        correctOption: 1
    },
    {
        id: 'q2',
        question: "Which term describes a startup valued at over $1 billion?",
        options: [
            "Decacorn",
            "Unicorn",
            "Gigacorn",
            "Centicorn"
        ],
        correctOption: 1
    },
    {
        id: 'q3',
        question: "What does 'MVP' stand for in the startup world?",
        options: [
            "Most Valuable Player",
            "Maximum Viable Product",
            "Minimum Viable Product",
            "Minimum Value Proposition"
        ],
        correctOption: 2
    },
    {
        id: 'q4',
        question: "Who is the founder of SpaceX?",
        options: [
            "Jeff Bezos",
            "Elon Musk",
            "Richard Branson",
            "Mark Zuckerberg"
        ],
        correctOption: 1
    },
    {
        id: 'q5',
        question: "What is 'Bootstrapping'?",
        options: [
            "Wearing heavy boots for improved stability",
            "Funding a startup using personal savings and revenue",
            "Getting a large investment from a bank",
            "Hiring a team of developers"
        ],
        correctOption: 1
    },
    {
        id: 'q6',
        question: "Which company owns the Android operating system?",
        options: [
            "Apple",
            "Microsoft",
            "Google",
            "Samsung"
        ],
        correctOption: 2
    },
    {
        id: 'q7',
        question: "What is a 'Pitch Deck'?",
        options: [
            "A deck of cards for team building",
            "A presentation to investors regarding your business plan",
            "A tool for managing project timelines",
            "A marketing strategy for social media"
        ],
        correctOption: 1
    },
    {
        id: 'q8',
        question: "What does B2B stand for?",
        options: [
            "Business to Boss",
            "Business to Business",
            "Back to Business",
            "Business to Buyer"
        ],
        correctOption: 1
    },
    {
        id: 'q9',
        question: "Which of these is NOT a source of funding for startups?",
        options: [
            "Angel Investors",
            "Crowdfunding",
            "Ponzi Schemes",
            "Venture Capital"
        ],
        correctOption: 2
    },
    {
        id: 'q10',
        question: "What is the 'CAC' metric?",
        options: [
            "Customer Acquisition Cost",
            "Company Asset Count",
            "Current Account Cash",
            "Customer Average Consumption"
        ],
        correctOption: 0
    }
];

module.exports = questions;
