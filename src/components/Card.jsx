const Card = ({ dt, main, pollutants }) => {
  const quality = main.aqi === 1 ? 'Good' : main.aqi === 2 ? 'Fair' : main.aqi === 3 ? 'Moderate' : main.aqi === 4 ? 'Poor' : 'Very Poor';

  return (
    <>
      <p>{dt}</p>
      <p>
        AQI: {main.aqi} ({quality})
      </p>
      <div className="bg-slate-500 rounded-3xl p-4 m-5 flex flex-col justify-center items-center">
        <h3>Pollutants</h3>
        <div className="grid grid-cols-8">
          {pollutants?.map((component, i) => {
            return (
              <div
                key={i}
                className="bg-orange-300 p-4 m-3 rounded-xl flex flex-col items-center justify-center"
              >
                <p>
                  {component.compound}
                  <sub>{component.atom}</sub>
                </p>
                <p className="text-sm">{component.concentration}</p>
                <span className="text-xs">μg/m³</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Card;
