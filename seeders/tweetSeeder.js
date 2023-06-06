const { faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const User = require("../models/User");

faker.locale = "es";

async function fakeLikes() {
  const likes = [];
  const users = await User.find({});
  for (let i = 0; i < Math.floor(Math.random() * users.length); i++) {
    const element = users[i];
    likes.push(element);
  }
  return likes;
}

module.exports = async () => {
  await Tweet.deleteMany();
  const tweets = [];
  const users = await User.find({});

  for (let i = 1; i < 100; i++) {
    tweets.push({
      content: faker.lorem.sentence().slice(0, 140),
      date: faker.date.between("2010-01-01T00:00:00.000Z", "2023-01-05T00:00:00.000Z"),
      user: users[Math.floor(Math.random() * users.length)]._id,
    });
  }
  await Tweet.insertMany(tweets);

  const allTweets = await Tweet.find({});
  for (let i = 0; i < allTweets.length; i++) {
    const likes = await fakeLikes();
    const tweet = allTweets[i];
    for (let j = 0; j < likes.length; j++) {
      const element = likes[j];
      tweet.likes.push(element._id);
    }
    await tweet.save();
  }
  console.log("[Database] Se corrió el seeder de Tweets.");
};
