import React, { useState } from "react";

function DisplayWeather({ weatherForecast }) {
  const [selectedDay, setSelectedDay] = useState(null);

  // Organize forecast data by day
  const organizeDataByDay = () => {
    const days = {};
    weatherForecast.forEach((forecast) => {
      const date = forecast.dt_txt.split(" ")[0]; // Extract date
      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(forecast);
    });
    return days;
  };

  // Handle day selection
  const handleDayClick = (day) => {
    if (selectedDay === day) {
      setSelectedDay(null); // Collapse if already selected
    } else {
      setSelectedDay(day);
    }
  };

  const daysData = organizeDataByDay();

  return (
    <>
      <h1>Weather Forecast</h1>
      {Object.keys(daysData).map((day) => (
        <div key={day} onClick={() => handleDayClick(day)}>
          <h2>{day}</h2>
          {selectedDay === day && (
            <div>
              {daysData[day].map((forecast) => (
                <div key={forecast.dt}>
                  <p>Time: {forecast.dt_txt.split(" ")[1]}</p>
                  <p>Temperature: {forecast.main.temp}°C</p>
                  <p>Feels like: {forecast.main.feels_like}°C</p>
                  <p>Description: {forecast.weather[0].description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default DisplayWeather;
