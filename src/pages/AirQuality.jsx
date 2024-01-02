import Search from "../components/Search";
import Card from "../components/Card";
import PollutionForecast from "./PollutionForecast";

const AirQuality = ({ city, handleSearch, handleChange, currentAirPollution, airPollutionForecast, dt }) => {
  // Days of the week and calendar months
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Helper function to obtain date in format dd MM DD
  const getDateString = (date) => {
      const timeOfRetrieval = new Date(date * 1000);

      const dateString = [
          days[timeOfRetrieval.getDay()],
          months[timeOfRetrieval.getMonth()],
          timeOfRetrieval.getDate(),
      ].join(' ');

      return dateString;
  }

  const dateOfCurrentPollutionData = getDateString(dt);

  return (
    <>
      <Search city={city} handleSearch={() => handleSearch(city)} handleChange={handleChange} />
      <h2>Air quality data will be here</h2>
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
