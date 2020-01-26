// Test function to get flight data
function getFlightData(){
    // var url = "https://flight-check.herokuapp.com/flights?date=2020-01-01"

    var req = new XMLHttpRequest();
    var url = "https://flight-check.herokuapp.com/flights?date=2020-" 
        + String.format("%02d", Date.getMonth())
        + "-" + String.format("%02d", Date.getDate());

    req.open("GET", url);
    req.send();
    
    req.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            document.getElementById("data").innerHTML = req.responseText;
            // console.log(req.responseText);
        }
    }
}

function findBannedCarryOnItems(carryOn) {
    const carryOnBannedUppercase = ["AEROSOL INSECTICIDE", "AMMUNITION", "AMMO", "ELECTRONIC LIGHTERS", "AXES",
                                    "HATCHETS", "BASEBALL BATS", "BEAR SPRAY", "BB GUNS", "BEAR SPRAY", 
                                    "BOW AND ARROWS", "BOX CUTTERS", "BRASS KNUCKLES", "CAP GUNS", "CROWBARS",
                                    "DARTS", "DYNAMITE", "FERTILIZER", "FIREARMS", "GUNS", "FIRECRACKERS",
                                    "FLARES", "GASOLINE", "HAMMERS", "GRENADES", "KNIVES", "MEAT CLEAVERS",
                                    "NUNCHUCKS", "WATER BOTTLE", "POCKET KNIFE", "RIFLE", "SAW", "MEMES"
                                ];

    let bannedUserItems = carryOn.filter(item => {
        carryOnBannedUppercase.includes(item.toUpperCase());
    });

    return bannedUserItems;
}

function addWeatherItems(tempF, main, clouds, windSpeed) {
    let output = [];

    if(tempF < 45) {
        output.push("Heavy jacket");
    }
    if(tempF >= 45 && tempF < 80) {
        output.push("Light jacket");
    }
    if(tempF > 80) {
        output.push("Swimsuit");
        output.push("Flip flops");
    }
    if(main === "Rain") {
        output.push("Rain jacket");
        output.push("Rain boots");
        output.push("Umbrella");
    }
    if(clouds.all < 40) {
        output.push("Sunglasses");
        output.push("Sunscreen");
    }
    if(windSpeed > 10) {
        output.push("Windbreaker");
    }

    return output;
}

function getWeather(city){
    // var data = null;

    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function () {
    // 	if (this.readyState === this.DONE) {
    // 		console.log(this.responseText);
    // 	}
    // });

    // xhr.open("GET", "https://community-open-weather-map.p.rapidapi.com/weather?callback=test&id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&mode=xml%252C%20html&q=London%252Cuk");
    // xhr.setRequestHeader("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com");
    // xhr.setRequestHeader("x-rapidapi-key", "SIGN-UP-FOR-KEY");

    // xhr.send(data);
}

function findFlight(flightNum){
    var req = new XMLHttpRequest();
    var url = "https://flight-check.herokuapp.com/flights?date=2020-01-" + date;
    req.open("GET", url);
    req.send();
    
    var returnVal = [];
    
    // Gets the matching flight according to the flight number
    req.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var obj = JSON.parse(req.responseText); // json of flights
            var count = Object.keys(obj).length;
            
            // search for flightNum match
            for(var i = 0; i < count; i++){
                var curFlight = obj[i];
                if(curFlight.flightNumber == flightNum){
                    const unixTimeZero = Date.parse(curFlight.arrivalTime); // Convert arrival time to Unix for easy comparison                   
                    var city = curFlight.destination.city;
                    if(curFlight.destination.city == "Dallas-Fort Worth")
                        city = "Dallas";
                    returnVal.push(city);
                    returnVal.push(unixTimeZero);

                    // document.getElementById("head").innerHTML = curFlight.flightNumber;
                    // document.getElementById("data").innerHTML = curFlight.destination.city + " " + curFlight.arrivalTime;
                    // document.getElementById("data2").innerHTML = unixTimeZero;
                }
            }
            // document.getElementById("head").innerHTML = obj[0].flightNumber;
            // document.getElementById("data").innerHTML = req.responseText;
        }
    }

    req.open("GET", url, false); // synchronous call to Flight Engine API to obtain flight based on given flight number
    req.send();
    return returnVal;
}

// Converts unix time (milliseconds) to a local time UTC
function convertUnixToTime(unixTimestamp) { 
    dateObj = new Date(unixTimestamp); 
    utcString = dateObj.toUTCString();
    return utcString;
} 

// Gets the closest time to date based on a list of given times
// Both date and list have times in unix form (careful millisecond conversion)
function findClosestTime(date, list){
    var count = Object.keys(list).length;
    
    var index_closest = 0;
    var closest = list[0].dt * 1000;
    // console.log(closest);
    for(var i = 1 ; i < count ; i++){
        var isCloser = Math.abs(list[i].dt * 1000 - date) < Math.abs(closest - date);
        closest = isCloser ? list[i].dt * 1000 : closest;
        index_closest = isCloser ? i : index_closest;
    }

    // console.log(date);
    // console.log(closest);

    // console.log(convertUnixToTime(date));
    // console.log(convertUnixToTime(closest));

    // console.log(index_closest);

    return index_closest;
    
}

// Returns a list of suggested items to add based on the weather based on the destination
function addWeatherItems(weather){
    let output = [];
    
    console.log(weather.weather[0].main);
    if(weather.weather[0].main == "Clouds"){
        output.push("umbrella");
    }

    // console.log(output);
    return output;
}

// Returns the weather for the given city and date/arrival time
function getWeather(city, date){

    // OpenWeather 5-day, 3-hour weather forecast
    var req = new XMLHttpRequest();
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",USA&appid=6d3ee0e6efe8a496f3440284ad37b6ab";
    
    var returnVal = -1;
    req.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var obj = JSON.parse(req.responseText);
            var list = obj.list;
            var weather_index = findClosestTime(date, list);
            var weather_items = addWeatherItems(list[weather_index]);
            // console.log(req.response);
            returnVal= weather_items;
        }
    }

    req.open("GET", url, false);
    req.send();
    
    return returnVal;
}

function clearDuplicates(weatherItems, curList){
    return curList.filter( ( el ) => !weatherItems.includes( el ) );
}

// METHOD CALLED IN SWIFT FOR MORE OBJECTS TO ADD

// All in one get objects to add to list
        // flightNumber - destination
        // 1653 (1/29) - Chicago ("Snow")
        // 6366 (1/28) - Dallas ("Rain")
        // 4656 (1/28) - NYC ("Clear")
        // 5035 (1/26) - Los Angeles ("Clear")
function getMoreItems(flightNum, curList){
    
    // Get correct date for the flight number
    // This is hardcoded because there is no "master list" and we need the dates
    // for the correct weather forecast3
    var date = 0;
    if(flightNum == 1653)
        date = 29;
    else if(flightNum == 6366 || flightNum == 4656)
        date = 28;
    else if(flightNume == 5035)
        date = 26;
    else 
        alert("Invalid flight number");

        
    var result = findFlight(flightNum, date);
    var weatherItems = getWeather(result[0], result[1]);
    return clearDuplicates(weatherItems, curList);
}

