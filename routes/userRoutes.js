const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tweetController = require("../controllers/tweetController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const { uniqueValidatorMiddleware } = require("../middlewares/uniqueValidatorMiddleware");

router.get("/", ensureAuthenticated, tweetController.indexTweet);
router.get("/crear", userController.create);
router.get("/:id", ensureAuthenticated, userController.show);
// router.get("/editar/:id", userController.edit);
router.get("/:id/followers", userController.showFollowers);
router.get("/:id/following", userController.showFollowing);

router.post("/crear", uniqueValidatorMiddleware, userController.store);
router.post("/:id/follow", userController.storeFollower);

// router.delete("/:id", userController.destroy);

module.exports = router;
