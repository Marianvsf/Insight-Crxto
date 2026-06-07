export const Footer = () => {
  return (
    <footer className="w-full py-16 mt-auto bg-transparent flex flex-col items-center justify-center relative overflow-hidden">
      {/* Línea divisoria superior muy sutil con degradado */}
      <div className="absolute top-0 w-3/4 max-w-3xl h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

      <div className="flex flex-col items-center gap-8 z-10 px-4">
        {/* 1. Etiqueta superior minimalista */}
        <span className="text-[10px] font-bold tracking-[0.25em] text-gray-400 uppercase">
          Diseñado & Desarrollado por
        </span>

        {/* 2. Tarjeta principal interactiva (Píldora) */}
        <a
          href="https://github.com/Marianvsf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-4 p-2 pr-5 rounded-full bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(20,184,166,0.15)] hover:border-teal-200 transition-all duration-300 ease-out hover:-translate-y-1"
        >
          {/* Avatar con reborde limpio */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm group-hover:border-teal-300 transition-colors duration-300 bg-gray-300 shrink-0">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              src="/github.png"
              alt="Avatar de Marian Suárez"
              width={48}
              height={48}
              loading="lazy"
            />
          </div>

          {/* Información y Tipografía */}
          <div className="flex flex-col justify-center pr-2">
            <span className="font-extrabold text-gray-800 text-base leading-tight group-hover:text-teal-700 transition-colors duration-300">
              Marian Suárez
            </span>
            {/* Texto con gradiente para destacar el rol profesional */}
            <span className="text-[11px] font-bold uppercase tracking-wider bg-clip-text text-transparent bg-linear-to-r from-teal-500 to-emerald-400">
              Full Stack Developer
            </span>
          </div>

          {/* Icono de acción rápida (botón dentro del botón) */}
          <div className="ml-2 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-teal-50 transition-colors border border-transparent group-hover:border-teal-100">
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-teal-600 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </a>

        {/* 3. Badge inferior de estado */}
        <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-gray-100 text-[13px] font-medium text-gray-500 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          {/* Punto de estado activo vibrante */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Estudiante de Ingeniería en Informática - UAH
        </div>
      </div>
    </footer>
  );
};
