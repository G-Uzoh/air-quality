import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-95px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
