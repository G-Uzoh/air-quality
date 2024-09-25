import { useState, useEffect, useCallback, useRef } from "react";
import Header from "./components/Header";
import axios from "axios";
import AirQuality from "./pages/AirQuality";
import Swal from "sweetalert2";
import { getDateString } from "./helperFunctions/getDateString";
import { useDebounce } from "./customHooks/useDebounce";

function App() {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [currentAirPollution, setCurrentAirPollution] = useState(null);
  const [airPollutionForecast, setAirPollutionForecast] = useState(null);
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayText, setDisplayText] = useState(true);
  const [geocodeFeatures, setGeocodeFeatures] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [dropdownSuggestions, setDropdownSuggestions] = useState([]);

  // Dropdown container reference
  const dropdownRef = useRef(null);

  // Get date in new format dd MM DD
  const dateOfCurrentPollutionData = getDateString(date);

  // Debounce city value with 1s delay to avoid unnecessary calls to API
  const debouncedCity = useDebounce(city, 1000);

  // API URLs
  const geocodingApiUrl = `https://api.mapbox.com/search/geocode/v6/forward?q=${debouncedCity}&access_token=${import.meta.env.VITE_GEOCODING_API_TOKEN}`;

  const airPollutionApiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

  const airPollutionForecastApiUrl = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

  // Memoized function to fetch location suggestions
  const fetchLocationSuggestions = useCallback(async () => {
    try {
      const res = await axios.get(geocodingApiUrl);
      const { features } = res.data;

      // Save the full features array and display the first 5 suggestions
      setGeocodeFeatures(features);
      const suggestions = features.slice(0, 5).map((feature) => {
        const { full_address } = feature.properties;
        const fullAddressParts = full_address.split(', ');

        if (fullAddressParts.length > 3) {
          return `${fullAddressParts[0]}, ${fullAddressParts[1]}, ${fullAddressParts[fullAddressParts.length - 1]}`;
        }

        return full_address;
      });

      setDropdownSuggestions(suggestions);
    } catch (err) {
      console.log(err.message);
    }
  }, [geocodingApiUrl]);

  // Fetch location suggestions when the city value changes
  useEffect(() => {
    if (!isSelected) {
      fetchLocationSuggestions();
    }
  }, [isSelected, fetchLocationSuggestions]);

  // Handle suggestion selection from dropdown
  const handleSelectSuggestion = (i) => {
    const selectedFeature = geocodeFeatures[i];
    const selectedAddress = selectedFeature.properties.full_address;
    setCity(selectedAddress);
    setDropdownSuggestions([]); // Clear suggestions after selecting one
    setIsSelected(true);
  }

  // Close the dropdown when clicking outside of it or pressing the escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownSuggestions([]); // Close the dropdown
      }
    }

    const handleEscapeKeyPress = (e) => {
      if (e.key === 'Escape') setDropdownSuggestions([]); // Close the dropdown
      if (e.key === 'Enter') setDropdownSuggestions([]); // Close the dropdown
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKeyPress);
    }
  }, []);

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
      const { features } = res.data;
      
      if (features.length > 0) {
        const [lon, lat] = features[0].geometry.coordinates;
        const locationCoordinates = { lat, lon };
        
        setCoordinates(locationCoordinates);

      } else {
        Swal.fire({
          title: "404 Not Found!",
          text: `Found no locations with name ${city}`,
          icon: "info",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error fetching coordinates!",
        text: err.message,
        icon: "error",
      });
    }
  };

  // Air pollution current data
  useEffect(() => {
    const fetchData = async () => {
      if (coordinates?.lat === 0 && coordinates?.lon === 0) return;

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
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
        });
        setIsLoading(false);
      }
    };

    if (coordinates) {
      fetchData();
    }
  }, [coordinates, airPollutionApiUrl]);

  // Air pollution forecast data
  useEffect(() => {
    if (coordinates?.lat === 0 && coordinates?.lon === 0) return;

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
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
        });
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
        handleSearch={handleSearch}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        currentAirPollution={currentAirPollution}
        dateOfCurrentPollutionData={dateOfCurrentPollutionData}
        airPollutionForecast={airPollutionForecast}
        isLoading={isLoading}
        displayText={displayText}
        dropdownSuggestions={dropdownSuggestions}
        handleSelectSuggestion={handleSelectSuggestion}
        dropdownRef={dropdownRef}
      />
    </div>
  );
}

export default App;
