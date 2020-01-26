// Test function to get flight data
function getFlightData(){
    var req = new XMLHttpRequest();
    var url = "https://flight-check.herokuapp.com/flights?date=2020-01-01";
    req.open("GET", url);
    req.send();
    
    req.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            document.getElementById("data").innerHTML = req.responseText;
            // console.log(req.responseText);
        }
    }
}

// Search for specific flight based on a flight number
function findFlight(flightNum, date){
    var req = new XMLHttpRequest();
    var url = "https://flight-check.herokuapp.com/flights?date=2020-01-" + date; // get all flights for 1/25
    
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

