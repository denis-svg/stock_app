import Authentificate from "./components/weather_app/Authentificate";
import CommentsSection from "./components/weather_app/CommentsSection";
import ProtectedRoute from "./components/weather_app/ProtectedRoute";
import Register from "./components/weather_app/Register";
import WeatherApp from "./components/weather_app/WeatherApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <WeatherApp />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Authentificate />}></Route>
          <Route path="/comments" element={<CommentsSection />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
