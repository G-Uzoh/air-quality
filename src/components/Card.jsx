const Card = ({ dt, main, pollutants }) => {
  const quality = main.aqi === 1 ? "Good" : main.aqi === 2 ? "Fair" : main.aqi === 3 ? "Moderate" : main.aqi === 4 ? "Poor" : "Very poor";

  return (
    <>
      <div className="flex justify-around md:justify-between mt-5 md:mt-0">
        <p>{dt}</p>
        <p>
          AQI: {main.aqi} ({quality})
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="mb-5 text-center font-bold mt-5 md:mt-0">Pollutants</h3>
        <div className="md:grid md:grid-cols-8 md:gap-1">
          {pollutants?.map((component, i) => {
            return (
              <div
                key={i}
                className="w-screen md:w-full flex items-center justify-center"
              >
                <div className="bg-blue-50 text-[#333] p-4 w-[80%] md:w-full rounded-xl flex md:flex-col items-center justify-between md:justify-center mb-2 md:mb-0">
                  <p className="font-semibold md:mb-2">
                    {component.compound}
                    <sub>{component.atom}</sub>
                  </p>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-lg md:font-normal md:text-sm">{component.concentration}</p>
                    <span className="text-xs">μg/m³</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Card;
