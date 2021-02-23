//Import Modules
const express = require("express");
const router = express.Router();

// Controller
const controller = require("../../controllers/chat/chat");

// Main
router.get('/', controller.get);

module.exports = router;