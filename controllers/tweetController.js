const Tweet = require("../models/Tweet");
const User = require("../models/User");
const mongoose = require("mongoose");
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
  return res.json("Se creó un nuevo Tweet");
}

async function destroy(req, res) {
  const id = req.params.id;
  await Tweet.deleteOne({ _id: id });
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
  const userIdObject = new mongoose.Types.ObjectId(userId);

  tweet.likes.addToSet(userIdObject);
  await tweet.save();

  console.log(req.body);
  console.log("liked", userIdObject);

  return res.json("Tweet liked");
}

async function dislikeTweet(req, res) {
  const tweetId = req.params.id;
  const userId = req.body.userId;
  const tweet = await Tweet.findById(tweetId);
  const userIdObject = new mongoose.Types.ObjectId(userId);

  tweet.likes.pull(userIdObject);
  console.log("disliked", userIdObject);
  await tweet.save();
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
