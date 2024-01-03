import Search from "../components/Search";
import Card from "../components/Card";
import PollutionForecast from "./PollutionForecast";

const AirQuality = ({ city, handleSearch, handleChange, currentAirPollution, airPollutionForecast, dateOfCurrentPollutionData }) => {

  return (
    <>
      <Search city={city} handleSearch={() => handleSearch(city)} handleChange={handleChange} />
      <div>
        {currentAirPollution
          ? <>
              <Card {...currentAirPollution} dt={dateOfCurrentPollutionData} />
              <div className="bg-slate-500 rounded-3xl p-4 m-5 flex flex-col justify-center items-center">
                <PollutionForecast airPollutionForecast={airPollutionForecast} />
              </div>
              <p>Data sourced from OpenWeatherMap API</p>
            </>
          : <p>Search city to display air pollution data</p>
        }
      </div>
    </>
  );
};

export default AirQuality;
