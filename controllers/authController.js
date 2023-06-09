require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function token(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json("Credenciales inválidas");
  } else {
    const result = await user.comparePassword(req.body.password);
    if (!result) {
      return res.json("Contraseña inválida");
    } else {
      const { username, email, firstname, lastname, id, image, description, following, followers } =
        user;
      const token = jwt.sign({ id: user.id }, process.env.SECRET);
      return res.json({
        token,
        username,
        email,
        firstname,
        lastname,
        id,
        image,
        description,
        following,
        followers,
      });
    }
  }
}

module.exports = {
  token,
};
