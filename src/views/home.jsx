import { Link } from "react-router-dom";
import HeaderContent from "../components/headerContent.jsx";
import CryptoTicker from "../components/cryptoticker.jsx";
import HowItWorks from "../components/howItWorks.jsx";

function Home() {
  return (
    <>
      <HeaderContent />
      <CryptoTicker />
      {/* <div className="mt-10 sm:container sm:mx-auto sm:max-w-md sm:px-6 lg:max-w-md lg:px-8 flex flex-col text-center items-center justify-center space-y-6 pb-10">
        <p className="text-2xl">
          Por favor, selecciona una de las siguientes opciones para continuar.
        </p>
        <div className="flex w-full gap-4 px-6 mt-5">
          <button className="h-[52px] w-full sm:w-[240px] text-lg font-bold rounded-xl text-white transition-all duration-300 bg-teal-500 hover:bg-teal-600 hover:scale-105 shadow-xl shadow-teal-500/30">
            <Link to="/register" className="nav-link">
              Registrarse
            </Link>
          </button>
          <button className="h-[52px] w-full sm:w-[240px] text-lg font-bold rounded-xl text-white transition-all duration-300 bg-teal-500 hover:bg-teal-600 hover:scale-105 shadow-xl shadow-teal-500/30">
            <Link to="/login" className="nav-link">
              Iniciar Sesión
            </Link>
          </button>
        </div>
      </div>*/}
      <HowItWorks />
    </>
  );
}

export default Home;
