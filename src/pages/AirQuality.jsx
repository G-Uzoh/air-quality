import Search from "../components/Search";
import Card from "../components/Card";

const AirQuality = ({ city, handleSearch, handleChange, pollutionData }) => {
  return (
    <>
      <Search city={city} handleSearch={() => handleSearch(city)} handleChange={handleChange} />
      <h2>Air quality data will be here</h2>
      <div>
        {pollutionData
          ? <>
              <Card {...pollutionData} />
              <p>Data sourced from OpenWeatherMap API</p>
            </>
          : <p>Search city to display air pollution data</p>
        }
      </div>
    </>
  );
};

export default AirQuality;
