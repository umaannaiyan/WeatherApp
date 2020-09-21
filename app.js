const express = require("express");
const https = require("https")
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
    const query = req.body.cityName
    const apiKey = "b40ef5e4567cc4fc864761471c2bbfc9"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";
    https.get(url,function(response){
        console.log(response.statusCode)
        response.on("data", function(data){
            const weatherData= JSON.parse(data)
            const temp =weatherData.main.temp;
            const descrip = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + query+ " is  " + temp + "  degree Celcius </h1>")
            // res.write("<br>")
            res.write("<p>The weather is currently " + descrip + " <p>")
            res.write("<img src =" + imageURL +">")
            res.send();
        })
    })
})



app.listen(3000, function(){
console.log('Server is running on http://localhost:3000');
});