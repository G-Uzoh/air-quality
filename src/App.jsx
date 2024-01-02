import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";
import Root from "./pages/Root";
import About from "./pages/About";
import axios from "axios";
import AirQuality from "./pages/AirQuality";

function App() {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [currentAirPollution, setCurrentAirPollution] = useState(null);
  const [airPollutionForecast, setAirPollutionForecast] = useState(null);
  // const [date, setDate] = useState(null);

  const geocodingApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${import.meta.env.VITE_GEOCODING_API_TOKEN}`;

  const airPollutionApiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

  const airPollutionForecastApiUrl = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setCity(searchValue);
  };

  const handleSearch = () => {
    if (city) {
      getCoordinates();
    }
  };

  // Get geographical coordinates of city
  const getCoordinates = async () => {
    try {
      const res = await axios.get(geocodingApiUrl);
      const data = res.data;

      console.log(data);

      if (data.features.length > 0) {
        const [lon, lat] = data.features[0].geometry.coordinates;

        setCoordinates({ lat, lon });
      } else {
        console.error("City not found!");
      }
    } catch (err) {
      console.error("Error fetching coordinates:", err.message);
    }
  };

  // Air pollution current data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(airPollutionApiUrl);
        const data = res.data.list[0];

        setCurrentAirPollution(data);
        
      } catch (err) {
        console.error(err.message);
      }
    };

    if (coordinates) {
      fetchData();
    }
  }, [coordinates, airPollutionApiUrl]);

  // Air pollution forecast data
  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const res = await axios.get(airPollutionForecastApiUrl);
        const forecastData = res.data.list.reduce((acc, item) => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          if (!acc.some(forecastItem => forecastItem.date === date)) {
            acc.push({
              date,
              aqi: item.main.aqi,
              components: item.components,
            });
          }

          return acc;
        }, []).slice(1, 5);

        setAirPollutionForecast(forecastData);

        console.log(forecastData);
      } catch (err) {
        console.error(err.message);
      }
    }

    if (coordinates) {
      fetchForecastData();
    }
  }, [coordinates, airPollutionForecastApiUrl]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/air_quality",
          element: (
            <AirQuality
              {...currentAirPollution}
              handleSearch={() => handleSearch(city)}
              city={city}
              handleChange={handleChange}
              currentAirPollution={currentAirPollution}
              airPollutionForecast={airPollutionForecast}
            />
          ),
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
  ]);

  return (
    <div className="bg-green-700 text-[#333]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
