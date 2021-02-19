// Import Module
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const expressErrorHandler = require("express-error-handler");

// Router
const router = require("./routes/index");

// View Setting
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

// Static Files Setting
app.use("/public", express.static(__dirname + '/public'));

// Body Parser Setting
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Router
app.use(router);

// Error Handling
var errorHandler = expressErrorHandler({
 static: {
   '404': './Todo/views/404.html'
 }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// Connect to DB
mongoose.connect("mongodb://localhost:27017/todo", function(err){
    if(err){
        console.error("mongoDB Connection Error!", err);
    }
    console.log("mongoDB Connected!");
    
    // Server Open
    app.listen(3000, function(){
        console.log("Server listening on port 3000");
    });
});
