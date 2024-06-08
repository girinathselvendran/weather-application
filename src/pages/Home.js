import React, { useState } from "react";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";
import WeatherCard from "./WeatherCard";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [response, setResponse] = useState(null);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState({
    month: "June",
    day: "7",
    year: "2024",
  });

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDate((prevDate) => ({
      ...prevDate,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("Location:", location);
    console.log("Date:", date);

    e.preventDefault();
    if (!location.trim()) {
      toast.error("All fields are required");
      return;
    }

    const API_key = "61b5c4fe3d7edd96b56f4b2a361cf7b1";

    const weatherUrl = (city) => {
      return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;
    };

    try {
      const { data } = await axios.get(weatherUrl(location));
      console.log("data :: ", data);
      if (data) {
        setResponse(data);
        fetchWeatherData();

        try {
          const apiKey = process.env.REACT_APP_AZURE_MAPS_KEY;
          console.log("data", data.coord);
          const location = data?.coord?.lat + "," + data.coord.lon;
          console.log("location", location);
          const result = await fetch(
            `https://atlas.microsoft.com/weather/forecast/daily/json?api-version=1.0&query=${location}&subscription-key=${apiKey}`
          );
          if (!result.ok) {
            throw new Error("Network result was not ok");
          }

          const jsonData = await result.json();
          console.log("jsonData", jsonData);
          setWeatherData(jsonData);
        } catch (error) {
          console.log("Error", error);
        }
      }
      setLocation("");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeatherData = async () => {
    try {
      const apiKey = process.env.REACT_APP_AZURE_MAPS_KEY;
      console.log("response", response);
      const location = response.coord.lat.response.coord.lon;
      console.log("location", location);
      const result = await fetch(
        `https://atlas.microsoft.com/weather/forecast/daily/json?api-version=1.0&query=${location}&subscription-key=${apiKey}`
      );
      if (!result.ok) {
        throw new Error("Network result was not ok");
      }

      const jsonData = await result.json();
      console.log("jsonData", jsonData);
      setWeatherData(jsonData);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className="location-search">
        <form>
          <label htmlFor="location">Location:</label>
          <br />
          <input
            className="location-input"
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={handleLocationChange}
            required
          />
          <div>
            <label>Date:</label>
            <br />
            <select
              className="location-date"
              name="month"
              value={date.month}
              onChange={handleDateChange}
              required
            >
              <option value="June">June</option>
            </select>
            <select
              className="location-date"
              name="day"
              value={date.day}
              onChange={handleDateChange}
              required
            >
              <option value="8">8</option>
            </select>
            <select
              className="location-date"
              name="year"
              value={date.year}
              onChange={handleDateChange}
              required
            >
              <option value="2024">2024</option>
            </select>
            <button
              onClick={(e) => handleSubmit(e)}
              className="search-btn"
              type="submit"
            >
              View
            </button>
          </div>
        </form>
      </div>
      {response && <WeatherCard weatherData={weatherData} />}
    </>
  );
};

export default Home;
