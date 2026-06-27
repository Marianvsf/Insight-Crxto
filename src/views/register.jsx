import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
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
  const [isLoading, setIsLoading] = useState(false); // Añadido estado de carga
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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

    if (!acceptedTerms) {
      setMessage("Debes aceptar los Términos y Condiciones para continuar.");
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    const username = `${formData.firstName} ${formData.lastName}`.trim();

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: username,
      });
      setMessage("¡Registro exitoso! Preparando tu panel...");
      setIsSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1500); // Pequeño delay para ver el éxito
    } catch (error) {
      setMessage(
        error.message || "Error al completar el registro. Inténtalo de nuevo.",
      );
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-white">
      {/* SECCIÓN IZQUIERDA: IMAGEN / BRANDING (Solo desktop) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900 items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
          alt="Crypto Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-br from-slate-900/90 via-slate-900/60 to-black/90 z-10" />

        {/* Decoración Glowing Orb */}
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] z-10 animate-pulse" />

        <div className="relative z-20 p-12 lg:p-20 text-white w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mb-6 inline-flex px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-sm font-medium text-teal-300">
              Únete a la revolución
            </span>
          </div>
          <h2 className="text-5xl xl:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">
            Tu futuro financiero <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-200">
              empieza hoy.
            </span>
          </h2>
          <p className="text-lg xl:text-xl text-gray-300 font-light leading-relaxed max-w-lg">
            Crea tu cuenta gratuita y únete a miles de inversores que ya están
            multiplicando su capital con tecnología de punta.
          </p>
        </div>
      </div>

      {/* SECCIÓN DERECHA: FORMULARIO */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-700">
          {/* Header del Formulario */}
          <div className="text-center lg:text-center">
            <Link
              to="/"
              className="inline-block hover:scale-105 transition-transform duration-300"
            >
              <img
                src={logo}
                className="h-16 lg:h-20 mb-4 lg:mx-0 mx-auto"
                alt="Logo Insight"
              />
            </Link>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Crear Cuenta
            </h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Completa tus datos para comenzar a invertir.
            </p>
          </div>

          <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Nombres y Apellidos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors duration-300">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Nombres"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all duration-300"
                  required
                />
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors duration-300">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellidos"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Correo Electrónico */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors duration-300">
                <FaEnvelope />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="tucorreo@empresa.com"
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all duration-300"
              />
            </div>

            {/* Contraseñas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Contraseña Principal */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors duration-300">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all duration-300"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-teal-600 transition-colors focus:outline-none"
                  title={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-4 h-4" />
                  ) : (
                    <FaEye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Confirmar Contraseña */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors duration-300">
                  <FaLock />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmar"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all duration-300"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-teal-600 transition-colors focus:outline-none"
                  title={
                    showConfirmPassword
                      ? "Ocultar confirmación"
                      : "Mostrar confirmación"
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="w-4 h-4" />
                  ) : (
                    <FaEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Mensajes de Estado Visuales */}
            {message && (
              <div
                className={`flex items-center gap-3 p-3.5 rounded-xl text-sm font-medium transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
                  isSuccess
                    ? "bg-teal-50 text-teal-800 border border-teal-100"
                    : "bg-red-50 text-red-800 border border-red-100"
                }`}
              >
                {isSuccess ? (
                  <svg
                    className="w-5 h-5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {message}
              </div>
            )}

            {/* Aceptación de Términos y Condiciones */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-teal-600 focus:ring-teal-500/30 accent-teal-600"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                He leído y acepto los{" "}
                <Link
                  to="/terms"
                  className="text-teal-600 hover:text-teal-500 font-medium transition-colors underline-offset-2 hover:underline"
                >
                  Términos y Condiciones
                </Link>{" "}
                y la Política de Privacidad.
              </span>
            </label>

            {/* Botón Submit Premium */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-500/20
                  ${
                    isLoading
                      ? "bg-teal-400 cursor-not-allowed shadow-none"
                      : "bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 hover:-translate-y-0.5"
                  }`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Crear mi cuenta"
                )}
              </button>
            </div>
          </form>

          {/* Enlace a login */}
          <div className="text-center mt-6">
            <p className="text-sm font-medium text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="font-bold text-teal-600 hover:text-teal-500 transition-colors"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
