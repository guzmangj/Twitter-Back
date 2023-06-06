const Tweet = require("../models/Tweet");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { formattedData } = require("./tweetController");

async function show(req, res) {
  const profile = true;
  const loggedUser = await User.findById(req.session.passport.user);
  const id = req.params.id;
  const user = await User.findById(id);
  const allTweets = await Tweet.find({ user: id }).populate({ path: "user" });
  for (let i = 0; i < allTweets.length; i++) {
    allTweets[i].formattedData = formattedData(allTweets[i].date);
  }

  return res.render("pages/profile", { allTweets, user, profile, loggedUser });
}

async function store(req, res) {
  const user = await new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();
  return res.json("Se ha creado un nuevo usuario");
}

module.exports = {
  show,
  store,
};
