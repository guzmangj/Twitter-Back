const User = require("../models/User");
const formidable = require("formidable");

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

async function showLoggedUser(req, res) {
  const user = await User.findById(req.auth.id);
  return res.json({
    id: user._id,
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

module.exports = {
  show,
  store,
  index,
  showLoggedUser,
};
