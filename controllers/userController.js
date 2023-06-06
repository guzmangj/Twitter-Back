const Tweet = require("../models/Tweet");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { formattedData } = require("./tweetController");

async function index(req, res) {}

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

async function create(req, res) {
  return res.render("pages/register");
}

async function store(req, res) {
  const register = await User.updateOne(
    {
      email: req.body.email,
    },
    {
      $setOnInsert: {
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: await bcrypt.hash(req.body.password, 5),
      },
    },
    { upsert: true },
  );

  if (register.upserted) {
    req.login(user, () => {
      req.flash("info", "User created succesfully");
      res.redirect("/");
    });
  } else {
    req.flash("info", "Invalid password");
    res.redirect("/login");
  }
}

async function destroy(req, res) {}

/*async function like(req, res) {
  const tweetId = req.params._id;
  const tweet = await Tweet.findByIdAndUpdate(tweetId, { $inc: { likes: 1 } });

  if (!tweet) {
    return res.send("Tweet no encontrado");
  } else {
    tweet.likes += 1;
    await tweet.save();
  }
  return tweet;
}no se está usando*/

async function showFollowers(req, res) {
  const id = req.params.id;
  const user = await User.findById(id);
  const followersId = user.followers;
  const followers = await User.find({ _id: { $in: followersId } });
  const loggedUser = await User.findById(req.session.passport.user);
  return res.render("pages/followers", { followers, user, loggedUser });
}

async function showFollowing(req, res) {
  const id = req.params.id;
  const user = await User.findById(id);
  const followingId = user.following;
  const following = await User.find({ _id: { $in: followingId } });
  const loggedUser = await User.findById(req.session.passport.user);
  return res.render("pages/following", { following, user, loggedUser });
}

async function storeFollower(req, res) {
  const userA = await User.findById(req.params.id); // usuario que viene por parametro
  const userB = await User.findById(req.user.id); // usuario logueado

  console.log(userA.username);
  console.log(userB.username);
  const userAFollowsUserB = userB.following.includes(userA.id);

  if (!userAFollowsUserB) {
    userB.following.push(userA.id);
    userA.followers.push(userB.id);
  } else {
    let indexOfOtherUser = userB.following.indexOf(userA.id);
    if (indexOfOtherUser !== -1) {
      userB.following.splice(indexOfOtherUser, 1);
    }
    let indexOfMyUser = userA.followers.indexOf(userB.id);
    if (indexOfMyUser !== -1) {
      userA.followers.splice(indexOfMyUser, 1);
    }
  }
  await userB.save();
  await userA.save();

  return res.redirect("back");
}

module.exports = {
  index,
  show,
  create,
  store,
  destroy,
  showFollowers,
  showFollowing,
  storeFollower,
};
