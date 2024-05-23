import { WeatherData } from '../types/weather';

export function getWeather(latitude: number, longitude: number): Promise<WeatherData> {
  return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=b6c20e33c539bc3bf6a4cd3dcc54e835&units=imperial`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network error');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data as WeatherData;
    })
    .catch(error => {
      console.error('There has been an error: ', error);
      throw error;
    });
}
