const User = require("../models/User");

async function index(req, res) {
  const users = await User.find();
  return res.json(users);
}

async function show(req, res) {
  const user = await User.findById(req.params.id);
  return res.json({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    username: user.username,
    image: user.image,
    description: user.description,
    followers: user.followers,
    following: user.following,
  });
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
  index,
};
