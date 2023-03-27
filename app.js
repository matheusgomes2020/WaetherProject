const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use( bodyParser.urlencoded({extended: true}) )

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req, res) {

    const query = req.body.cityName;
    const apiKey = "******";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit

    https.get(url, function(response) {

        console.log( response.statusCode );

        response.on("data", function( data ) {

            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const waetherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write( "<p>O tempo atualmente está "  + waetherDescription + "<p>" );
            res.write( "<h1>A temperatura em " + query + " é " + temp + " graus.</h1>" );
            res.write("<img src=" + imageUrl + ">");

            res.send();
            
        });

    });

})


app.listen(3000, function(){
    console.log("Servidor começou na porta 3000.")
});
