const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req, res) {
  const cityName = req.body.cityName;
  const appKey = "f1596211f3071d4a28ddda9bddc16f33";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +",in&appid="+ appKey +"&units="+ units;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>The temperature in "+ cityName +" is : "+temperature+"</h1>");
      res.write("<p>The weather is "+weatherDescription+"</p>");
      res.write("<img src="+imageUrl+">");
      res.send();
    })
  })
})

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
