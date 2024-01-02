const Card = ({ components, dt, main }) => {

    let pollutants = [];
    
    // // Days of the week and calendar months
    // const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // // Helper function to obtain date in format dd MM DD
    // const getDateString = (date) => {
    //     const timeOfRetrieval = new Date(date * 1000);

    //     const dateString = [
    //         days[timeOfRetrieval.getDay()],
    //         months[timeOfRetrieval.getMonth()],
    //         timeOfRetrieval.getDate(),
    //     ].join(' ');

    //     return dateString;
    // }

    // const dateOfCurrentPollutionData = getDateString(dt);

    for (const key in components) {
        const chemicalCompounds = key.replace('_', '.');
        const regExp = /[0-9].*/gi;
        const atoms = chemicalCompounds.match(regExp);
        const atom = atoms ? atoms.toString() : null;
        const compound = chemicalCompounds.replace(atoms, '').toUpperCase();
        const concentration = parseFloat(components[key]);
        pollutants.push({ compound, atom, concentration });
    }

  return (
      <>
        <p>{dt}</p>
        <p>AQI: {main.aqi}</p>
        <div className="bg-slate-500 rounded-3xl p-4 m-5 flex flex-col justify-center items-center">
            <h3>Pollutants</h3>
            <div className="grid grid-cols-8">
                {pollutants.map((cmpt, i) => {
                    return <div key={i} className="bg-orange-300 p-4 m-3 rounded-xl flex flex-col items-center justify-center">
                        <p>{cmpt.compound}<sub>{cmpt.atom}</sub></p>
                        <p className="text-sm">{cmpt.concentration}</p><span className="text-xs">μg/m³</span>
                    </div>
                })}

            </div>
        </div>
    </>
  )
}

export default Card;