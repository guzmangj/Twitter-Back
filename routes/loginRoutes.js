const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");

router.post("/login", pagesController.token);

module.exports = router;
