const express = require("express");
const app = express();
const router = express.Router();

// Controller 를 불러와서 exports 메소드 사용
const controller = require("../controllers/todo");

// Main
router.get('/', controller.get); // index에서 /todo 로 라우팅 해줬기 때문에 http://localhost:3000/todo/ 가 이에 해당

// Write
router.post('/write', controller.write); // http://localhost:3000/todo/write

// Edit
router.get("/edit/:id", controller.edit);

// Update
router.post("/update/:id", controller.update);

// Remove
router.get("/remove/:id", controller.remove);


module.exports = router;