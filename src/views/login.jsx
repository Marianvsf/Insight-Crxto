import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LoginView() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    // Validación simple de campos (puedes añadir más lógica aquí)
    if (!formData.email || !formData.password) {
      setMessage("Por favor, ingresa tu correo y contraseña.");
      setIsSuccess(false);
      return;
    }

    // Lógica de inicio de sesión simulada

    console.log("Credenciales a enviar:", formData);

    // Simulación de respuesta de la API:
    // Credenciales de prueba: test@example.com / password123
    if (
      formData.email === "test@example.com" &&
      formData.password === "password123"
    ) {
      setMessage("¡Inicio de sesión exitoso! Serás redirigido.");
      setIsSuccess(true);
    } else {
      setMessage("Credenciales incorrectas. Verifica tu email y contraseña.");
      setIsSuccess(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 md:container">
      <h4 className="text-sm font-semibold text-blue-600 text-center mb-2">
        Insight Crxto
      </h4>
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
        Inicio de Sesión
      </h2>
      <div className="max-w-md w-full bg-white p-8 md:container rounded-xl shadow-2xl z-10">
        <form noValidate onSubmit={handleSubmit} className="space-y-6">
          {/* Correo Electrónico */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Contraseña */}
          <div className="relative flex flex-col w-full">
            <label
              htmlFor="password"
              className="mb-2 mt-2 text-sm font-medium text-gray-700"
            >
              Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Tu contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm pr-10 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-9 right-0 p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5" />
              ) : (
                <FaEye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="text-right text-sm">
            {/* <Link to="/forgot-password" className="text-blue-600 hover:underline font-medium">
              ¿Olvidaste tu contraseña?
            </Link> */}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 px-1 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white uppercase bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Mensaje de estado */}
        {message && (
          <p
            className={`text-sm text-center mt-6 p-3 rounded-lg font-medium ${
              isSuccess
                ? "text-green-800 bg-green-100 border border-green-200"
                : "text-red-800 bg-red-100 border border-red-200"
            }`}
          >
            {message}
          </p>
        )}
      </div>
      {/* Enlace a registro */}
      <div className="text-center mt-6 text-sm">
        <p className="text-gray-700 font-medium">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 hover:underline font-bold"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
