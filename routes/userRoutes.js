const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/user/:id", userController.show);
router.post("/user", userController.store);

module.exports = router;
