const weatherConditionGroups = {
    Thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
    Drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
    Rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
    Snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
    Clear: [800],
    Clouds: [801, 802, 803, 804]
  };

  export const getClothingSuggestion = (weatherId: number): string => {
    let suggestion = '';

  if (weatherConditionGroups.Thunderstorm.includes(weatherId)) {
      suggestion = 'Wear a raincoat and carry an umbrella. Avoid outdoor activities if possible.';
    } else if (weatherConditionGroups.Drizzle.includes(weatherId) || weatherConditionGroups.Rain.includes(weatherId)) {
      suggestion = 'Carry an umbrella and wear a raincoat.';
    } else if (weatherConditionGroups.Snow.includes(weatherId)) {
      suggestion = 'Wear a heavy coat, gloves, scarf, and waterproof boots.';
    } else if (weatherConditionGroups.Clear.includes(weatherId)) {
      suggestion = 'You can dress lightly - but dont forget your sunscreen!';
    } else if (weatherConditionGroups.Clouds.includes(weatherId)) {
      suggestion = 'Wear a light jacket, as it might get cooler later.';
    }
  
  
  
    return suggestion;
  };


  export const getBackgroundColor = (weatherId: number): string => {
    if (weatherConditionGroups.Thunderstorm.includes(weatherId)) {
      return '#4B0082'; 
    } else if (weatherConditionGroups.Drizzle.includes(weatherId)) {
      return '#A9A9A9';
    } else if (weatherConditionGroups.Rain.includes(weatherId)) {
      return '#4682B4';
    } else if (weatherConditionGroups.Snow.includes(weatherId)) {
      return '#ADD8E6';
    } else if (weatherConditionGroups.Clear.includes(weatherId)) {
      return '#FFD700'; 
    } else if (weatherConditionGroups.Clouds.includes(weatherId)) {
      return '#D3D3D3';
    }
    return '#ffffff';
  };