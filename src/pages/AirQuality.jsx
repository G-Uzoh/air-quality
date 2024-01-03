import Search from "../components/Search";
import Card from "../components/Card";
import PollutionForecast from "./PollutionForecast";

const AirQuality = ({ city, handleSearch, handleChange, currentAirPollution, airPollutionForecast, dateOfCurrentPollutionData }) => {

  let pollutants = [];

  // Convert source data to proper chemical form
  for (const key in currentAirPollution?.components) {
    const chemicalCompounds = key.replace('_', '.');
    const regExp = /[0-9].*/gi;
    const atoms = chemicalCompounds.match(regExp);
    const atom = atoms ? atoms.toString() : null;
    const compound = chemicalCompounds.replace(atoms, '').toUpperCase();
    const concentration = parseFloat(currentAirPollution.components[key]);
    pollutants.push({ compound, atom, concentration });
  }

  return (
    <>
      <Search city={city} handleSearch={() => handleSearch(city)} handleChange={handleChange} />
      <div>
        {currentAirPollution
          ? <>
              <Card {...currentAirPollution} dt={dateOfCurrentPollutionData} pollutants={pollutants} />
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
