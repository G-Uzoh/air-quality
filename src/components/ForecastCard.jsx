const ForecastCard = ({ aqi, date }) => {
    const color = aqi === 1 ? 'green-700' : aqi === 2 ? 'green-300' : aqi === 3 ? 'amber-300' : aqi === 4 ? 'red-400' : 'red-700';

  return (
    <div className="bg-white mx-3 rounded-md p-2 flex flex-col items-center">
      <p className={`bg-${color} w-10 h-10 rounded-full flex items-center justify-center mb-5`}>
        {aqi}
      </p>
      <p className="text-[#333]">{date}</p>
    </div>
  );
};

export default ForecastCard;
