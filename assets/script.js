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

   $('.date').text(today);
   $('.city').text(`${response.name} current weather details`);
   $('.humidity').text(`Humidity: ${response.main.humidity}%`);
   $('.wind').text(`Wind speed: ${response.wind.speed} MPH`);
   // Create CODE HERE to calculate the temperature (converted from Kelvin)
   const f = (response.main.temp - 273.15) * 1.8 + 32;
   // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
 //   SK - use toFixed to make it go to 2 decimal places
    // Create CODE HERE to dump the temperature content into HTML
   $('.temp').text(`Temperature: ${f.toFixed(2)} F`);

//    get openweathermap icons
   const iconCode = (response.weather[0].icon);
   $('.icon').attr("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");


// nested AJAX call to get the UV Index using long and lat from first API call
        var lat = response.coord.lat;
        var long = response.coord.lon;

        var queryURLUV =  "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + long;

        $.ajax({
            url: queryURLUV,
            method: "GET"
          }).then(function(responseUV) {
            $('.uvIndex').text(`UV Index: ${responseUV.value}`);
          });

         
 });


// The URL to get the 16 day forecast weather
// could have used this for the current dates weather too
var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + inputCity + "," + inputState + ",US&appid=" + APIKey;

// We then create an AJAX call
$.ajax({
  url: queryURLForecast,
  method: "GET"
}).then(function(responseForecast) {
    // console.log(responseForecast);
    
    $("h2").text("5 Day Forecast");
for (index =1; index <6; index++){

    // dynamically create ul tags for each forecast day
    var dateForecast = $("<ul>");
    var tempForecast = $("<ul>");
    var humidityForecast = $("<ul>");
    var iconForecast = $("<img>");

    var forecastDate = new Date(responseForecast.list[index].dt * 1000).toDateString();
    // console.log(responseForecast.list[index].dt);
    // console.log(forecastDate);

    dateForecast.text(forecastDate);

    humidityForecast.text(`Humidity: ${responseForecast.list[index].humidity}%`);

    // Create CODE HERE to calculate the temperature (converted from Kelvin)
    const f2 = (responseForecast.list[index].temp.day - 273.15) * 1.8 + 32;
    tempForecast.text(`Temperature: ${f2.toFixed(2)} F`);

    iconForecastCode = (responseForecast.list[index].weather[0].icon);
    iconForecast.attr("src", "http://openweathermap.org/img/wn/" + iconForecastCode + "@2x.png");

    $("#"+index+"forecast").append(dateForecast);
    $("#"+index+"forecast").append(tempForecast);
    $("#"+index+"forecast").append(humidityForecast);
    $("#"+index+"forecast").append(iconForecast);
}

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
