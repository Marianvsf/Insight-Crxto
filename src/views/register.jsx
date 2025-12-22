import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../store/authStore.js";
import logo from "../assets/logo.png";

export default function RegisterView() {
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (formData.password !== formData.confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      setIsSuccess(false);
      return;
    }
    const username = `${formData.firstName} ${formData.lastName}`.trim();
    try {
      await register({
        email: formData.email,

        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: username,
      });
      setMessage("¡Registro exitoso! Serás redirigido al Home.");
      setIsSuccess(true);
      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.message || "Error al completar el registro. Inténtalo de nuevo."
      );
      setIsSuccess(false);
    }
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex w-full">
      <div className="hidden lg:flex w-1/2 bg-gray-900 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 to-black/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
          alt="Crypto Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 p-12 text-white">
          <h2 className="text-5xl font-bold mb-6">
            Tu futuro financiero empieza hoy.
          </h2>
          <p className="text-xl text-gray-300">
            Crea tu cuenta gratuita y únete a miles de inversores que ya están
            multiplicando su capital con tecnología de punta.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-8 md:p-16 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <Link
              to="/"
              className="block w-fit mx-auto hover:opacity-80 transition-opacity"
            >
              <img src={logo} className="h-20 mx-auto" alt="Logo Insight" />
            </Link>
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
              Registro de Usuario
            </h2>

            <form noValidate onSubmit={handleSubmit} className="space-y-10">
              {/* Nombres y Apellidos */}
              <div className="flex space-x-4">
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="firstName"
                    className="mb-2 text-sm font-medium text-gray-700"
                  >
                    Nombres <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Juan"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="lastName"
                    className="mb-2 text-sm font-medium text-gray-700"
                  >
                    Apellidos <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Pérez"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              {/* Correo Electrónico */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="email"
                  className="mb-2  text-sm font-medium text-gray-700"
                >
                  Correo electrónico <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaEnvelope />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="nombre@empresa.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Contraseñas */}
              <div className="flex space-x-4">
                {/* Contraseña Principal */}
                <div className="relative flex flex-col w-1/2">
                  <label
                    htmlFor="password"
                    className=" mb-2 text-sm font-medium text-gray-700"
                  >
                    Contraseña <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Mínimo 8 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm pr-10 focus:ring-teal-500 focus:border-teal-500"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-9 right-0 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    title={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Confirmar Contraseña */}
                <div className="relative flex flex-col w-1/2">
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 text-sm font-medium text-gray-700"
                  >
                    Confirmar <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Repite la contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm pr-10 focus:ring-teal-500 focus:border-teal-500"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute top-9 right-0 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    title={
                      showConfirmPassword
                        ? "Ocultar confirmación"
                        : "Mostrar confirmación"
                    }
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-1 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-teal-400 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
              >
                Registrarme
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
            {/* Enlaces de políticas y login */}
            <div className="text-center space-y-3 mt-3 text-sm">
              <p className="text-gray-600">
                Al registrarme, acepto las{" "}
                <Link
                  to="#"
                  className="text-teal-600 hover:text-teal-800 hover:underline font-semibold"
                >
                  Condiciones del servicio
                </Link>{" "}
                y la{" "}
                <Link
                  to="#"
                  className="text-teal-600 hover:text-teal-800 hover:underline font-semibold"
                >
                  Política de privacidad
                </Link>
                .
              </p>
              <p className="text-gray-700 font-medium">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/login"
                  className="text-teal-600 hover:text-teal-800 hover:underline font-bold"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
