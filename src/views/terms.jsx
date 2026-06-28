import { useNavigate } from "react-router-dom";
import { TERMS_SECTIONS, PRIVACY_SECTIONS } from "../data/legalContent.js";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition duration-150 font-medium"
          aria-label="Volver a la página anterior"
        >
          ← Volver
        </button>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Encabezado */}
        <div className="relative px-8 py-10 bg-slate-900 text-white overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Términos y Condiciones
            </h1>
            <p className="text-slate-400 text-sm">
              Última actualización: junio de 2026. Lee atentamente las siguientes
              condiciones antes de usar la plataforma.
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-8 py-10 space-y-10">
          <section className="space-y-5">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              Condiciones de Servicio
            </h2>
            {TERMS_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </section>

          <section className="space-y-5">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              Política de Privacidad
            </h2>
            {PRIVACY_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </section>
        </div>

        {/* Pie */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow-lg shadow-teal-500/30 transition-all duration-300"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
