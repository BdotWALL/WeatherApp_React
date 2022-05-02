import React, {useState} from 'react';
import 'animate.css';
import './App.css';

const background = document.getElementById("main")
let currentDate = new Date();
let hours = currentDate.getHours() ;
let minutes = currentDate.getMinutes()
let secs = currentDate.getSeconds()
let today = currentDate.getDate();
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();
let dayOfWeek = currentDate.toLocaleString("default", { weekday: "long" })


// function to change hours to 12 hour format
function formatHoursTo12(x) {
  return x % 12 || 12;
}

// function that determines whether to display am or pm
//Refactored previous function into 2 separte functions
function pmTime() {
  if(hours >= 12) {
    return "p.m."
  }
}

function amTime() {
  if(hours <= 11) {
    return "p.m."
  }
}

// function that changes the background based on the time of day. Set to night at 8pm.
//refactored into 2 separate functions
function dayTimeBackground() {
  if(hours <= 19 ) {
     background.className="day"
  }
}

function nightTimeBackground() {
  if(hours >= 20 ) {
     background.className="night"
  }
}
dayTimeBackground()
nightTimeBackground();

function todaysDate () {
  return(
    'Today is ' + dayOfWeek + ", " + month + "/" + today + "/" + year + "\n\n\n")
}

function dayTime (){
  if(hours <= 11)
  return (
    "It is " + formatHoursTo12(hours) + ":" + minutes + ":" + secs + " " +  amTime()
  )
}

function nightTime (){
  if(hours >= 12)
  return (
    "It is " + formatHoursTo12(hours) + ":" + minutes + ":" + secs + " " +  pmTime()
  )
}

dayTime ()
nightTime ()

function App() {
  const [zipcode, setZip] = useState("");
  const [weather, setWeather] = useState("");

  const api_key = '2faeef6daac08a854737c16d695cc2b9';
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${api_key}&units=imperial` 

// checks if the zipcode is valid. if so it fetches the weather data
  const handleSubmit = (event) => {
    event.preventDefault();
  if (!zipcode || zipcode.length < 5 || zipcode.length > 5) {
   alert("The Zip/Postal Code is missing or invalid.")

  }else{
    return fetch(url)
	.then(response => response.json())
  .then(result => {
    setWeather(result);
    setZip('');
    console.log(result);
  })
  .catch(err => console.error(err));
}}


//Returns the icon image associated with the description property from console.log
const getIcon = () => {
  if (weather) {
  let icon = weather.weather[0].icon

  return`http://openweathermap.org/img/wn/${icon}@2x.png`;
}
}

// Used to get the city's  name and dsiplay in specific format
const cityName = () => {
  if (weather) {
    const place = weather.name
    return (
     "City: " + place 
      ) 
    }}


// Used to get current temp and dsiplay in specific format
const tempCheck = () => {
  if (weather) {
    let temp = Math.round(weather.main.temp)
    let actualTemp = temp + "°"
    return (
     "Temp Now: " + actualTemp
      )
    }}

// Used to get high temp and dsiplay in specific format
const highTemp = () => {
  if (weather) {
    let temp = Math.round(weather.main.temp_max)
    let actualHigh = temp + "°"
    return (
     "High: " + actualHigh
      )
    }}

const lowTemp = () => {
  if (weather) {
    let temp = Math.round(weather.main.temp_min)
    let actualLow = temp + "°"
    return (
     "Low: " + actualLow
      )
    }}

const feelsLike = () => {
  if (weather) {
    let temp = Math.round(weather.main.feels_like)
    let feels = temp + "°"
    return (
     "Feels Like: " + feels
      )
    }}

const humidity = () => {
  if (weather) {
    let hum = weather.main.humidity
    let humid = hum + "%"
    return (
     "Humidity: " + humid
      )
    }}

const currentConditons = () => { 
  if (weather) {
  let description = weather.weather[0].description
  return (
    "Conditions: " + description
  )
  }}

  const sunRise = () => {
    if (weather) {
    let rise = weather.sys.sunrise
    let sunriseEST = new Date(rise * 1000)
    return "Sunrise: " + `${sunriseEST.toLocaleDateString()}, ${sunriseEST.toLocaleTimeString()}`
  }}

  const sunSet = () => {
    if (weather) {
    let rise = weather.sys.sunset
    let sunsetEST = new Date(rise * 1000)
    return "Sunset: " +  `${sunsetEST.toLocaleDateString()}, ${sunsetEST.toLocaleTimeString()}`
  }}

  return (
    <div className="App">
      <header className="App-header">
       <h1 className='animate__animated animate__zoomInDown'>WeatherNow</h1>
      </header> 
    <div className="form animate__animated animate__lightSpeedInLeft animate__delay-1s">
    <form onSubmit={handleSubmit}>
      <input 
         className='textbox'
         type="number" 
         placeholder="Enter Your Zip Code"
         value={zipcode}
        onChange={(e) => setZip(e.target.value)}/> <br></br>
      <input className='button transparent-bg' type="submit" value="Get The Weather Now"/>
    </form>
    </div>

    <div className='data transparent-bg animate__animated animate__lightSpeedInLeft animate__delay-2s'>
      <h2 className='dateTime'> {todaysDate()}<br></br></h2> 
      <h3 className='time'>{dayTime()} {nightTime()}</h3>
      <img src={getIcon()} alt=""/>
      <div className='city'>{cityName()} </div>
      <div className='weather'>
        <div className='conditions'>{currentConditons()}</div>
        <div>{tempCheck()}</div>
        <div>{feelsLike()}</div>
        <div>{highTemp()} </div>
        <div>{lowTemp()} </div>
        <div>{humidity()} </div>
        <div>{sunRise()}</div>
        <div>{sunSet()}</div>
      </div>  
    </div>
    
    <footer>
        
            © 2022 Copyright:
            WeatherNOW
          
    </footer>

    </div>
  ); 
}

export default App
