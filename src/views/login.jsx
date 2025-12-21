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
        setMessage("¡Bienvenido de vuelta!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage("Credenciales incorrectas.");
        setIsSuccess(false);
        setIsLoading(false);
      }
    } catch (error) {
      setMessage("Ocurrió un error inesperado.");
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 md:p-6 bg-white">
      {/* TARJETA FLOTANTE (CARD): */}
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden h-auto md:min-h-[600px]">
        {/* SECCIÓN IZQUIERDA: IMAGEN / BRANDING */}
        <div className="hidden lg:flex w-1/2 bg-gray-900 items-center justify-center relative">
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 to-black/80 z-10" />
          {/* Imagen de Fondo */}
          <img
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
            alt="Crypto Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Contenido Texto */}
          <div className="relative z-20 p-12 text-white text-left">
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Domina tu portafolio.
            </h2>
            <p className="text-lg text-gray-300 font-light">
              Accede a análisis en tiempo real y toma decisiones informadas. Tu
              visión financiera, más clara que nunca.
            </p>
          </div>
        </div>

        {/* SECCIÓN DERECHA: FORMULARIO */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto">
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl text-center font-extrabold text-gray-900 tracking-tight">
                Iniciar Sesión
              </h2>
              <p className="mt-2 text-center text-sm text-gray-500">
                Bienvenido de nuevo, ingresa tus credenciales.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Input Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
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
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Input Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
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
                      className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-600"
                  >
                    Recordarme
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-teal-600 hover:text-teal-500"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white transition-all duration-200 
                  ${
                    isLoading
                      ? "bg-teal-400 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5"
                  }`}
              >
                {isLoading ? "Iniciando..." : "Iniciar Sesión"}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    O continúa con
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                  <FaGoogle className="h-5 w-5 text-red-500" />
                </button>
                <button className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                  <FaGithub className="h-5 w-5 text-gray-900" />
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                className="font-bold text-teal-600 hover:text-teal-500 hover:underline"
              >
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
