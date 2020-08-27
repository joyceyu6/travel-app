/* Global Variables */

var today = new Date();
//reformat today
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy+'-'+ mm + '-' + dd;
// document.write(today);
 
/*CHAINED PROMISES TO GET AND POST DATA*/
document.getElementById('generate').addEventListener('click', performAction);

function performAction(){
//select the actual value of an HTML input to include in POST  
    const date =  document.getElementById('date').value;   
    const enddate =  document.getElementById('enddate').value;   
    const city = document.getElementById('city').value;
    
    // calculate days between departure date and today
    function parseDate(date_str){
        var mdy = date_str.split('-');
        console.log(mdy);
        return new Date(mdy[0],mdy[1]-1,mdy[2]); //year, month, day
    }
    //check departure date is later than today's date, if not stop here
    if (!Client.checkDate(parseDate(today),parseDate(date))){
        alert("Departure date must be later than today's date");
        return;
    }    

    function datediff(first_date, second_date){
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second_date - first_date)/(1000*60*60*24));
    }

    let days = datediff(parseDate(today), parseDate(date))

    //calculate days between departure date and end date, i.e., length of trip
    //check returning date is later than departure date, if not stop here
    if (!Client.checkDate(parseDate(date),parseDate(enddate))){
        alert("Returning date must be later than departure date");
        return;
    }  

    let stay = datediff(parseDate(date), parseDate(enddate))

    //fetch data from APIs, two independent(geonames, pixabay), one dependent(weatherbit)
    let geonames_url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=joyceyu6`;
    let pixabay_url = `https://pixabay.com/api/?key=17745132-119267ba49b6c78eca0944594&q=${city}&image_type=photo`;
    
    var lng;
    var lat;
    var img;

    Promise.all([
        //call geonames and pixabay two independent APIs
        fetch(pixabay_url),
        fetch(geonames_url)
    ]).then(function(responses){
            // Get a JSON object from each of the responses
	    return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function(data){
        //store lng and lat for weatherbit API's use
        console.log(data);
        lng = data[1].geonames[0].lng;
        lat= data[1].geonames[0].lat;
        img = data[0].hits[0].webformatURL;
        let weatherbit_url = `http://api.weatherbit.io/v2.0/history/daily?&lat=${lat}&lon=${lng}&start_date=${today}&end_date=${date}&key=7b34a8915b2540ccaae49e3b2558d219`;
        console.log(weatherbit_url);
        //fetch weatherbit API which is dependent on geonames API
        return fetch(weatherbit_url)
            .then(response =>response.json());
   
    }).then(async data=>{
        //Add data
        console.log(data)        
        await postData('http://localhost:3000/addWeather',{min_temp:data.data[0].min_temp, max_temp: data.data[0].max_temp, city:city, date:date, days:days, stay: stay, img:img})
        updateUI()
    }).catch(function(error){
        console.log(error);
    });

}
    
/*POST*/
const postData = async (url = '', data={})=>{
    console.log(data)
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },   
        body: JSON.stringify(data),
    })
    .catch(error => console.log(error))    
}

// /*GET not really used in this app hence notated out but kept for future reference*/
// const getWeather = async(url)=>{
//     const res = await fetch(url)
//     try{

//         const data = await res.json();
//         console.log(data)
//         return data;
//     } catch(error){
//         console.log('error',error);
//         //appropriately handle the error
//     }
// }

/*UPDATE UI*/
const updateUI = async () => {
    const request = await fetch(`http://localhost:3000/all`)
    try{
        const allData = await request.json()
        console.log(allData);
        var weatherData = "High: ~"+ allData[0].max_temp + "  Low: ~" + allData[0].min_temp
        var daystodepart = "Days to departing: " + allData[0].days;
        var daysofstay = "Length of trip: " + allData[0].stay + " day(s)";
        var citydata = "My trip to: " + allData[0].city;
        var departdata = "Departing: " + allData[0].date;
        document.getElementById('returnCity').innerHTML = `<label>${citydata}<label>`;
        document.getElementById('returnDate').innerHTML = `<label>${departdata}<label>`;
        document.getElementById('weather').insertAdjacentHTML('beforeend', `<label>${weatherData}</label>`);
        document.getElementById('days').innerHTML = `<label>${daystodepart}<label>`;
        document.getElementById('stay').innerHTML = `<label>${daysofstay}<label>`;
        document.getElementById('img').src = allData[0].img
    } catch(error) {
        console.log("error",error)
    }
}

export{performAction}
