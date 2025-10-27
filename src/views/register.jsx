import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import logo from "../assets/chinchin-logo.png";

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
      console.error("Error durante el registro:", error);
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 w-full space-y-6">
      <img src={logo} className="h-8" alt="Chinchin Logo" />
      <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">
        Registro de Usuario
      </h2>
      <div className="max-w-lg bg-white p-8 rounded-xl shadow-2xl z-10">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="mb-2 mt-2 text-sm font-medium text-gray-700"
            >
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Contraseñas */}
          <div className="flex space-x-4">
            {/* Contraseña Principal */}
            <div className="relative flex flex-col w-1/2">
              <label
                htmlFor="password"
                className="mt-2 mb-2 text-sm font-medium text-gray-700"
              >
                Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm pr-10 focus:ring-indigo-500 focus:border-indigo-500"
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
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Confirmar Contraseña */}
            <div className="relative flex flex-col w-1/2">
              <label
                htmlFor="confirmPassword"
                className="mb-2 mt-2 text-sm font-medium text-gray-700"
              >
                Confirmar <span className="text-red-500">*</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Repite la contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm pr-10 focus:ring-indigo-500 focus:border-indigo-500"
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
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-2 px-1 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white uppercase  bg-teal-400 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
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
      </div>
      {/* Enlaces de políticas y login */}
      <div className="text-center mt-2 space-y-3 text-sm">
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
  );
}
