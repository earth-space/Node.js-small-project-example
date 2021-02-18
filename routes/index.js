// All Routers Exports

/*
 새로운 routes 인덱스가 생길때마다
 리팩토링해서 함께 관리한다
 
 ex)
 const NewRouter = require('./new');
 router.use('/new', mainRouter);
*/

const express = require("express");
const app = express();
const router = express.Router();

// Todo Router
const TodoRouter = require('./todo');

// Refactoring
router.use('/todo', TodoRouter);

module.exports = router;