/* Global Variables */

// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
 
/*CHAINED PROMISES TO GET AND POST DATA*/
document.getElementById('generate').addEventListener('click', performAction);

function performAction(){
//select the actual value of an HTML input to include in POST  
    const date =  document.getElementById('date').value;    
    const city = document.getElementById('city').value;
    let days = 300; //to be updated
    
    let geonames_url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=joyceyu6`;
    let pixabay_url = `https://pixabay.com/api/?key=17745132-119267ba49b6c78eca0944594&q=${city}&image_type=photo`;
    
    var lng;
    var lat;
    var img;

    Promise.all([
        fetch(pixabay_url),
            //call geonames 1st API
        fetch(geonames_url)
    ]).then(function(responses){
            // Get a JSON object from each of the responses
	    return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function(data){
        //store lng and lat for next API's use
        console.log(data);
        lng = data[1].geonames[0].lng;
        lat= data[1].geonames[0].lat;
        img = data[0].hits[0].webformatURL;
        let weatherbit_url = `http://api.weatherbit.io/v2.0/history/daily?&lat=${lat}&lon=${lng}&start_date=${date}&end_date=2020-08-02&key=7b34a8915b2540ccaae49e3b2558d219`;
        console.log(weatherbit_url);
        //fetch Weather 2nd API
        return fetch(weatherbit_url)
            .then(response =>response.json());
   
    }).then(async data=>{
        //Add data
        console.log(data)        
        await postData('http://localhost:3000/addWeather',{min_temp:data.data[0].min_temp, max_temp: data.data[0].max_temp, city:city, date:date, days:days, img:img})
        updateUI()
    }).catch(function(error){
        console.log(error);
    });

}
    

//     //call geonames 1st API
//     fetch(geonames_url).then(function(response){
//         if(response.ok){
//             return response.json();
//            } else{
//                return Promise.reject(response);
//            }
//     }).then(function(data){
//         //store lng and lat for next API's use
//         lng = data.geonames[0].lng;
//         lat= data.geonames[0].lat;
//         let weatherbit_url = `http://api.weatherbit.io/v2.0/history/daily?&lat=${lat}&lon=${lng}&start_date=${date}&end_date=2020-08-02&key=7b34a8915b2540ccaae49e3b2558d219`

//         //fetch Weather 2nd API
//         return fetch(weatherbit_url);
//     }).then(function(response){
//         if(response.ok){
//             return response.json();
//         } else {
//             return Promise.reject(response);
//         }
//     }).then(async data=>{
//         //Add data
//         console.log(data)        
//         await postData('http://localhost:3000/addWeather',{min_temp:data.data[0].min_temp, max_temp: data.data[0].max_temp, city:city, date:date, days:days})

//         updateUI()
//     })

// } 

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
    

    // try {
    //     const newData = await response.json();
    //     console.log(newData);
    //     return newData;
    // }catch(error) {
    //     console.log(error);
    // //appropriately handle the error
    // }
};

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
        
    document.getElementById('returnDate').innerHTML = allData[0].date;
    document.getElementById('max_temp').innerHTML = allData[0].max_temp;
    document.getElementById('min_temp').innerHTML = allData[0].min_temp;
    document.getElementById('returnCity').innerHTML = allData[0].city;
    document.getElementById('days').innerHTML = allData[0].days;
    }catch(error){
        console.log("error",error)
    }
}


export {performAction}
