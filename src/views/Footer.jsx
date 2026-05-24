export const Footer = () => {
  return (
    <footer className="row-start-3 w-full py-8 mt-auto relative overflow-hidden flex items-center justify-center">
      {/* Efecto de luz de fondo sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

      <div className="flex items-center gap-3 font-mono text-sm sm:text-base">
        <span className="text-gray-500 tracking-tight">
          Diseñado y desarrollado por
        </span>

        <a
          href="https://github.com/Marianvsf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50/50 backdrop-blur-sm border border-teal-100 hover:border-teal-300 hover:bg-teal-50 hover:shadow-[0_0_15px_rgba(20,184,166,0.15)] transition-all duration-300"
        >
          <img
            className="w-7 h-7 rounded-full object-cover group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 ease-out"
            src="/github.png"
            alt="GitHub de Marian Suárez"
            width={28}
            height={28}
            loading="lazy"
          />
          <span className="font-semibold text-teal-600 group-hover:text-teal-800 transition-colors duration-300">
            Marian Suárez
          </span>

          {/* Flecha animada que aparece al hacer hover */}
          <svg
            className="w-4 h-4 text-teal-500 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 ease-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
};
