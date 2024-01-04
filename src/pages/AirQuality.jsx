import Search from "../components/Search";
import Card from "../components/Card";
import PollutionForecast from "./PollutionForecast";

const AirQuality = ({ city, country, handleSearch, handleChange, currentAirPollution, dateOfCurrentPollutionData, airPollutionForecast }) => {

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
      <div className="bg-slate-400 rounded-xl p-4 mx-5 my-20 flex flex-col items-center justify-center h-56">
        {currentAirPollution
          ? <>
              <p className="capitalize">{city}, {country}</p>
              <div>
                <Card {...currentAirPollution} dt={dateOfCurrentPollutionData} pollutants={pollutants} />
              </div>
              
            </>
          : <p>Search city to display air pollution data</p>
        }
      </div>
      <div className="bg-slate-400 rounded-xl p-4 m-5 flex flex-col items-center justify-center h-56">
        {airPollutionForecast
          ? <div>
              <PollutionForecast airPollutionForecast={airPollutionForecast} />
            </div>
          : <div>Search city to display air pollution forecast</div>
        }
      </div>
      {currentAirPollution &&
        <p className="text-center">Data sourced from OpenWeatherMap API</p>
      }
    </>
  );
};

export default AirQuality;
