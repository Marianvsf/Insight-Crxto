import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { TERMS_SECTIONS } from "../data/legalContent.js";

function TermsModal({
  isOpen,
  onClose,
  title = "Condiciones de Servicio",
  sections = TERMS_SECTIONS,
}) {
  // Cerrar con la tecla Escape y bloquear el scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
          <h2 id="terms-modal-title" className="text-lg font-bold">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <p className="text-sm text-gray-500">
            Última actualización: junio de 2026. Lee atentamente las siguientes
            condiciones antes de usar la plataforma.
          </p>
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                {section.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Pie */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;
