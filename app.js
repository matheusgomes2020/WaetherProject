const express = require("express");

const https = require("https");

const app = express();

app.get("/", function(req, res) {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Campinas&appid={apiKey}&imperial"

    https.get(url, function(response) {

        console.log( response.statusCode );

        response.on("data", function( data ) {

            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const waetherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write( "<p>O tempo atualmente está "  + waetherDescription + "<p>" );
            res.write( "<h1>A temperatura em Campinas é " + temp + " graus.</h1>" );
            res.write("<img src=" + imageUrl + ">");

            res.send();
            
        });

    });

});

app.listen(3000, function(){
    console.log("Servidor começou na porta 3000.")
});