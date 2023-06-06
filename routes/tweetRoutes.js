const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

router.get("/tweets", tweetController.index);
router.post("/tweets", tweetController.store);
router.delete("/tweets/:id", tweetController.destroy);

module.exports = router;
