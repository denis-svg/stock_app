import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import axios from "axios";
import DisplayWeather from "./DisplayWeather";
import { Typography, Grid, IconButton, Button } from "@mui/material";
import { useSelector } from "react-redux";
import CheckBox from "./CheckBox";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CommentsSection from "./CommentsSection";

function WeatherApp() {
  const [isChecked, setIsChecked] = useState(false);
  const [input, setInput] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: 47.0245117,
    longitude: 28.8322923,
  });
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [city, setCity] = useState("Chisinau");
  const day = useSelector((state) => state.day);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") === "true"
  ); // Track dark mode state

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleCheckBox = (event) => {
    setIsChecked(event.target.checked);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const [savedCities, setSavedCities] = useState([]);

  useEffect(() => {
    // Filter city keys from local storage
    const keys = Object.keys(localStorage).filter(
      (key) => key !== "isDarkMode"
    );
    setSavedCities(keys);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${input}&limit=1&apiKey=${"7f59ea1f7f4a40949e9d11a9e5861d58"}`
      );
      let filteredResponse = response.data.features[0].geometry.coordinates;
      setCoordinates({
        latitude: filteredResponse[1],
        longitude: filteredResponse[0],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCityClick = async (clickedCity) => {
    setInput(clickedCity);
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${input}&limit=1&apiKey=${"7f59ea1f7f4a40949e9d11a9e5861d58"}`
      );
      let filteredResponse = response.data.features[0].geometry.coordinates;
      setCoordinates({
        latitude: filteredResponse[1],
        longitude: filteredResponse[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      let request = `https://api.openweathermap.org/data/2.5/forecast?units=Metric&lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=d81494e4e01f95053d7cb99bf842ede5`;
      if (isChecked)
        request = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=d81494e4e01f95053d7cb99bf842ede5`;
      try {
        const response = await axios.get(request);
        setWeatherForecast(response.data.list);
        if (input) {
          setCity(input.charAt(0).toUpperCase() + input.toLowerCase().slice(1));
          console.log(localStorage.getItem("city"));
          localStorage.setItem(
            input.charAt(0).toUpperCase() + input.toLowerCase().slice(1),
            JSON.stringify(true)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherForecast();
  }, [coordinates]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: isDarkMode ? "#48494B" : "#fff", // Set background based on dark mode state
        color: isDarkMode ? "#fff" : "#212121", // Set text color based on dark mode state
      }}
    >
      <IconButton
        onClick={toggleDarkMode}
        style={{ position: "absolute", top: "20px", right: "20px" }} // Position button in top right corner
      >
        <Brightness4Icon />
      </IconButton>
      <IconButton
        component={Link}
        to="/login"
        style={{ position: "absolute", top: "20px", left: "20px" }} // Position button in top left corner
      >
        <AccountCircleIcon />
      </IconButton>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing={3}
        >
          <Typography variant="h3">Weather Forecast</Typography>
          <Typography variant="h6">
            {city} {day.day} {day.date}
          </Typography>
        </Grid>
        <Grid item>
          <SearchBar
            input={input}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            darkMode={isDarkMode}
          />
          <CheckBox
            isChecked={isChecked}
            handleChange={handleCheckBox}
            darkMode={isDarkMode}
          />
        </Grid>
        <Grid item>
          <DisplayWeather
            weatherForecast={weatherForecast}
            isChecked={isChecked}
            darkMode={isDarkMode}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default WeatherApp;
