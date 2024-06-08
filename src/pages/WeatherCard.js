import React from "react";
import { WiThunderstorm } from "react-icons/wi";
import "./WeatherCard.css";

const WeatherCard = ({ weatherData }) => {
  console.log("forecast", weatherData?.forecasts[0]);
  const forecast = weatherData?.forecasts[0];
  const temperature = (
    (forecast?.temperature?.maximum?.value * 9) / 5 +
    32
  ).toFixed(0);
  const realFeel = (
    (forecast?.realFeelTemperature?.maximum?.value * 9) / 5 +
    32
  ).toFixed(0);
  const windSpeed = (forecast?.day?.wind?.speed?.value / 1.609).toFixed(0); // Convert km/h to mph

  return (
    <>

      <div className="weather-card">
        <div className="weather-info">
          <div className="temperature-circle">
            <div className="temperature-value">{temperature}°F</div>
            <span style={{ color: "black" }}>
              <b> Like</b>
              <span className="real-feel" style={{ color: "#c94038" }}>
                {" "}
                {realFeel}°
              </span>
            </span>
          </div>
          <div className="details">
            <div className="weather-icon">
              <WiThunderstorm size={64} color="#000" />
              <div>{weatherData?.summary?.category || ""}</div>
            </div>
            <div className="wind">
              <div className="wind-direction">N</div>
              <div className="wind-speed">{windSpeed}</div>
            </div>
          </div>
        </div>
        <p className="passage">{weatherData?.summary?.phrase}</p>
      </div>
    </>
  );
};

export default WeatherCard;
