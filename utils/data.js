const username = [
    'Zeke',
    'Sanu',
    'Maya',
    'Suna',
    'Mutu',
    'Ko',
    'Tukra',
    'duji',
    'vaar',
    'pyaar'
];

const thoughttext = [
    'Oh no, that game was a total doozy!',
    'Yikes, cant believe they dropped the ball like that.',
    'Sometimes my spidy senses tingle',
    
]

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomThoughts = (arr) => arr[Math.floor(Math.random() * arr.length)]


// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(username)} ${getRandomArrItem(username)}`;

// Function to generate random applications that we can add to the database. Includes application tags.
const getRandomThought = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughttext),
      username: getRandomName()
    });
  }
  return results;
};

module.exports = { getRandomName, getRandomThoughts };

