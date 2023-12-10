import { useParams } from "react-router-dom";
import Weather from "./Weather";
import AirQuality from "./AirQuality";
import Search from "../components/Search";

const CategoryPage = ({ city, handleChange, handleSearch }) => {
  const { category } = useParams();

  return (
    <>
      <Search city={city} handleSearch={() => handleSearch(city)} handleChange={handleChange} />
      <h2>Category page will be here</h2>
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
