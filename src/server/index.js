var path = require('path')
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };
  
  // GET route
  const weatherData=[];
  
  app.get('/all',getData)
  
  function getData(req,res){
    res.send(weatherData)
    console.log(weatherData)
  }
  
  //POST route
  app.post('/addWeather', addWeather);

  
  function addWeather(req,res){
    // console.log(req.body)
    newEntry = {
    date: req.body.date,
    days: req.body.days,
    city: req.body.city,
    max_temp: req.body.max_temp,
    min_temp: req.body.min_temp,
    img:req.body.img
    }
    
    // weatherData.push(newEntry)
    if (weatherData.length == 0){
      weatherData.push(newEntry);
    }
    else{
    weatherData[0] = newEntry;    
    }
    console.log(weatherData);
    res.end();
}