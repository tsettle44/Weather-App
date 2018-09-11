function search () {
    var cityName = document.getElementById('city').value
    var stateName = document.getElementById('state').value
    var zipCode = document.getElementById('zipCode').value

    console.log(cityName, stateName, zipCode)

    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?zip='+zipCode+',us&appid=26e9a3f1568c93129c774adfb8c5aecd', true);
    request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    console.log(data)
    }

    request.send();
}