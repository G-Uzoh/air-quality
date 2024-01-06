const ForecastCard = ({ aqi, date }) => {
    const color = aqi === 1 ? 'green-700' : aqi === 2 ? 'green-300' : aqi === 3 ? 'amber-300' : aqi === 4 ? 'orange-500' : 'red-700';
    const quality = aqi === 1 ? "Good" : aqi === 2 ? "Fair" : aqi === 3 ? "Moderate" : aqi === 4 ? "Poor" : "Very poor";

  return (
    <div className="w-screen md:w-full flex items-center justify-center">
      <div className="bg-white mx-3 rounded-full md:h-36 w-[80%] md:w-20 p-2 flex md:flex-col items-center justify-between mb-2 md:mb-0">
        <div className={`bg-${color} text-[#333] w-10 h-10 md:w-14 md:h-14 text-lg rounded-full flex flex-col items-center justify-center md:mb-8 order-last md:order-first`}>
          <p>{aqi}</p>
        </div>
        <p className="text-[#333] font-semibold md:font-normal md:text-[12.5px] md:mb-2">{date}</p>
        <p className="md:hidden text-xs text-[#333]">{quality}</p>
      </div>
    </div>
  );
};

export default ForecastCard;
