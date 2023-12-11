import Card from "../components/Card";

const AirQuality = ({ date, pollutionData }) => {
  return (
    <>
      <h2>Air quality data will be here</h2>
      {/* <Card date={date} /> */}
      <div>
        {pollutionData?.map((el, i) => (
          <Card key={i} {...el} date={date} />
        ))}
      </div>
    </>
  );
};

export default AirQuality;
