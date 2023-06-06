const passport = require("passport");

async function login(req, res) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res);
}

async function logout(req, res) {
  req.logout(function (error) {
    if (error) {
      throw error;
    }
    res.redirect("/login");
  });
}

module.exports = {
  login,
  logout,
};
