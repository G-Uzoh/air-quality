const Card = ({ components, dt, main }) => {

    let pollutants = [];
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Helper function to obtain date in format dd MM DD
    const getDateFormat = (date) => {
        const timeOfRetrieval = new Date(date * 1000);

        const fullDate = [
            days[timeOfRetrieval.getDay()],
            months[timeOfRetrieval.getMonth()],
            timeOfRetrieval.getDate(),
        ].join(' ');

        return fullDate;
    }

    const dateOfCurrentPollutionData = getDateFormat(dt);

    for (const key in components) {
        const cpds = key.replace('_', '.');
        const regExp = /[0-9].*/gi;
        const molecules = cpds.match(regExp);
        const subscript = molecules ? molecules.toString() : null;
        const compound = cpds.replace(molecules, '').toUpperCase();
        const value = components[key];
        pollutants.push({ compound, subscript, value });
    }

  return (
      <>
        <p>{dateOfCurrentPollutionData}</p>
        <p>AQI: {main.aqi}</p>
        <div className="bg-slate-500 rounded-3xl p-4 m-5 flex flex-col justify-center items-center">
            <h3>Pollutants</h3>
            <div className="grid grid-cols-8">
                {pollutants.map((cmpt, i) => {
                    return <div key={i} className="bg-orange-300 p-4 m-3 rounded-xl flex flex-col items-center justify-center">
                        <p>{cmpt.compound.toUpperCase()}<sub>{cmpt.subscript}</sub></p>
                        <p className="text-sm">{cmpt.value}<span className="text-xs">μg/m³</span></p>
                    </div>
                })}

            </div>
        </div>
    </>
  )
}

export default Card;