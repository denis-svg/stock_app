import React, { useState } from "react";
import { AreaChart, Area, XAxis, Tooltip, YAxis } from "recharts";
import { Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNew } from "../state/daySlice";

function DisplayWeather(props) {
  if (props.weatherForecast === null)
    return <Typography variant="h4">Input a weather forecast</Typography>;

  const [selectedDay, setSelectedDay] = useState(null);
  const dispach = useDispatch();
  const organizeDataByDay = () => {
    const days = {};
    props.weatherForecast.forEach((forecast) => {
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
        <div
          style={{
            backgroundColor: props.darkMode ? "rgba(0, 0, 0, 0.8)" : "white", // Adjust background color for dark mode
            color: props.darkMode ? "white" : "black", // Adjust text color for dark mode
            padding: "3px",
            fontSize: "0.8rem",
          }}
        >
          <p>Time: {forecast.dt_txt.split(" ")[1]}</p>
          <p>
            Temperature: {forecast.main.temp}
            {props.isChecked ? "°F" : "°C"}
          </p>
          <p>
            Feels like: {forecast.main.feels_like}
            {props.isChecked ? "°F" : "°C"}
          </p>
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
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
          </AreaChart>
        )}
      </Grid>
      <Grid item container direction="row" justifyContent="center" spacing={3}>
        {Object.keys(daysData).map((day) => (
          <Grid
            item
            key={day}
            onClick={() => {
              handleDayClick(day);
              dispach(setNew({ day: day, date: getDayOfWeek(day) }));
            }}
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
