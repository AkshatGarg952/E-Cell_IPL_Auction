// IPL Auction + IPL Analytical Quiz (70 Questions)
// Backend version with correct answers

const questions = [

{
id: 'q1',
question: "An IPL squad has the maximum allowed overseas players. If the playing XI allows only half of those overseas players, what fraction of overseas players must remain on the bench?",
options: [
"1/4",
"1/3",
"1/2",
"2/3"
],
correctOption: 2
},

{
id: 'q2',
question: "A team ensures every overseas player plays at least one match while always using the maximum overseas players per match. What is the minimum number of matches required?",
options: [
"1",
"2",
"3",
"4"
],
correctOption: 1
},

{
id: 'q3',
question: "If an IPL squad has minimum allowed players and maximum overseas players, what fraction of squad must be Indian players?",
options: [
"5/18",
"7/18",
"10/18",
"11/18"
],
correctOption: 2
},

{
id: 'q4',
question: "If a team builds a full squad and uses maximum overseas players, what percentage of overseas players remain unused in a match?",
options: [
"25%",
"37.5%",
"50%",
"62.5%"
],
correctOption: 2
},

{
id: 'q5',
question: "An IPL squad contains 25 players including maximum overseas players. What percentage of squad must be Indian players?",
options: [
"60%",
"64%",
"68%",
"72%"
],
correctOption: 2
},

{
id: 'q6',
question: "A team has maximum overseas players and plays only one match. What is the maximum number of overseas players who cannot play in that match?",
options: [
"2",
"3",
"4",
"5"
],
correctOption: 2
},

{
id: 'q7',
question: "If overseas players form exactly 8 members in squad and only 4 can play, what percentage of overseas players can play simultaneously?",
options: [
"25%",
"37.5%",
"50%",
"75%"
],
correctOption: 2
},

{
id: 'q8',
question: "If IPL allowed unlimited overseas players in squad but still allowed only 4 in XI, which constraint limits match selection?",
options: [
"Purse limit",
"Squad size",
"Overseas XI limit",
"Auction order"
],
correctOption: 2
},

{
id: 'q9',
question: "If squad size is minimum and overseas players are maximum, how many Indian players must be present?",
options: [
"8",
"9",
"10",
"11"
],
correctOption: 2
},

{
id: 'q10',
question: "If a team has 25 players and fields only Indian players, what percentage of squad can play simultaneously?",
options: [
"44%",
"56%",
"68%",
"100%"
],
correctOption: 3
},

// SECTION 2 PDF CONVERTED QUESTIONS

{
id: 'q11',
question: "The IPL team that achieved the highest win percentage in a single season did so in its debut year. Which team was it?",
options: [
"Mumbai Indians",
"Chennai Super Kings",
"Gujarat Titans",
"Rajasthan Royals"
],
correctOption: 2
},

{
id: 'q12',
question: "The first IPL hat-trick was taken in the inaugural season. Who achieved this milestone?",
options: [
"Lasith Malinga",
"Amit Mishra",
"Lakshmipathy Balaji",
"Anil Kumble"
],
correctOption: 2
},

{
id: 'q13',
question: "The bowler with best bowling figures in IPL history achieved this while playing for which franchise?",
options: [
"Chennai Super Kings",
"Mumbai Indians",
"Royal Challengers Bangalore",
"Delhi Capitals"
],
correctOption: 1
},

{
id: 'q14',
question: "Which player holds the record for most IPL hat-tricks across multiple franchises?",
options: [
"Lasith Malinga",
"Amit Mishra",
"Sunil Narine",
"Rashid Khan"
],
correctOption: 1
},

{
id: 'q15',
question: "Which bowler became the first to reach 100 IPL wickets?",
options: [
"Harbhajan Singh",
"Lasith Malinga",
"Dwayne Bravo",
"Amit Mishra"
],
correctOption: 1
},

{
id: 'q16',
question: "Which player has scored most IPL playoff runs and is known as 'Mr. IPL'?",
options: [
"MS Dhoni",
"Suresh Raina",
"Virat Kohli",
"Rohit Sharma"
],
correctOption: 1
},

{
id: 'q17',
question: "Which bowler has taken most wickets in IPL finals history?",
options: [
"Bhuvneshwar Kumar",
"Lasith Malinga",
"Jasprit Bumrah",
"Dwayne Bravo"
],
correctOption: 1
},

{
id: 'q18',
question: "Which player won Purple Cap in IPL 2021 while equaling season wicket record?",
options: [
"Rashid Khan",
"Kagiso Rabada",
"Harshal Patel",
"Bumrah"
],
correctOption: 2
},

{
id: 'q19',
question: "Which player won IPL titles with three different franchises?",
options: [
"Robin Uthappa",
"Shane Watson",
"Yuvraj Singh",
"Irfan Pathan"
],
correctOption: 2
},

{
id: 'q20',
question: "Which player scored most IPL runs as captain?",
options: [
"MS Dhoni",
"Virat Kohli",
"Rohit Sharma",
"Gautam Gambhir"
],
correctOption: 1
},

// SECTION 3 LOGICAL QUESTIONS

{
id: 'q21',
question: "Mumbai Indians scored 370 runs and conceded 330 runs in equal overs. What does this imply about their net performance?",
options: [
"They scored fewer runs per over",
"They scored equal runs per over",
"They scored more runs per over",
"They conceded more runs per over"
],
correctOption: 2
},

{
id: 'q22',
question: "Chris Gayle scored 175 runs, the highest IPL score. What does this imply compared to other innings?",
options: [
"No player scored above 150",
"No player scored above 160",
"No player scored above 170",
"No player scored above 175"
],
correctOption: 3
},

{
id: 'q23',
question: "If Parthiv Patel played for 6 teams, what does this imply about his career?",
options: [
"Played only one season",
"Played multiple franchises",
"Played only international cricket",
"Played only overseas"
],
correctOption: 1
},

{
id: 'q24',
question: "If IPL allows only 4 overseas players per XI, what must always be true?",
options: [
"At least 4 Indians play",
"At least 5 Indians play",
"At least 6 Indians play",
"At least 7 Indians play"
],
correctOption: 3
},

// VERY HARD QUESTIONS

{
id: 'q25',
question: "If squad contains maximum overseas players and matches allow half of them, what percentage cannot play?",
options: [
"25%",
"37.5%",
"50%",
"75%"
],
correctOption: 2
},

{
id: 'q26',
question: "If squad has 25 players and XI has 11 players, what percentage remain unused?",
options: [
"44%",
"48%",
"52%",
"56%"
],
correctOption: 3
},

{
id: 'q27',
question: "Which rule restricts overseas players more strictly?",
options: [
"Squad size limit",
"XI overseas limit",
"Purse limit",
"Auction order"
],
correctOption: 1
},

{
id: 'q28',
question: "If squad has 8 overseas players, how many must be Indian players minimum?",
options: [
"9",
"10",
"11",
"12"
],
correctOption: 1
},

{
id: 'q29',
question: "If a team has maximum overseas players and minimum squad size, what percentage of squad is overseas?",
options: [
"33.3%",
"38.9%",
"44.4%",
"50%"
],
correctOption: 2
},

{
id: 'q30',
question: "If a team rotates 8 overseas players equally across matches with exactly 4 per match, what must be true about total overseas appearances?",
options: [
"Must be divisible by 2",
"Must be divisible by 4",
"Must be divisible by 8",
"Must be divisible by 11"
],
correctOption: 2
},

{
id: 'q31',
question: "If squad size is maximum and overseas players are maximum, how many Indian players are present?",
options: [
"15",
"16",
"17",
"18"
],
correctOption: 2
},

{
id: 'q32',
question: "If only Indian players are used in XI, what happens to overseas players?",
options: [
"All must play",
"All remain unused",
"Half must play",
"They rotate automatically"
],
correctOption: 1
},

{
id: 'q33',
question: "If squad contains 8 overseas players and XI allows 4, what fraction plays?",
options: [
"1/4",
"1/3",
"1/2",
"3/4"
],
correctOption: 2
},

{
id: 'q34',
question: "If overseas players increased to 10 but XI still allows 4, unused overseas players equal?",
options: [
"4",
"5",
"6",
"7"
],
correctOption: 2
},

{
id: 'q35',
question: "Which constraint applies only during match selection but not auction?",
options: [
"Purse limit",
"Squad size",
"XI overseas limit",
"Auction order"
],
correctOption: 2
},

{
id: 'q36',
question: "If team has squad of 18 and XI of 11, how many remain unused?",
options: [
"5",
"6",
"7",
"8"
],
correctOption: 2
},

{
id: 'q37',
question: "If squad size increases but XI remains same, what happens to unused players?",
options: [
"Increase",
"Decrease",
"Remain same",
"Become zero"
],
correctOption: 0
},

{
id: 'q38',
question: "If overseas XI limit removed, maximum overseas players who can play equals?",
options: [
"4",
"8",
"11",
"25"
],
correctOption: 1
},

{
id: 'q39',
question: "If a squad has equal Indian and overseas players, how many overseas players exist?",
options: [
"8",
"10",
"12",
"Depends on squad size"
],
correctOption: 3
},

{
id: 'q40',
question: "If XI contains 11 Indians, overseas players unused equals?",
options: [
"4",
"6",
"8",
"All overseas"
],
correctOption: 3
},

// HARD IPL LOGIC

{
id: 'q41',
question: "A batsman holds record for most runs overall and most runs in season. What must be true?",
options: [
"Played few matches",
"Highly consistent across seasons",
"Played only playoffs",
"Played only overseas"
],
correctOption: 1
},

{
id: 'q42',
question: "If bowler has most wickets in IPL history, what does this imply?",
options: [
"Played fewer matches",
"High wickets per match ratio",
"Low economy always",
"Never conceded runs"
],
correctOption: 1
},

{
id: 'q43',
question: "If team defended lowest total, what does it imply?",
options: [
"Strong batting",
"Exceptional bowling",
"Poor bowling",
"Poor fielding"
],
correctOption: 1
},

{
id: 'q44',
question: "If batsman scored highest IPL score, what must be true?",
options: [
"Highest single innings performance",
"Highest career runs",
"Highest centuries",
"Most matches played"
],
correctOption: 0
},

{
id: 'q45',
question: "If team wins by 1 run, what does it imply?",
options: [
"One sided match",
"Closely contested match",
"High scoring match",
"Low scoring match"
],
correctOption: 1
},

{
id: 'q46',
question: "If team scores highest IPL total, opponent must score at least?",
options: [
"Equal score",
"One less",
"One more",
"Depends on overs"
],
correctOption: 2
},

{
id: 'q47',
question: "If bowler has best bowling figures, what must be true?",
options: [
"Took many wickets conceding few runs",
"Took most career wickets",
"Bowled most overs",
"Played most matches"
],
correctOption: 0
},

{
id: 'q48',
question: "If player wins IPL titles with multiple franchises, what must be true?",
options: [
"Played long IPL career",
"Played single season",
"Played one team only",
"Played only overseas"
],
correctOption: 0
},

{
id: 'q49',
question: "If highest partnership achieved, what must be true?",
options: [
"Both batsmen contributed",
"One batsman scored alone",
"No singles scored",
"No wickets taken"
],
correctOption: 0
},

{
id: 'q50',
question: "If batsman scored playoff century, what must be true?",
options: [
"High performance under pressure",
"Played only league matches",
"Played few matches",
"Played only overseas"
],
correctOption: 0
},

{
id: 'q51',
question: "An IPL team has the maximum allowed overseas players in its squad. If each match allows exactly half of them to play, what is the ratio of overseas players playing to those not playing in any match?",
options: [
"1:1",
"1:2",
"2:1",
"3:1"
],
correctOption: 0
},

{
id: 'q52',
question: "If a team builds a squad with maximum overseas players and minimum total squad size, what percentage of the squad must be Indian players?",
options: [
"44.4%",
"50%",
"55.6%",
"60%"
],
correctOption: 2
},

{
id: 'q53',
question: "If a team uses the same playing XI for all matches in a season and has a full squad of 25 players, how many players remain completely unused throughout the season?",
options: [
"12",
"13",
"14",
"15"
],
correctOption: 2
},

{
id: 'q54',
question: "If overseas players form exactly 8 members of a squad and only 4 are allowed in XI, what percentage of the total squad can overseas players represent at maximum?",
options: [
"25%",
"32%",
"40%",
"44%"
],
correctOption: 1
},

{
id: 'q55',
question: "If IPL suddenly allowed one additional overseas player in XI but squad overseas limit remained unchanged, how many overseas players would still remain unused in a full overseas squad?",
options: [
"2",
"3",
"4",
"5"
],
correctOption: 1
},

{
id: 'q56',
question: "If an IPL squad contains 25 players and the team fields maximum overseas players every match, what percentage of the squad participates in each match?",
options: [
"44%",
"48%",
"52%",
"56%"
],
correctOption: 0
},

{
id: 'q57',
question: "If the overseas player limit was removed from squad but XI limit remained, what would be the maximum number of overseas players that could play simultaneously?",
options: [
"4",
"8",
"11",
"25"
],
correctOption: 0
},

{
id: 'q58',
question: "If a team ensures that every player gets exactly one match in a season and squad size is 22, what must be true about total matches played?",
options: [
"At least 2 matches",
"At least 3 matches",
"At least 4 matches",
"At least 5 matches"
],
correctOption: 0
},

{
id: 'q59',
question: "If an IPL team has equal number of Indian and overseas players in squad, what must be true about overseas count?",
options: [
"Less than 8",
"Equal to 8",
"Greater than 8",
"Depends on squad size"
],
correctOption: 3
},

{
id: 'q60',
question: "If a team builds squad maximizing overseas players but always plays only Indian players, what percentage of overseas players will remain unused?",
options: [
"25%",
"50%",
"75%",
"100%"
],
correctOption: 3
},

// VERY HARD (61–70)

{
id: 'q61',
question: "If squad has 8 overseas players and XI allows 4, what percentage unused?",
options: [
"25%",
"37.5%",
"50%",
"75%"
],
correctOption: 2
},

{
id: 'q62',
question: "If squad size is 25 and XI is 11, unused percentage equals?",
options: [
"44%",
"48%",
"52%",
"56%"
],
correctOption: 3
},

{
id: 'q63',
question: "If overseas players double, unused overseas increases by?",
options: [
"Equal amount",
"Half amount",
"Double amount",
"Depends on XI limit"
],
correctOption: 3
},

{
id: 'q64',
question: "If Indian players fill squad fully, overseas participation equals?",
options: [
"0%",
"25%",
"50%",
"100%"
],
correctOption: 0
},

{
id: 'q65',
question: "If overseas XI limit increases, unused overseas players will?",
options: [
"Increase",
"Decrease",
"Remain same",
"Become zero"
],
correctOption: 1
},

{
id: 'q66',
question: "If squad size increases but overseas limit same, overseas percentage?",
options: [
"Increases",
"Decreases",
"Remains same",
"Becomes zero"
],
correctOption: 1
},

{
id: 'q67',
question: "If XI uses only overseas players possible, Indian participation equals?",
options: [
"0%",
"25%",
"50%",
"75%"
],
correctOption: 0
},

{
id: 'q68',
question: "If squad contains equal Indian and overseas players, overseas count equals?",
options: [
"8",
"10",
"12",
"Depends on squad size"
],
correctOption: 3
},

{
id: 'q69',
question: "If squad uses fixed XI always, unused players equals?",
options: [
"Squad size minus XI size",
"XI size",
"Squad size",
"Zero"
],
correctOption: 0
},

{
id: 'q70',
question: "Which constraint applies only during match selection?",
options: [
"Purse limit",
"Squad limit",
"XI overseas limit",
"Auction order"
],
correctOption: 2
}

];

module.exports = questions;