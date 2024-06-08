import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import moment from "moment/moment";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const History = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [chartData, setChartData] = useState(null);

  const [value, setValue] = useState("1");

  const apiKey = process.env.REACT_APP_AZURE_MAPS_KEY;
  const location = "39.952583,-75.165222";
  const startDate = "2024-06-01";
  const endDate = "2024-06-30";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://atlas.microsoft.com/weather/historical/records/daily/json?api-version=1.1&query=${location}&startDate=${startDate}&endDate=${endDate}&subscription-key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        console.log("API Response:", jsonData);
        setWeatherData(jsonData.results);

        const dates = jsonData.results.map((item) => {
          return moment(item.date).format("DD-MM-YYYY");
        });
        const maxTemperatures = jsonData.results.map(
          (item) => item.temperature.maximum.value
        );
        const avgTemperatures = jsonData.results.map(
          (item) => item.temperature.average.value
        );
        const minTemperatures = jsonData.results.map(
          (item) => item.temperature.minimum.value
        );

        // Chart data
        setChartData({
          labels: dates,
          datasets: [
            {
              label: "Maximum Temperature",
              data: maxTemperatures,
              fill: false,
              borderColor: "rgb(255, 99, 132)",
              tension: 0.1,
            },
            {
              label: "Average Temperature",
              data: avgTemperatures,
              fill: false,
              borderColor: "rgb(54, 162, 235)",
              tension: 0.1,
            },
            {
              label: "Minimum Temperature",
              data: minTemperatures,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        if (error.response) {
          console.error("API response error:", error.response.data);
          setErrorMessage(`Error: `);
        } else if (error.request) {
          console.error("No response received:", error.request);
          setErrorMessage(
            "No response from the server. Please try again later."
          );
        } else {
          console.error("API request error:", error?.message);
          setErrorMessage(
            "Error fetching weather data. Please try again later."
          );
        }
      }
    };

    fetchWeatherData();
  }, []);

  const prepareChartData = () => {
    if (!Array.isArray(weatherData)) {
      console.error("Weather data is not an array:", weatherData);
      return {
        labels: [],
        datasets: [
          {
            label: "Temperature (°C)",
            data: [],
            borderColor: "red",
            fill: false,
          },
        ],
      };
    }

    const dates = weatherData.map((data) => {
      return moment(data.date).format("MM/DD/YYYY");
    });
    console.log("dates", dates);

    const temperatures = weatherData.map((data) => data.temperature);
    console.log("temperatures", temperatures);

    return {
      labels: dates,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatures,
          borderColor: "red",
          fill: false,
        },
      ],
    };
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  if (!weatherData) {
    return <div>Loading data...</div>;
  }

  // Chart options
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
      },
    },
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Today" value="1" />
              <Tab label="Hourly" value="2" />
              <Tab label="10-Day" value="3" />
              <Tab label="Calendar" value="4" />
              <Tab label="History" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">Today</TabPanel>
          <TabPanel value="2">Hourly</TabPanel>
          <TabPanel value="3">10-Day</TabPanel>
          <TabPanel value="4">Calendar</TabPanel>
          <TabPanel value="5">History</TabPanel>
        </TabContext>
      </Box>
      <div>
        <h2>Weather History for the Last 30 Days</h2>
        {weatherData ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </>
  );
};

export default History;
