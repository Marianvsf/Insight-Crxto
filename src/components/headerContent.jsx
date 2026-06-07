import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import foto from "../assets/photo.avif";
import foto2 from "../assets/photo (2).jpg";
import foto3 from "../assets/photo (3).jpg";
import foto4 from "../assets/photo.jpg";
import foto5 from "../assets/photo (3).avif";

const IMAGES = [foto, foto2, foto3, foto4, foto5];

const HeaderContent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
    }, 5000); // Aumentado a 5s para disfrutar el efecto de la imagen
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <header className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0a0a0a] font-sans">
      {/* 1. CAPA DE IMÁGENES (Fondo con Efecto Ken Burns) */}
      {IMAGES.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <img
            src={image}
            className={`w-full h-full object-cover transition-transform duration-10000 ease-out ${
              index === currentSlide ? "scale-100" : "scale-110"
            }`}
            alt={`Slide ${index + 1}`}
          />
          {/* Overlay con gradiente premium para legibilidad perfecta */}
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black/90 backdrop-blur-[2px]" />
        </div>
      ))}

      {/* 2. CAPA DE CONTENIDO (Texto y botones) */}
      <div className="relative z-20 w-full max-w-[1000px] px-6 flex flex-col items-center text-center mt-[-5%]">
        {/* Badge superior moderno */}
        <div className="mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          <span className="text-sm font-medium text-teal-50 tracking-wide">
            Nueva plataforma 2.0
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 leading-[1.1] text-white drop-shadow-lg">
          El futuro de tus finanzas <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-200">
            empieza aquí
          </span>
        </h1>

        <p className="max-w-2xl mb-10 text-lg md:text-2xl font-light text-gray-300 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
          La plataforma más segura y fácil de usar. Multiplica tu capital con
          las comisiones más bajas del mercado.
        </p>

        <div className="w-full flex flex-col sm:flex-row justify-center gap-5 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          {/* Botón Principal (Glow effect) */}
          <Link
            to="/register"
            className="group relative flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-2xl text-white transition-all duration-300 bg-teal-500 hover:bg-teal-400 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(20,184,166,0.6)]"
          >
            Registrarse Gratis
          </Link>

          {/* Botón Secundario (Glassmorphism pulido) */}
          <Link
            to="/login"
            className="flex items-center justify-center h-14 px-8 text-lg font-medium rounded-2xl text-white transition-all duration-300 bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 hover:border-white/30 hover:scale-[1.02]"
          >
            Ver Demo
          </Link>
        </div>
      </div>

      {/* 3. CONTROLES DEL SLIDER */}

      {/* Indicadores (Estilo Píldora moderna) */}
      <div className="absolute z-30 flex gap-2.5 bottom-10 left-1/2 -translate-x-1/2">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
              index === currentSlide
                ? "w-8 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                : "w-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-current={index === currentSlide}
            aria-label={`Ir al slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Flechas de Navegación más minimalistas */}
      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 start-4 md:start-8 z-30 flex items-center justify-center cursor-pointer group focus:outline-none"
        onClick={handlePrev}
        aria-label="Anterior"
      >
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-white/50 group-hover:text-white group-hover:bg-white/10 transition-all duration-300 hover:scale-110">
          <svg
            className="w-5 h-5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 end-4 md:end-8 z-30 flex items-center justify-center cursor-pointer group focus:outline-none"
        onClick={handleNext}
        aria-label="Siguiente"
      >
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-white/50 group-hover:text-white group-hover:bg-white/10 transition-all duration-300 hover:scale-110">
          <svg
            className="w-5 h-5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </span>
      </button>
    </header>
  );
};

export default HeaderContent;
