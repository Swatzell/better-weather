import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { GetWeather } from '../api/api-calls';
import { WeatherData } from '../types/weather';
import { getClothingSuggestion, getBackgroundColor } from '../types/clothingSuggestions';
import './WeatherPage.css';

const WeatherPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city') || '';
  const latitude = parseFloat(searchParams.get('lat') || '0');
  const longitude = parseFloat(searchParams.get('lon') || '0');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [rating, setRating] = useState<number | null>(null);
  const [savedRatings, setSavedRatings] = useState<Array<{ date: string; city: string; rating: number }>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await GetWeather(latitude, longitude, navigate);
        setWeatherData(data);
        const todayForecast = data.daily[0];
        setBackgroundColor(getBackgroundColor(todayForecast.weather[0].id));
      } catch (error) {
        const status = (error as Error).message.split(' ')[1];
        if (status === '404') {
          navigate('/404');
        } else if (parseInt(status) >= 500) {
          navigate('/500');
        } else {
          navigate(`/error/${status}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(latitude) && !isNaN(longitude)) {
      fetchWeather();
    } else {
      setLoading(false);
    }
  }, [latitude, longitude, navigate]);

  const handleRatingSubmit = () => {
    if (rating !== null) {
      const newRating = { date: new Date().toISOString().split('T')[0], city, rating };
      const updatedRatings = [...savedRatings, newRating];
      setSavedRatings(updatedRatings);
      localStorage.setItem('weatherRatings', JSON.stringify(updatedRatings));
      setRating(null); //resets rating input
    }
  };

  const handleDeleteRating = (index: number) => {
    const updatedRatings = savedRatings.filter((_, i) => i !== index);
    setSavedRatings(updatedRatings);
    localStorage.setItem('weatherRatings', JSON.stringify(updatedRatings));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData) {
    return <div>No data available</div>;
  }

  const todayForecast = weatherData.daily[0];
  const clothingSuggestion = getClothingSuggestion(todayForecast.weather[0].id);

  return (
    <div className="weather-page" style={{ backgroundColor }}>
      <h1>Better Weather 🌤️</h1>
      <header className="weather-header">
        <h2>Today's forecast for {city}:</h2>
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
        <p>{todayForecast.weather[0].description}</p>
        <p>{clothingSuggestion}</p>
        <div className="weather-icons">
          <span>🌧️</span> <span>☔</span> <span>🧥</span>
        </div>
      </div>
      <div className="rating-section">
        <h3>Rate today's weather:</h3>
        <form onSubmit={handleRatingSubmit}>
        <label htmlFor="weather-rating">Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating ?? ''}
          onChange={(e) => setRating(parseInt(e.target.value))}
          aria-label="Weather rating"
        />
        <button onClick={handleRatingSubmit}>Submit Rating</button>
        </form>
      </div>
      <div className="saved-ratings">
        <h3>Saved Ratings:</h3>
        <ul>
          {savedRatings.map((entry, index) => (
            <li key={index}>
              {entry.date} - {entry.city}: {entry.rating}/5
              <button onClick={() => handleDeleteRating(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <button className="home-button" onClick={() => navigate('/')}>Home</button>
    </div>
  );
};

export default WeatherPage;