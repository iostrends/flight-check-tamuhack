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

function addWeatherItems(weather){
    let output = [];
    
    console.log(weather.weather[0].main);
    if(weather.weather[0].main == "Clouds"){
        output.push("umbrella");
    }

    console.log(output);
    return output;
}

// Returns the weather for the given city and date/arrival time
function getWeather(city, date){

    // OpenWeather 5-day, 3-hour weather forecast
    var req = new XMLHttpRequest();
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",USA&appid=6d3ee0e6efe8a496f3440284ad37b6ab";
    
    req.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var obj = JSON.parse(req.responseText);
            var list = obj.list;
            var weather_index = findClosestTime(date, list);
            console.log(weather_index);
            console.log("hi");
            console.log(list[weather_index]);
            return addWeatherItems(list[weather_index]);
        }
    }

    req.open("GET", url, false);
    req.send();
}