import { useParams } from "react-router-dom";
import Weather from "./Weather";
import AirQuality from "./AirQuality";
import Search from "../components/Search";

const CategoryPage = () => {
  const { category } = useParams();

  return (
    <>
      <Search />
      <h2>Category page will be here</h2>
      {/* <p>{import.meta.env.VITE_WEATHER_API_KEY}</p> */}
      <div>
        {category === 'weather'
            ? <Weather />
            : <AirQuality />
        }
      </div>
    </>
  );
};

export default CategoryPage;
