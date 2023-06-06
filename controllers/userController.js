const Tweet = require("../models/Tweet");
const User = require("../models/User");
const { formattedData } = require("./tweetController");

async function show(req, res) {
  const profile = true;
  const id = req.params.id;
  const user = await User.findById(id);
  const allTweets = await Tweet.find({ user: id }).populate({ path: "user" });
  for (let i = 0; i < allTweets.length; i++) {
    allTweets[i].formattedData = formattedData(allTweets[i].date);
  }

  return res.json({ allTweets, user, profile });
}

async function store(req, res) {
  const user = await new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  });
  await user.save();
  return res.json("Se ha creado un nuevo usuario");
}

module.exports = {
  show,
  store,
};
