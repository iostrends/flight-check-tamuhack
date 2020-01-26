function convertTimestamptoTime(unixTimestamp) { 
    // convert to milliseconds and  
    // then create a new Date object 
    dateObj = new Date(unixTimestamp * 1000); 
    utcString = dateObj.toUTCString(); 
    return utcString;

    // time = utcString.slice(-11, -4); 

    // document.querySelector( 
    //   '.output').textContent = time; 
} 

function getWeather(city){
    var req = new XMLHttpRequest();
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",USA&appid=6d3ee0e6efe8a496f3440284ad37b6ab";
    req.open("GET", url);
    req.send();
    
    req.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            document.getElementById("data").innerHTML = req.responseText;
            var obj = JSON.parse(req.responseText);
            console.log(convertTimestamptoTime(obj.list[0].dt));

        }
    }
}