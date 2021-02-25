const express = require("express");
const app = express();
const router = express.Router();

// Controller
const controller = require("../../controllers/weather/weather");

// Main
router.get('/', controller.get);

// Search
router.post('/search', controller.search);


module.exports = router;