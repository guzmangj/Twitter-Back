const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const redirectIfAuthenticated = require("../middlewares/redirectIfAuthenticated");

router.get("/login", redirectIfAuthenticated, pagesController.showLogin);

//logout

router.get("*", function (req, res) {
  res.status(404).render("pages/404");
});

module.exports = router;
