const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");

router.get("/tweets", tweetController.index);
router.post("/tweets", tweetController.store);
// router.delete("/tweets/:id", tweetController.destroy);

module.exports = router;
