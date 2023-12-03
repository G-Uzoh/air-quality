import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="weather-air-container">
      <Link className="weather" to="/weather"></Link>
      <Link className="air-quality" to="/air_quality"></Link>
    </div>
  );
};

export default Home;
