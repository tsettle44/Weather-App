function enter () {
    if(event.key === 'Enter'){
        search()
    }
}

function search () {

    while (document.getElementById("weatherData").firstChild) {
        document.getElementById("weatherData").removeChild(document.getElementById("weatherData").firstChild);
    }
               
    var zipCode = document.getElementById('zipCode').value

    var request = new XMLHttpRequest();
    
    request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?zip='+zipCode+',us&appid=26e9a3f1568c93129c774adfb8c5aecd', true);
    request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(data)

    var icons = 
    {
        200:{
            "url": "http://openweathermap.org/img/w/11d.png" 
        },
        300:{
            "url": "http://openweathermap.org/img/w/09d.png" 
        },
        500:{
            "url": "http://openweathermap.org/img/w/10d.png" 
        },
        600:{
            "url": "http://openweathermap.org/img/w/13d.png" 
        },
        700:{
            "url": "http://openweathermap.org/img/w/50d.png" 
        },
        800:{
            "url": "http://openweathermap.org/img/w/01d.png" 
        },
    }


    console.log(data.name)
    var cityName = data.name
    var country = data.sys.country

    var weather = data.weather[0].main
    var weatherDesc = data.weather[0].description
    console.log(weatherDesc)

    //Add data to DOM
    //img
    var img = document.createElement("img")
    img.id = "icon"
    var element = document.getElementById("weatherData");
    element.appendChild(img);

    //cityname
    var name = document.createElement("h3");
    var node = document.createTextNode(cityName + ", " + country);
    name.appendChild(node);

    //weather
    var condition = document.createElement("h5");
    var conditionNode = document.createTextNode(weather);
    condition.appendChild(conditionNode);

    //weather desc.
    var conditionDesc = document.createElement("h6");
    var conditionDescNode = document.createTextNode(weatherDesc.toUpperCase());
    conditionDesc.appendChild(conditionDescNode);

    //weather icon
    weatherID = Math.floor(data.weather[0].id / 100) * 100
    console.log(weatherID)
    document.getElementById("icon").src = icons[weatherID].url
    document.getElementById("icon").width = 100
    document.getElementById("icon").height = 100

    //Append to DOM
    var element = document.getElementById("weatherData");
    element.appendChild(img);
    element.appendChild(name);
    element.appendChild(condition);
    element.appendChild(conditionDesc);

    }

    request.send(); 
}
      
