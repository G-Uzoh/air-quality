import ForecastCard from "../components/ForecastCard";

const PollutionForecast = ({ airPollutionForecast }) => {
  return (
    <div>
      <p>Pollution Forecast</p>
      <div className="flex">
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
