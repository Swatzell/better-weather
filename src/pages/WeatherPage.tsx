import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getWeather } from '../api/api-calls';
import { WeatherData } from '../types/weather';
import { getClothingSuggestion } from '../types/clothingSuggestions';
import './WeatherPage.css';

const WeatherPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city') || '';
  const latitude = searchParams.get('lat') || '';
  const longitude = searchParams.get('lon') || '';
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(parseFloat(latitude), parseFloat(longitude));
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchWeather();
    }
  }, [latitude, longitude]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData) {
    return <div>No data available</div>;
  }

  const todayForecast = weatherData.daily[0];
  const clothingSuggestion = getClothingSuggestion(todayForecast.temp.day, todayForecast.weather[0].id);

  return (
    <div className="weather-page">
      <header className="weather-header">
        <h1>Today's forecast for {city}:</h1>
      </header>
      <div className="weather-info">
        <div className="weather-icon">
          <img src={`http://openweathermap.org/img/wn/${todayForecast.weather[0].icon}@2x.png`} alt="Weather Icon" />
        </div>
        <div className="weather-details">
          <p>Temperature: {todayForecast.temp.day}°F ({((todayForecast.temp.day - 32) * 5 / 9).toFixed(2)}°C)</p>
          <p>Precipitation: {todayForecast.pop}%</p>
        </div>
      </div>
      <div className="weather-description">
        <p>{todayForecast.summary}</p>
        <p>{clothingSuggestion}</p>
        <div className="weather-icons">
          <span>🌧️</span> <span>☔</span> <span>🧥</span>
        </div>
      </div>
      <button className="home-button" onClick={() => window.history.back()}>Home</button>
    </div>
  );
};

export default WeatherPage;
