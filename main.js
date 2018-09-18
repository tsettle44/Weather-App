function enter () {
    if(event.key === 'Enter'){
        load()
    }
}

function load(){
    var body = document.getElementById("body")
    body.style.display = "none"
    var loader = document.getElementById("loaderBig")
    loader.classList.add("active")
    window.setTimeout(reposition, 2000)

    //TABS display none
    var tabs = document.getElementById("tabs")
    tabs.style.display = "none"
}

function reposition() {
    var body = document.getElementById("body")
    body.style.display = "block"
    var loader = document.getElementById("loaderBig")
    loader.classList.remove("active")
    var main = document.getElementById("main")
    main.style.marginTop = "10px"
    search()
}

function search () {

    while (document.getElementById("weatherData").firstChild) {
        document.getElementById("weatherData").removeChild(document.getElementById("weatherData").firstChild);
    }

    while (document.getElementById("weather").firstChild) {
        document.getElementById("weather").removeChild(document.getElementById("weather").firstChild);
    }
               
    var zipCode = document.getElementById('zipCode').value

    var request = new XMLHttpRequest();
    
    request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?zip='+zipCode+'&units=imperial'+',us&appid=26e9a3f1568c93129c774adfb8c5aecd', true);
    request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(data)

    if (data.cod == "404") {
        var name = document.createElement("h3");
        var node = document.createTextNode(data.message.toUpperCase());
        name.appendChild(node);
        var element = document.getElementById("weatherData");
        element.appendChild(name)
    } else {

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

    //TABS
    var tabs = document.getElementById("tabs")
    tabs.style.display = "block"

    //MAP
    var lat = data.coord.lat
    var lon = data.coord.lon
    map(lat, lon)

    //Add weather data to tab
    var weatherTab = document.getElementById("weather")
    var temp = document.createElement('h5')
    var tempFar = Math.round(data.main.temp * 9/5 - 459.67,0)
    var tempData = document.createTextNode("Temperature: " + tempFar + " degrees")
    var humidity = data.main.humidity
    var humdEle = document.createElement('h5')
    var humdNode = document.createTextNode("Humidity: " + humidity + "%")
    humdEle.appendChild(humdNode)
    temp.appendChild(tempData)
    weatherTab.appendChild(temp)
    weatherTab.appendChild(humdEle)

    //Append to DOM
    var element = document.getElementById("weatherData");
    element.appendChild(img);
    element.appendChild(name);
    element.appendChild(condition);
    element.appendChild(conditionDesc);

    }
    }

    request.send(); 
}

function map(lat, lon) {
    while(document.getElementById("weather").firstChild){
        
        //MAP
        var map, lat, lon;
        console.log(lat, lon)

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: lat, lng: lon},
            zoom: 8
        });
    }
}
      
