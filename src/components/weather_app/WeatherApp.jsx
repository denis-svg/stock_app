import { useState } from "react";
import SearchBar from "../SearchBar";
import axios from "axios";

function WeatherApp() {
  const [input, setInput] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: 47.0245117,
    longitude: 28.8322923,
  });
  const handleChange = (event) => {
    setInput(event.target.value);
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
      console.log(coordinates);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>
        {coordinates.latitude} : {coordinates.longitude}
      </h1>
      <SearchBar
        input={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default WeatherApp;
