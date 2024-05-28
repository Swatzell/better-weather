import { WeatherData } from '../types/weather';


export function GetWeather(latitude: number, longitude: number, navigate: (path: string) => void): Promise<WeatherData> {
  return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=b6c20e33c539bc3bf6a4cd3dcc54e835&units=imperial`)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          navigate('/404');
        } else if (response.status >= 500) {
          navigate('/500');
        } else {
          navigate(`/error/${response.status}`);
        }
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data as WeatherData;
    })
    .catch(error => {
      navigate('/500');
      throw error;
    });
}