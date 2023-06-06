/**
 * Este archivo se creó para centralizar el código referente a Passport.
 *
 * Su nombre es arbitrario, aunque tenía sentido llamarle `passport.js`.
 *
 * Se lo colocó en la raíz del proyecto, aunque otra opción válida podría haber
 * sido colocarlo en una carpeta que contenga archivos de configuración, por
 * ejemplo, llamada `/config`.
 */

const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Tweet = require("./models/Tweet");

function passportConfig() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (email, password, done) {
        try {
          const user = await User.findOne({ email: email });

          if (!user) {
            return done(null, false, { message: "Credenciales incorrectas" });
          }
          const checkPassword = await bcrypt.compare(password, user.password);

          if (!checkPassword) {
            return done(null, false, { message: "Credenciales incorrectas" });
          }
          return done(null, user);
        } catch (error) {
          console.log(error);
        }
      },
    ),
  );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = passportConfig;
