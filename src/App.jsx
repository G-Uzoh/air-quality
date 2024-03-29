import { useState, useEffect } from "react";
import Header from "./components/Header";
import axios from "axios";
import AirQuality from "./pages/AirQuality";
import Swal from "sweetalert2";

function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [currentAirPollution, setCurrentAirPollution] = useState(null);
  const [airPollutionForecast, setAirPollutionForecast] = useState(null);
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayText, setDisplayText] = useState(true);

  // Days of the week and calendar months
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Helper function to obtain date in format dd MM DD
  const getDateString = (date) => {
    const dateValue = new Date(date * 1000);

    const dateString = [
      days[dateValue.getDay()],
      months[dateValue.getMonth()],
      dateValue.getDate(),
    ].join(' ');

    return dateString;
  }

  const dateOfCurrentPollutionData = getDateString(date);

  // API URLs
  const geocodingApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${import.meta.env.VITE_GEOCODING_API_TOKEN}`;

  const airPollutionApiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

  const airPollutionForecastApiUrl = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

  const handleChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setCity(searchValue);
  };

  const handleSearch = () => {
    if (city) getCoordinates();
    else {
      Swal.fire({
        title: "Not allowed!",
        text: "Enter city name to fetch pollution data",
        icon: "warning"
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') getCoordinates();
  }

  // Get geographical coordinates of city
  const getCoordinates = async () => {
    try {
      const res = await axios.get(geocodingApiUrl);
      const data = res.data;
      
      if (data.features.length > 0) {
        const [lon, lat] = data.features[0].geometry.coordinates;
        const location = data.features[0].place_name.split(', ').slice(-1).join('');
        
        setCoordinates({ lat, lon });
        setCountry(location);

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
        setIsLoading(true);
        setDisplayText(false);

        const res = await axios.get(airPollutionApiUrl);

        // Check if call to API was successful
        if (res.status !== 200) {
          throw new Error('Failed to fetch data');
        }

        const data = res.data.list[0];

        setCurrentAirPollution(data);
        setDate(data.dt);
        setIsLoading(false);

      } catch (err) {
        console.error('Error:', err.message);
        setIsLoading(false);
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
        setIsLoading(true);
        const res = await axios.get(airPollutionForecastApiUrl);

        if (res.status !== 200) {
          throw new Error('Failed to fetch data');
        }
        
        // Get unique daily forecast data
        const currentDate = getDateString(new Date().getTime() / 1000);

        const forecastData = res.data.list.reduce((forecastDataArray, item) => {
          const date = getDateString(item.dt);
          
          const sameDate = (forecastItem) => forecastItem.date === date;
          
          if (date !== currentDate && !forecastDataArray.some(sameDate)) {
            forecastDataArray.push({
              date,
              aqi: item.main.aqi,
              components: item.components,
            });
          }

          return forecastDataArray;
        }, []).slice(0, 4); // Restrict forecast to 4 days

        setAirPollutionForecast(forecastData);
        setIsLoading(false);

      } catch (err) {
        console.error('Error:', err.message);
        setIsLoading(false);
      }
    }

    if (coordinates) {
      fetchForecastData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates, airPollutionForecastApiUrl]);

  return (
    <div className="bg-[#304269] text-white min-h-screen">
      <Header />
      <AirQuality
        {...currentAirPollution}
        city={city}
        country={country}
        handleSearch={handleSearch}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        currentAirPollution={currentAirPollution}
        dateOfCurrentPollutionData={dateOfCurrentPollutionData}
        airPollutionForecast={airPollutionForecast}
        isLoading={isLoading}
        displayText={displayText}
      />
    </div>
  );
}

export default App;
