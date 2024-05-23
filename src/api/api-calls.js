function getCurrentWeather(latitude, longitude){

}

function getForecast(latitude, longitude){
    return fetch('https://api.openweathermap.org/data/3.0/onecall?lat='+latitude+'&lon='+longitude+'&exclude=minutely&appid=b6c20e33c539bc3bf6a4cd3dcc54e835&units=imperial')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network work error');
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('There has been an error: ', error));
}

export {getCurrentWeather, getForecast}