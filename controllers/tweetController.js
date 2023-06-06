const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function index(req, res) {
  const tweets = await Tweet.find();
  for (let i = 0; i < allTweets.length; i++) {
    allTweets[i].formattedData = formattedData(allTweets[i].date);
  }
  return res.json({
    content: tweets.content,
    likes: tweets.likes,
    date: tweets.date,
    user: tweets.user,
  });
}

async function store(req, res) {
  const newTweet = new Tweet({
    content: req.body.tweetContent,
    likes: [],
    date: new Date(),
    user: req.auth.id,
  });
  await newTweet.save();
  return res.json("Se creó un nuevo Tweet");
}

// async function destroy(req, res) {
//   const id = req.params.id;
//   await Tweet.deleteOne({ _id: id });

//   return res.redirect("back");
// }

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

module.exports = {
  index,
  store,
  destroy,
  formattedData,
};
