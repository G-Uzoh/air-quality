const ForecastCard = ({ aqi, date }) => {
  return (
    <div className="bg-red-400 mx-3 rounded-md p-2 flex flex-col items-center">
      <p className="bg-white w-10 h-10 rounded-full flex items-center justify-center mb-5">
        {aqi}
      </p>
      <p>{date}</p>
    </div>
  );
};

export default ForecastCard;
