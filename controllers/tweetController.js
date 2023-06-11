const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function index(req, res) {
  const tweets = await Tweet.find().populate("user");
  for (let i = 0; i < tweets.length; i++) {
    tweets[i].formattedData = formattedData(tweets[i].date);
  }
  return res.json(tweets);
}

async function store(req, res) {
  const newTweet = new Tweet({
    content: req.body.content,
    likes: [],
    date: new Date(),
    user: req.auth.id,
  });
  await newTweet.save();
  return res.json(newTweet);
}

async function destroy(req, res) {
  await Tweet.findByIdAndDelete(req.params.id);
  return res.json("Se eliminó el tweet con éxito");
}

function formattedData(dateTweet) {
  const currentDate = new Date();
  dateTweet = new Date(dateTweet);

  const isOldestTweet = dateTweet < currentDate - 1000 * 60 * 60 * 24 * 30;
  const isOldTweet = dateTweet < currentDate - 1000 * 60 * 60 * 24;
  const isTodayTweet = dateTweet > currentDate - 1000 * 60 * 60 * 24;
  let formattedData;
  if (isTodayTweet) {
    const hours = Math.floor((currentDate - dateTweet) / (1000 * 60 * 60));
    formattedData = `${hours} hours ago`;
  }
  if (isOldTweet) {
    const day = dateTweet.toLocaleString("default", { day: "numeric" });
    const month = dateTweet.toLocaleString("default", { month: "long" });
    formattedData = `${month} ${day}`;
  }
  if (isOldestTweet) {
    const month = dateTweet.toLocaleString("default", { month: "long" });
    const year = dateTweet.getFullYear();
    formattedData = `${month} ${year}`;
  }

  return formattedData;
}
async function likeTweet(req, res) {
  const tweetId = req.params.id;
  const userId = req.body.userId;
  const tweet = await Tweet.findById(tweetId);
  tweet.likes.addToSet(userId);
  await tweet.save();
  console.log(req.body);
  console.log("liked", userId);
  return res.json("Tweet liked");
}

async function dislikeTweet(req, res) {
  const tweetId = req.params.id;
  const userId = req.body.userId;
  const tweet = await Tweet.findById(tweetId);
  tweet.likes.pull(userId);
  await tweet.save();
  console.log("disliked", userId);
  return res.json("Tweet disliked");
}
module.exports = {
  index,
  store,
  destroy,
  likeTweet,
  dislikeTweet,
  formattedData,
};
