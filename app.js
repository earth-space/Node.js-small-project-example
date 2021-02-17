const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();

// Model
const TodoTask = require("./model/todoTask");

// View Setting
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

app.use("/public", express.static('public'));

// Body Parser Setting
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

// Controller
app.get("/", function(req, res){
    TodoTask.find({}, (err, tasks) => {
    res.render("todo", { todoTasks: tasks });
  });
});

app.post("/create", async function(req, res){
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try{
        await todoTask.save();
        res.redirect("/");
    }catch(err){
        console.err("Save TodoTask Fail!");
        res.redirect("/");
    }
});

// Connection to DB
mongoose.connect("mongodb://localhost:27017/local", function(err){
    if(err){
        console.error("mongoDB Connection Error!", err);
    }
    console.log("mongoDB Connected!");
    
    // Server Open
    app.listen(3000, function(){
    console.log("Server listening on port 3000");
    });
});
