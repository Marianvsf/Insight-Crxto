import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>
        <h1>¡Bienvenido a Nuestra Aplicación!</h1>
        <p>
          Por favor, selecciona una de las siguientes opciones para continuar.
        </p>
        <button>
          <Link to="/register">Registrarse</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
