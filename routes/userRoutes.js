const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get("/users/:id", userController.show);
router.post("/users", userController.store);
router.post(
  "/users/follow",
  checkJwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  userController.storeFollower,
);

module.exports = router;
