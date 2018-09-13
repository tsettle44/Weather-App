function search () {

    var zipCode = document.getElementById('zipCode').value

    console.log(zipCode)

    var request = new XMLHttpRequest();

    /*
    request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?zip='+zipCode+',us&appid=26e9a3f1568c93129c774adfb8c5aecd', true);
    request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    request.send();
    }
    */

    var data = [
        {
            "coord": {
            "lon": -122.09,
            "lat": 37.39
            },
            "weather": [
            {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
            }
            ],
            "base": "stations",
            "main": {
            "temp": 280.44,
            "pressure": 1017,
            "humidity": 61,
            "temp_min": 279.15,
            "temp_max": 281.15
            },
            "visibility": 12874,
            "wind": {
            "speed": 8.2,
            "deg": 340,
            "gust": 11.3
            },
            "clouds": {
            "all": 1
            },
            "dt": 1519061700,
            "sys": {
            "type": 1,
            "id": 392,
            "message": 0.0027,
            "country": "US",
            "sunrise": 1519051894,
            "sunset": 1519091585
            },
            "id": 0,
            "name": "Mountain View",
            "cod": 200
        }
    ]

    console.log(data[0].name)
    var cityName = data[0].name
    var country = data[0].sys.country

    //Add date to DOM
    var name = document.createElement("h3");
    var node = document.createTextNode(cityName + ", " + country);
    name.appendChild(node);

    var element = document.getElementById("weatherData");
    element.appendChild(name);
        
}