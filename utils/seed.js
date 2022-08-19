const connection = require ('../config/connection')
const { Thought, User } = require ('../models')
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  const getRandomThought = getRandomThoughts(2);

  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
  
    users.push({
      fullName,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(getRandomThought);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  console.table(getRandomThought);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});


