import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <p className="w-3/5">
        Air quality is affected by the presence of contaminants such as ozone,
        nitrogen dioxide and particulates. Click on the button below to find out
        how clean the air is in your city.
      </p>
      <Link to="/air_quality">
        <button className="mt-4 bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-lg">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;
