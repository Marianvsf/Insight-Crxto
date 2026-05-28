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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <header className="relative w-full h-[calc(100vh-48px)] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      {/* 1. CAPA DE IMÁGENES (Fondo dinámico) */}
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
            className="w-full h-full object-cover"
            alt={`Slide ${index + 1}`}
          />
          {/* Overlay oscuro para que el texto se lea mejor */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
      ))}

      {/* 2. CAPA DE CONTENIDO (Texto y botones estáticos superiores) */}
      <div className="relative z-20 w-full max-w-[980px] px-6 text-center text-white flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 leading-[1.1]">
          El futuro de tus finanzas empieza aquí
        </h1>
        <p className="mb-10 text-lg md:text-3xl font-semibold text-gray-300">
          La plataforma más segura y fácil de usar con las comisiones más bajas
          del mercado
        </p>

        <div className="w-full flex flex-col sm:flex-row justify-center gap-4">
          {/* Botón Secundario convertido a Link */}
          <Link
            to="/login"
            className="flex items-center justify-center h-[52px] w-full sm:w-auto px-16 text-lg font-medium rounded-xl text-white transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-105"
          >
            Ver Demo
          </Link>
          {/* Botón Principal convertido a Link */}
          <Link
            to="/register"
            className="flex items-center justify-center h-[52px] w-full sm:w-auto px-8 text-lg font-bold rounded-xl text-white transition-all duration-300 bg-teal-500 hover:bg-teal-600 hover:scale-105"
          >
            Registrarse Gratis
          </Link>
        </div>
      </div>

      {/* 3. CONTROLES DEL SLIDER */}

      {/* Indicadores (Puntitos) */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-8 left-1/2 space-x-3 rtl:space-x-reverse">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide
                ? "bg-teal-500"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-current={index === currentSlide}
            aria-label={`Ir al slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Flecha Anterior */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrev}
        aria-label="Anterior"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/30 transition-all">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
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

      {/* Flecha Siguiente */}
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
        aria-label="Siguiente"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/30 transition-all">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
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
