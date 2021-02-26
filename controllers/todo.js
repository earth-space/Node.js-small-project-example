// Model
const TodoTask = require("../models/todoTask");

// KST Setting
var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

// Controller - 서비스 로직

// 첫 페이지
exports.get = function(req, res){
    console.log("------------!!Todo!!------------");
    TodoTask.find({}, null, {sort: {date: -1}}, (err, tasks) => {
    res.render("todo", { todoTasks: tasks }); 
    });
};

// 작성
exports.write = async function(req, res){
    try{
        const todoTask = new TodoTask({
            content: req.body.content,
            date: moment().format("YYYY-MM-DD HH:mm:ss")
        });
        await todoTask.save();
        console.log("==== Success!! Save New TodoTask ====");
        console.table([{id: todoTask._id, content: todoTask.content, date: todoTask.date}]);
        res.redirect("/todo");
    }catch(err){
        console.err("==== Fail!! Save TodoTask ====");
        res.redirect("/todo");
    } 
};

// 편집
exports.edit = function(req, res){
    const id = req.params.id;
    TodoTask.find({}, null, {sort: {date: -1}}, (err, tasks) => {
        res.render("todo-edit", { todoTasks: tasks, idTask: id });
    });
};

// 수정
exports.update = function(req, res){
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if(err){
            console.log("==== Fail!! Update TodoTask ====");
            console.error(err);
        }
        console.log("==== Success!! Update TodoTask ====");
        console.log("id: " + id + "\nchanged content: " + req.body.content);
        res.redirect("/todo");
    });
}

//삭제
exports.remove = function(req, res){
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if(err){
            console.log("==== Fail!! Remove TodoTask ====")
            console.error(err);
        }
        console.log("==== Success!! Remove TodoTask ====");
        console.log("id: " + id);
        res.redirect("/todo");
    });  
};
