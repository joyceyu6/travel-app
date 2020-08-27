
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
const { request } = require('http');
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
  
  //Dummy API Endpoint for express server and app test
const fakeData = {
  min_temp: '15',
  max_temp: '30',
  img: 'https://pixabay.com/api/?key=17745132-119267ba49b6c78eca0944594&q=Paris&image_type=photo'
}

app.get('/fakeWeatherData', getFakeData)

function getFakeData(req, res){
 res.send(fakeData)
}

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
    const newEntry = req.body;

    if (weatherData.length == 0){
      weatherData.push(newEntry);
    }
    else{
      weatherData[0] = newEntry;    
    }
   
    res.end();
}

module.exports = app;