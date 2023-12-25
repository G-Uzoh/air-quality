const Card = ({ components, dt, main }) => {

    let components2 = [];
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const timeOfRetrieval = new Date(dt * 1000);
    
    const fullDate = [
        days[timeOfRetrieval.getDay()],
        months[timeOfRetrieval.getMonth()],
        timeOfRetrieval.getDate(),
    ].join(' ');

    for (const key in components) {
        const cpds = key.replace('_', '.');
        const regExp = /[0-9].*/gi;
        const molecules = cpds.match(regExp);
        const subscript = molecules ? molecules.toString() : null;
        const compound = cpds.replace(molecules, '').toUpperCase();
        const value = components[key];
        components2.push({compound, subscript, value});
    }

    console.log(components2);

  return (
      <>
        <p>{fullDate}</p>
        <p>AQI: {main.aqi}</p>
        <div className="bg-slate-500 rounded-3xl p-4 m-5 flex flex-col justify-center items-center">
            <h3>Pollutants</h3>
            <div className="grid grid-cols-8">
                {/* <div className="component">
                    <h4>PM<span>2.5</span></h4>
                    <p>{components.co}</p>
                </div> */}
                {components2.map((cmpt, i) => {
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