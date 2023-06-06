require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function token(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json("Credenciales inválidas");
  }

  if (!user.comparePassword(req.body.password)) {
    return res.json("Credenciales inválidas");
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET);
  return res.json({ token });
}

module.exports = {
  token,
};
