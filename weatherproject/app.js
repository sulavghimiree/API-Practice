const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){
    const appid = "2ac35e6d537e85fd14c9e2fd22cfbc3a&units=metric";
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid;
    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        console.log(temp);
        res.send("<h1>The temperature of "+query+" is "+temp+" degree celsius and is " +desc +".</h1>");
    })
})
})

app.listen(3030, function(){
    console.log("Server is running in port 3030.");
})