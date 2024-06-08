import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import History from "./pages/History";
import NavBar from "./components/NavBar";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = process.env.REACT_APP_AZURE_MAPS_KEY;
        const location = "39.952583,-75.165222";

        const response = await fetch(
          `https://atlas.microsoft.com/weather/forecast/daily/json?api-version=1.0&query=${location}&subscription-key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        console.log("jsonData", jsonData);
      } catch (error) {}
    };

    fetchWeatherData();
  }, []);

  return (
    <Router>
      <ToastContainer autoClose={2000} />
      <Auth0ProviderWithHistory>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/history" element={<History />} />

        </Routes>
      </Auth0ProviderWithHistory>
    </Router>
  );
};

export default App;
