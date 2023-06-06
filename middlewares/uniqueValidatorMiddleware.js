const User = require("../models/User");

async function uniqueValidatorMiddleware(req, res, next) {
  const { email, username } = req.body;

  // Verificar si el email ya está en uso
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    // Email ya está en uso, devuelve una respuesta de error
    req.flash("info", "Email already exists");
    return res.status(400).redirect("/usuarios/crear");
  }

  // Verificar si el username ya está en uso
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    // Username ya está en uso, devuelve una respuesta de error
    req.flash("info", "Username already exists");
    return res.status(400).redirect("/usuarios/crear");
  }

  // Si no hay conflictos, pasa al siguiente middleware o controlador
  next();
}

module.exports = { uniqueValidatorMiddleware };
