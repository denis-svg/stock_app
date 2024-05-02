import React, { useState } from "react";
import { AreaChart, Area, XAxis, Tooltip } from "recharts";
import { Typography, Grid } from "@mui/material";

function DisplayWeather({ weatherForecast }) {
  if (weatherForecast === null)
    return <Typography variant="h4">Input a weather forecast</Typography>;

  const [selectedDay, setSelectedDay] = useState(null);

  const organizeDataByDay = () => {
    const days = {};
    weatherForecast.forEach((forecast) => {
      const date = forecast.dt_txt.split(" ")[0];
      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(forecast);
    });
    return days;
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

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
        <div style={{ backgroundColor: "white", padding: "5px" }}>
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
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        {selectedDay && (
          <AreaChart
            width={600}
            height={200}
            data={daysData[selectedDay].map((item) => ({
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
      </Grid>
      <Grid item container direction="row" justifyContent="center" spacing={3}>
        {Object.keys(daysData).map((day) => (
          <Grid
            item
            key={day}
            onClick={() => handleDayClick(day)}
            style={{
              cursor: "pointer",
              border: selectedDay === day ? "2px solid blue" : "none",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
            <Typography variant="h6">{getDayOfWeek(day)}</Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default DisplayWeather;
