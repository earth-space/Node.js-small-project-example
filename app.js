// Import Modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const expressErrorHandler = require("express-error-handler");

// Make Express Servers 
const app = express(); // 3000: Todo, Weather
const chatApp = express(); // 3001: Chat

// Chat Server Setting - View, Static Files
const http = require("http").createServer(chatApp);
const io = require("socket.io")(http);
module.exports = io; // to Controller

chatApp.set("view engine", "ejs");
chatApp.engine("html", require("ejs").renderFile);
chatApp.set("views", path.join(__dirname, 'views'));

chatApp.use("/public", express.static(__dirname + '/public'));


// Server Setting - View, Static Files, Body Parser
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

app.use("/public", express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Router Setting
const router = require("./routes/index");
chatApp.use(router);
app.use(router);

// Error Handling
var errorHandler = expressErrorHandler({
 static: {
   '404': './views/404.html'
 }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
chatApp.use(expressErrorHandler.httpError(404));
chatApp.use(errorHandler);

// Chat Server Open
http.listen(3001, () => {
    console.log("Chat Server listening on port 3001!");
})

// Connect to DB
mongoose.connect("mongodb://localhost:27017/node", function(err){
    if(err){
        console.error("mongoDB Connection Error!", err);
    }
    console.log("mongoDB Connected!");
    
    // Server Open
    app.listen(3000, function(){
        console.log("Server listening on port 3000!");
    });
});
