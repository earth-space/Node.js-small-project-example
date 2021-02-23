const express = require("express");
const app = express();
const router = express.Router();

// Controller
const controller = require("../../controllers/todo/todo");

// Main
router.get('/', controller.get);

// Write
router.post('/write', controller.write);

// Edit
router.get("/edit/:id", controller.edit);

// Update
router.post("/update/:id", controller.update);

// Remove
router.get("/remove/:id", controller.remove);


module.exports = router;