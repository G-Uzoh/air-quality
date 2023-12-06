import { useEffect } from "react";

const Weather = () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=helsinki&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(url);
        const json = await data.json();
        console.log(json);
        return json;
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, [url]);
  return (
    <>
      <h2>Weather data will be here</h2>
    </>
  );
};

export default Weather;
