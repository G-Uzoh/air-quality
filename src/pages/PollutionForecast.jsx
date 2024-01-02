import Card from "../components/Card";

const PollutionForecast = ({ airPollutionForecast }) => {
    console.log(airPollutionForecast);
  return (
    <div>
        <p>Pollution Forecast</p>
        <div>{airPollutionForecast?.map((forecastData, i) => {
            return <Card key={i} dt={forecastData.date} main={forecastData.aqi} />
        })}</div>
    </div>
  )
}

export default PollutionForecast;