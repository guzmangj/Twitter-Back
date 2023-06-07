require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function token(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json("Credenciales inválidas");
  } else {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (err) {
        console.log("Error");
      }
      if (result) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET);
        return res.json({ token });
      } else {
        return res.json("Contraseña inválida");
      }
    });
  }
}

module.exports = {
  token,
};
