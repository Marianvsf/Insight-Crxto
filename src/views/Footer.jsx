export const Footer = () => {
  return (
    <footer className="row-start-3 w-full py-10 mt-auto relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-300/40 to-transparent blur-[1px]" />

      <div className="flex flex-col sm:flex-row items-center gap-4 font-mono text-sm sm:text-base">
        <span className="text-gray-400 tracking-tight">
          Diseñado y desarrollado por
        </span>

        <a
          href="https://github.com/Marianvsf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 px-5 py-2.5 rounded-full bg-gray-950/60 backdrop-blur-md border border-gray-700/50 hover:border-teal-500/50 hover:bg-gray-950/80 hover:shadow-[0_0_25px_rgba(20,184,166,0.2)] transition-all duration-300 ease-out"
        >
          <img
            className="w-8 h-8 rounded-full object-cover border border-gray-600 group-hover:scale-110 group-hover:rotate-6 group-hover:border-teal-400 transition-transform duration-300 ease-out"
            src="/github.png"
            alt="GitHub de Marian Suárez"
            width={32}
            height={32}
            loading="lazy"
          />

          <span className="font-semibold text-teal-300 group-hover:text-teal-100 transition-colors duration-300">
            Marian Suárez
          </span>

          <svg
            className="w-5 h-5 text-teal-400 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 ease-out"
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
