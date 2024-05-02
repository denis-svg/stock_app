import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import DisplayWeather from "./DisplayWeather";
import { Typography, Grid, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import CheckBox from "./CheckBox";
import Brightness4Icon from "@mui/icons-material/Brightness4";

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
  const [isDarkMode, setIsDarkMode] = useState(true); // Track dark mode state

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleCheckBox = (event) => {
    setIsChecked(event.target.checked);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      let request = `http://api.openweathermap.org/data/2.5/forecast?units=Metric&lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=d81494e4e01f95053d7cb99bf842ede5`;
      if (isChecked)
        request = `http://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=d81494e4e01f95053d7cb99bf842ede5`;
      try {
        const response = await axios.get(request);
        setWeatherForecast(response.data.list);
        setCity(input.charAt(0).toUpperCase() + input.toLowerCase().slice(1));
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
