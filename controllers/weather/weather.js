const request = require("request");

// Controller
exports.get = function(req, res){
    console.log("------------!!Weather!!------------");
    res.render("./weather/weather", {weatherInfo: null, error: null});
};

exports.search = function(req, res){
    let city = req.body.city;
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=bcc2bd609afdc9521aaedea0958898d2&lang=kr"; // API
    
    request(url, function(err, response, body){
        if(err){
            res.render("./weather/weather", {weatherInfo: null, error: "Error, Please Try Again!"});
            console.log("\u001b[31m", "==== Fail!! Searching ====");
            console.error(err);
        } else{
            let weather = JSON.parse(body);
            
            if(weather.main == undefined){
                console.log("\u001b[31m", "==== Fail!! Searching ====");
                res.render("./weather/weather", {weatherInfo: null, error: "Error, Please Try Again!"});
            } else{
                console.log("\u001b[36m", "==== Success!! Searching ==== : " + city);
                //Weather Information Object
                let weatherInfo = {
                    name : weather.name,
                    temp : weather.main.temp,
                    feels_like : weather.main.feels_like,
                    temp_min : weather.main.temp_min,
                    temp_max : weather.main.temp_max,
                    description : weather.weather[0].description,
                    icon : weather.weather[0].icon
                };
                console.table(weatherInfo);
                res.render("./weather/weather", {weatherInfo : weatherInfo, error: null});
            }
        }
    });
};