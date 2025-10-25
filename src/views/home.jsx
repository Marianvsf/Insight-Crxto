import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:container space-y-6">
      <h1 className="max-w-screen-7xl text-3xl font-bold text-center mb-2">
        ¡Bienvenido a Nuestra Aplicación!
      </h1>
      <p>
        Por favor, selecciona una de las siguientes opciones para continuar.
      </p>
      <button className="mt-2 w-full py-2 px-1 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white uppercase bg-blue-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
        <Link to="/register" className="nav-link">
          Registrarse
        </Link>
      </button>
    </div>
  );
}

export default Home;
