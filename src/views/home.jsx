import { Link } from "react-router-dom";
import HeaderContent from "../components/headerContent.jsx";

function Home() {
  return (
    <>
      <HeaderContent />
      <div className="sm:container sm:mx-auto sm:max-w-md sm:px-6 lg:max-w-md lg:px-8 flex flex-col text-center items-center justify-center space-y-6 pb-10">
        <p className="text-2xl">
          Por favor, selecciona una de las siguientes opciones para continuar.
        </p>
        <div className="flex w-full gap-4 px-6">
          <button className="w-full py-2 px-1 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white uppercase bg-teal-400 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out">
            <Link to="/register" className="nav-link">
              Registrarse
            </Link>
          </button>
          <button className="w-full py-2 px-1 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white uppercase bg-teal-400 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out">
            <Link to="/login" className="nav-link">
              Iniciar Sesión
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
