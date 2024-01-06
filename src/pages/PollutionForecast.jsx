import ForecastCard from "../components/ForecastCard";

const PollutionForecast = ({ airPollutionForecast }) => {
  return (
    <div className="flex flex-col items-center mt-3 md:mt-0">
      <p className="mb-5 font-bold">Pollution Forecast</p>
      <div className="md:flex md:mt-3">
        {airPollutionForecast?.map((forecastData) => {
          return (
            <div key={forecastData.date}>
              <ForecastCard
                {...airPollutionForecast}
                aqi={forecastData.aqi}
                date={forecastData.date}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollutionForecast;
