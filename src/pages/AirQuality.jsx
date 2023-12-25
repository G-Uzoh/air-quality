import Card from "../components/Card";

const AirQuality = ({ pollutionData }) => {
  return (
    <>
      <h2>Air quality data will be here</h2>
      {/* <Card date={date} /> */}
      <div>
        {pollutionData
          ? <>
              <Card {...pollutionData} />
              <p>yes</p>
            </>
          : <p>Search city to display air qaulity data</p>
        }
      </div>
    </>
  );
};

export default AirQuality;
