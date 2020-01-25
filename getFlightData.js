

function getFlightData(){
    var req = new XMLHttpRequest();
    var url = "https://flight-check.herokuapp.com/flights?date=2020-01-01";
    req.open("GET", url);
    req.send();
    
    req.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            document.getElementById("data").innerHTML = req.responseText;
            console.log(req.responseText);
        }
    }
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
    var url = "https://flight-check.herokuapp.com/flights?date=2020-01-01"; // get all flights for 1/1
    req.open("GET", url);
    req.send();
    
    req.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var obj = JSON.parse(req.responseText);
            var count = Object.keys(obj).length;
            console.log(count);
 
            // search for flightNum match
            for(var i = 0; i < count; i++){
                var curFlight = obj[i];
                if(curFlight.flightNumber == flightNum){
                    console.log(curFlight.origin);
                    // document.getElementById("data").i
                    document.getElementById("head").innerHTML = curFlight.flightNumber;

                    document.getElementById("data").innerHTML = curFlight.origin.city;
                    document.getElementById("data2").innerHTML = curFlight.destination.city;

                }
            }
            // document.getElementById("head").innerHTML = obj[0].flightNumber;
            // document.getElementById("data").innerHTML = req.responseText;
        }
    }
}

