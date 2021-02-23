// Model
const TodoTask = require("../../models/todo/todoTask");

// KST Setting
var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

// Controller
exports.get = function(req, res){
    console.log("------------!!Todo!!------------");
    TodoTask.find({}, null, {sort: {date: -1}}, (err, tasks) => {
    res.render("./todo/todo", { todoTasks: tasks });
    });
};

exports.write = async function(req, res){
    try{
        const todoTask = new TodoTask({
            content: req.body.content,
            date: moment().format("YYYY-MM-DD HH:mm:ss")
        });
        await todoTask.save();
        console.log("\u001b[36m", "==== Success!! Save New TodoTask ====");
        console.table([{id: todoTask._id, content: todoTask.content, date: todoTask.date}]);
        res.redirect("/todo");
    }catch(err){
        console.err("\u001b[31m", "==== Fail!! Save TodoTask ====");
        res.redirect("/todo");
    } 
};

exports.edit = function(req, res){
    const id = req.params.id;
    TodoTask.find({}, null, {sort: {date: -1}}, (err, tasks) => {
        res.render("./todo/todo-edit", { todoTasks: tasks, idTask: id });
    });
};

exports.update = function(req, res){
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if(err){
            console.log("\u001b[31m", "==== Fail!! Update TodoTask ====");
            console.error(err);
        }
        console.log("\u001b[33m", "==== Success!! Update TodoTask ====");
        console.log("id: " + id + "\nchanged content: " + req.body.content);
        res.redirect("/todo");
    });
}

exports.remove = function(req, res){
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if(err){
            console.log("\u001b[31m", "==== Fail!! Remove TodoTask ====")
            console.error(err);
        }
        console.log("\u001b[31m", "==== Success!! Remove TodoTask ====");
        console.log("id: " + id);
        res.redirect("/todo");
    });  
};
