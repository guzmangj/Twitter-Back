const User = require("../models/User");
const formidable = require("formidable");

async function index(req, res) {
  // El alcance de este proyecto no lo incluye
}

async function show(req, res) {
  const user = await User.findById(req.params.id);
  const followers = await User.find({ _id: { $in: user.followers } });
  const following = await User.find({ _id: { $in: user.following } });
  return res.json({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    username: user.username,
    image: user.image,
    description: user.description,
    followers: followers,
    following: following,
    id: user._id,
  });
}

async function store(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    try {
      const { firstname, lastname, email, password, username } = fields;
      const user = await new User({
        firstname,
        lastname,
        email,
        password,
        username,
        image: files.image.newFilename,
      });
      await user.save();
    } catch (err) {
      console.log({ "Error al registrar un usuario": err });
      res.json(err);
    }
  });
  return res.json("Se ha creado un nuevo usuario");
}

async function storeFollower(req, res) {
  console.log(req.body);
  const targetUser = await User.findById(req.body.follower._id);
  const loggedUser = await User.findById(req.auth.id);
  const checkFollowing = loggedUser.following.includes(targetUser.id);
  if (!checkFollowing) {
    loggedUser.following.push(targetUser.id);
    targetUser.followers.push(loggedUser);
  } else {
    let indexOfTargetUser = targetUser.following.indexOf(loggedUser);
    if (indexOfTargetUser !== -1) {
      targetUser.following.splice(indexOfTargetUser, 1);
    }
    let indexOfLoggedUser = targetUser.followers.indexOf(loggedUser);
    if (indexOfLoggedUser !== -1) {
      targetUser.followers.splice(indexOfLoggedUser, 1);
    }
  }
  await targetUser.save();
  await loggedUser.save();
  return res.json("Estás siguiendo a este usuario");
}

async function update(req, res) {
  // El alcance de este proyecto no lo incluye
}

async function destroy(req, res) {
  // El alcance de este proyecto no lo incluye
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  storeFollower,
};
