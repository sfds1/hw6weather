$("#submit").on("click", function(event){
    event.preventDefault();
    let inputCity = $("#city").val();
    let inputState = $("#state").val(); 
    let today = new Date().toDateString();

 
    if (inputCity === '' || inputState === ''){
        alert("Please enter a city and a state.");
    } else {
 // Class API key for openweathermap 
 var APIKey = "166a433c57516f51dfab1f7edaed8413";


 // The URL to get the current weather
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "," + inputState + ",US&appid=" + APIKey;

 // We then created an AJAX call
 $.ajax({
   url: queryURL,
   method: "GET"
 }).then(function(response) {
   // Create CODE HERE to Log the queryURL
   console.log(queryURL);
   console.log(response);      
   // Create CODE HERE to log the resulting object
   // Create CODE HERE to transfer content to HTML
   $('.date').text(today);
   $('.city').text(`${response.name} Weather details`);
   $('.humidity').text(`Humidity: ${response.main.humidity}%`);
   $('.wind').text(`Wind speed: ${response.wind.speed} MPH`);
   // Create CODE HERE to calculate the temperature (converted from Kelvin)
   const f = (response.main.temp - 273.15) * 1.8 + 32;
   // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
 //   SK - use toFixed to make it go to 2 decimal places
   $('.temp').text(`Temperature: ${f.toFixed(2)} F`);
   // Create CODE HERE to dump the temperature content into HTML


// nested AJAX call to get the UV Index using long and lat from first API call
        var lat = response.coord.lat;
        var long = response.coord.lon;
        console.log(lat);
        console.log(long);

        var queryURLUV =  "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + long;

        console.log(queryURLUV);
        $.ajax({
            url: queryURLUV,
            method: "GET"
          }).then(function(responseUV) {
              console.log (responseUV);
            $('.uvIndex').text(`UV Index: ${responseUV.value}`);

          });


 });



// The URL to get the 5 day forecast weather
var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + "," + inputState + ",US&appid=" + APIKey;
var index =0;
// We then create an AJAX call
$.ajax({
  url: queryURLForecast,
  method: "GET"
}).then(function(responseForecast) {
  // Create CODE HERE to Log the queryURL
  console.log(queryURLForecast);
  console.log(responseForecast);      

var forecastDate = new Date(responseForecast.list[index].dt_txt).toDateString();

//   // Create CODE HERE to log the resulting object
//   // Create CODE HERE to transfer content to HTML
  $('.dateForecast').text(forecastDate);
//   $('.city').text(`${responseForecast.name} Weather details`);
  $('.humidityForecast').text(`Humidity: ${responseForecast.list[index].main.humidity}%`);
//   $('.wind').text(`Wind speed: ${responseForecast.wind.speed} MPH`);
//   // Create CODE HERE to calculate the temperature (converted from Kelvin)
  const f2 = (responseForecast.list[index].main.temp - 273.15) * 1.8 + 32;
//   // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
// //   SK - use toFixed to make it go to 2 decimal places
  $('.tempForecast').text(`Temperature: ${f2.toFixed(2)} F`);
//   // Create CODE HERE to dump the temperature content into HTML


});

}
});


// Create input fields for city and State
// create variables for the city and state input
// Ajax call to openweather API to get the current weather information
// Display basic weather information for current day
// Need to pull longitude and latitude information from first Ajax call to put in to UV Index ajax call
// Display UVIndex for current day
// Run ajax call for 5 day forecast
// store inputs in to local storage
