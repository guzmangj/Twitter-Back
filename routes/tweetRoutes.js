const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get("/tweets", tweetController.index);
router.post(
  "/tweets",
  checkJwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  tweetController.store,
);
router.delete("/tweets/:id", tweetController.destroy);

module.exports = router;
