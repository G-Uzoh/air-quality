import Search from "../components/Search";
import Card from "../components/Card";
import PollutionForecast from "./PollutionForecast";
import { MoonLoader } from "react-spinners";

const AirQuality = ({
  city,
  country,
  handleSearch,
  handleChange,
  handleKeyPress,
  currentAirPollution,
  dateOfCurrentPollutionData,
  airPollutionForecast,
  isLoading,
  displayText,
}) => {
  
  let pollutants = [];

  // Convert source data to proper chemical form
  for (const key in currentAirPollution?.components) {
    const chemicalCompounds = key.replace("_", ".");
    const regExp = /[0-9].*/gi;
    const atoms = chemicalCompounds.match(regExp);
    const atom = atoms ? atoms.toString() : null;
    const compound = chemicalCompounds.replace(atoms, "").toUpperCase();
    const concentration = parseFloat(currentAirPollution.components[key]);

    pollutants.push({ compound, atom, concentration });
  }

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <Search
        city={city}
        handleSearch={handleSearch}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
      />
      <div className="md:bg-slate-400 rounded-xl p-4 mx-5 mt-5 md:my-20 flex flex-col items-center justify-center md:h-56 md:w-3/5">
        {displayText && <p>Search city to display air pollution data</p>}
        {isLoading && <MoonLoader color="white" />}
        {currentAirPollution && (
          <>
            <p className="capitalize">
              {city}, {country}
            </p>
            <div>
              <Card
                {...currentAirPollution}
                dt={dateOfCurrentPollutionData}
                pollutants={pollutants}
              />
            </div>
          </>
        )}
      </div>
      <div className="md:bg-slate-400 rounded-xl p-4 m-5 flex flex-col items-center justify-center md:h-56 md:w-3/5 box-border">
        {displayText && <p className="invisible md:visible">Search city to display air pollution forecast</p>}
        {isLoading && <MoonLoader color="white" />}
        {airPollutionForecast && (
          <PollutionForecast airPollutionForecast={airPollutionForecast} />
        )}
      </div>
      {currentAirPollution && (
        <p className="text-center my-10">
          Data sourced from OpenWeatherMap API
        </p>
      )}
    </div>
  );
};

export default AirQuality;
