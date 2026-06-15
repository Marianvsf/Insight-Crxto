import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import logo from "../assets/logo.png";

export default function LoginView() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    if (!formData.email || !formData.password) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        setIsSuccess(true);
        setMessage("¡Bienvenido de vuelta! Redirigiendo...");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage("Credenciales incorrectas. Intenta de nuevo.");
        setIsSuccess(false);
        setIsLoading(false);
      }
    } catch (error) {
      setMessage(
        error instanceof Error && error.message === "Credenciales inválidas"
          ? "Credenciales incorrectas. Intenta de nuevo."
          : "Ocurrió un error inesperado.",
      );
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-white">
      {/* SECCIÓN IZQUIERDA: IMAGEN / BRANDING (Solo desktop) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900 items-center justify-center">
        {/* Imagen de fondo con Ken Burns sutil */}
        <img
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
          alt="Crypto Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
        />
        {/* Gradiente oscuro superior */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900/90 via-slate-900/60 to-black/90 z-10" />

        {/* Decoración Glowing Orb */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] z-10 animate-pulse" />

        {/* Contenido de Branding */}
        <div className="relative z-20 p-12 lg:p-20 text-white w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mb-6 inline-flex px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-sm font-medium text-teal-300">
              Plataforma V2.0
            </span>
          </div>
          <h2 className="text-5xl xl:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">
            Domina tu <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-200">
              portafolio.
            </span>
          </h2>
          <p className="text-lg xl:text-xl text-gray-300 font-light leading-relaxed max-w-lg">
            Accede a análisis en tiempo real y toma decisiones informadas. Tu
            visión financiera, más clara que nunca.
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
              Iniciar Sesión
            </h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Bienvenido de nuevo, ingresa tus credenciales.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Input Email */}
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

              {/* Input Password */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors duration-300">
                  <FaLock />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-teal-600 transition-colors cursor-pointer focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Recordarme y Olvidé contraseña */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer transition-colors"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer select-none"
                >
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-teal-600 hover:text-teal-500 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            {/* Alertas de Estado Visuales */}
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

            {/* Botón Submit Premium */}
            <div>
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
                  "Iniciar Sesión"
                )}
              </button>
            </div>

            {/* Divisor */}
            <div className="relative pt-4 pb-2">
              <div className="absolute inset-0 flex items-center pt-2">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  O continúa con
                </span>
              </div>
            </div>

            {/* Botones Sociales Mejorados */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <FaGoogle className="h-4 w-4 text-red-500" />
                Google
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <FaGithub className="h-4 w-4 text-gray-900" />
                GitHub
              </button>
            </div>
          </form>

          {/* Enlace a Registro */}
          <p className="mt-8 text-center text-sm font-medium text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-bold text-teal-600 hover:text-teal-500 transition-colors"
            >
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
