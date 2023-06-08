const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get("/user", userController.index);
router.get("/profile/:id", userController.show);
router.get(
  "/profile",
  checkJwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  userController.showLoggedUser,
);

router.post("/user", userController.store);

module.exports = router;
