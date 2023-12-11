import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import Home from './pages/Home';
import Root from './pages/Root';
import About from './About';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);

  const geocodingApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${import.meta.env.VITE_GEOCODING_API_TOKEN}`;

  const airPollutionApiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setCity(searchValue);
  }

  const handleSearch = () => {
    if (city) {
      getCoordinates();
    }
  }

  const getCoordinates = async () => {
    try {
      const res = await axios.get(geocodingApiUrl);
      const data = res.data;
     
      console.log(data);

      if (data.features.length > 0) {
        const [lon, lat] = data.features[0].geometry.coordinates;
        
        setCoordinates({ lat, lon });
        
      } else {
        console.error('City not found!');
      }
    } catch (err) {
      console.error('Error fetching coordinates', err.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(airPollutionApiUrl);
        const data = res.data;

        console.log(data);
        setAirQualityData(data);
        
        console.log(data);

      } catch (err) {
        console.error(err.message);
      }
    }

    if (coordinates) {
      fetchData();
    }
  }, [coordinates, airPollutionApiUrl]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: ':category',
          element: <CategoryPage handleSearch={() => handleSearch(city)} city={city} handleChange={handleChange} />,
        },
        {
          path: '/about',
          element: <About />
        }
      ],
    },
  ]);

  return (
    <div className='bg-green-700 text-[#333]'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
