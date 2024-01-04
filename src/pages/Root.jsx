import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="h-screen">
      <Header />
      <main className="flex flex-col justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
