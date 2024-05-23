import './HomePage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
  };


  const handleSubmit = () => {
    const selectedOption = document.querySelector(`#locations option[value="${location}"]`);
    const lat = selectedOption?.getAttribute('data-lat');
    const lon = selectedOption?.getAttribute('data-lon');

    if (lat && lon) {
        navigate(`/weather?city=${location}&lat=${lat}&lon=${lon}`);
    }
  };

  return (
    <div className='homepage-body'>
      <h2>Input your location to get clothing recommendations for today!!!</h2>
      <div className='input-box'>
        <label htmlFor="options">Choose your location!</label>
        <select className='city-selector' id='locations' onChange={handleLocationChange} value={location}>
          <option value="" disabled>Select an Option</option>
          <option value="Denver" data-lat="39.7392" data-lon="-104.9903">Denver, CO</option>
          <option value="El Paso" data-lat="31.7619" data-lon="-106.4850">El Paso, TX</option>
          <option value="Birmingham" data-lat="33.5186" data-lon="-86.8104">Birmingham, AL</option>
          <option value="Chicago" data-lat="41.8781" data-lon="-87.6298">Chicago, IL</option>
        </select>
        <button className='rec-button' onClick={handleSubmit}>See your Recommendations!</button>
      </div>
      <p>Have you ever looked at the weather for the day and wondered "What in the world do I wear??" Well then this webpage is for you!!</p>
    </div>
  );
}
