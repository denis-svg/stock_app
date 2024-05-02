import React, { useState } from "react";
import { AreaChart, Area, XAxis, Tooltip } from "recharts";

function DisplayWeather({ weatherForecast }) {
  if (weatherForecast == null)
    return (
      <>
        <h1>Input a weather forecast</h1>
      </>
    );
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

  // Get day of the week
  const getDayOfWeek = (dateString) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const forecast = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>Time: {forecast.dt_txt.split(" ")[1]}</p>
          <p>Temperature: {forecast.main.temp}°C</p>
          <p>Feels like: {forecast.main.feels_like}°C</p>
          <p>Description: {forecast.weather[0].description}</p>
        </div>
      );
    }

    return null;
  };

  const daysData = organizeDataByDay();

  return (
    <>
      <h1>Weather Forecast</h1>
      {Object.keys(daysData).map((day) => (
        <div key={day} onClick={() => handleDayClick(day)}>
          <h2>
            {getDayOfWeek(day)}, {day}
          </h2>
          {selectedDay === day && (
            <AreaChart
              width={600}
              height={100}
              data={daysData[day].map((item) => ({
                ...item,
                dt_txt: item.dt_txt.slice(0, -3),
              }))}
            >
              <Area
                type="monotone"
                dataKey="main.temp"
                stroke="#ffc602"
                fill="#fcda66"
              />
              <XAxis
                dataKey="dt_txt"
                tickFormatter={(timeStr) => timeStr.split(" ")[1]}
                padding={{ left: 20, right: 20 }}
              />
              <Tooltip content={<CustomTooltip />} />
            </AreaChart>
          )}
        </div>
      ))}
    </>
  );
}

export default DisplayWeather;
