const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get("/user/:id", userController.show);
router.post("/user", userController.store);
router.post(
  "/user/follow",
  checkJwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  userController.storeFollower,
);

module.exports = router;
