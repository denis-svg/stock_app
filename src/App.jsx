import Authentificate from "./components/weather_app/Authentificate";
import Register from "./components/weather_app/Register";
import WeatherApp from "./components/weather_app/WeatherApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherApp />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Authentificate />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
