// Import Modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

// Make Express Servers 
const app = express(); // 3000: Todo


// Server Setting - View, Static Files, Body Parser
app.set("view engine", "ejs"); //express 서버에서 jsp처럼 쓰는 ejs파일을 뷰 엔진으로 설정
app.set("views", path.join(__dirname, 'views'));

app.use("/public", express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Router Setting
const router = require("./routes/index");
app.use(router);


// Connect to DB
/*
    connect error 발생 시
    mongodb://[아이디]:[비밀번호]@localhost:27017/[db이름]?authSource=[아이디] 로 변경
    ex) mongodb://admin:1234@localhost:27017/node?authSource=admin
*/
mongoose.connect("mongodb://localhost:27017/node", {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.error("mongoDB Connection Error!", err);
    }
    console.log("mongoDB Connected!");
    
    // Server Open
    app.listen(3000, function(){
        console.log("Server listening on port 3000!");
    });
});
