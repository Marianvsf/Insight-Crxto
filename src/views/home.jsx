import { Link } from "react-router-dom";
import HeaderContent from "../components/headerContent";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
      <HeaderContent />
      <div className="sm:container sm:max-h-0 sm:mx-auto sm:max-w-md sm:px-6 lg:max-w-md lg:px-8 flex flex-col text-center items-center justify-center space-y-6">
        <p className="mt-7">
          Por favor, selecciona una de las siguientes opciones para continuar.
        </p>
        <div className="flex w-full">
          <button className="mt-2 mx-6 w-full py-2 px-1 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white uppercase bg-teal-400 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out">
            <Link to="/register" className="nav-link">
              Registrarse
            </Link>
          </button>
          <button className="mt-2 w-full py-2 px-1 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white uppercase bg-teal-400 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out">
            <Link to="/login" className="nav-link">
              Iniciar Sesión
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
