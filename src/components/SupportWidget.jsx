import { memo, useState } from "react";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

const inputClass =
  "w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all";

function SupportWidget() {
  const [showSupport, setShowSupport] = useState(false);
  const [supportForm, setSupportForm] = useState(EMPTY_FORM);
  const [supportStatus, setSupportStatus] = useState(null);

  const handleSupportChange = (e) => {
    const { name, value } = e.target;
    setSupportForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();

    if (!supportForm.name || !supportForm.email || !supportForm.message) {
      setSupportStatus({
        type: "error",
        msg: "Por favor, completa los campos obligatorios.",
      });
      return;
    }

    console.log("Enviando soporte:", supportForm);
    setSupportStatus({
      type: "success",
      msg: "¡Mensaje enviado con éxito! Te responderemos pronto.",
    });
    setSupportForm(EMPTY_FORM);
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
          <span className="text-lg">🛡️</span>
        </div>
        <h3 className="font-bold text-gray-900 text-sm sm:text-base">
          Centro de Seguridad
        </h3>
      </div>
      <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">
        ¿Problemas con una transacción? Nuestros expertos en Blockchain están
        disponibles 24/7.
      </p>
      <button
        type="button"
        onClick={() => setShowSupport((prev) => !prev)}
        aria-expanded={showSupport}
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-teal-600 hover:bg-teal-700 rounded-xl text-sm font-bold text-white transition-all"
      >
        {showSupport ? "Cerrar soporte" : "Contactar Soporte"}
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${showSupport ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Formulario de soporte desplegable */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          showSupport
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          {supportStatus && (
            <div
              className={`flex items-center gap-2 mb-3 p-3 rounded-xl text-xs font-medium ${
                supportStatus.type === "error"
                  ? "bg-red-50 text-red-800 border border-red-100"
                  : "bg-teal-50 text-teal-800 border border-teal-100"
              }`}
            >
              {supportStatus.msg}
            </div>
          )}

          <form onSubmit={handleSupportSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Nombre *
              </label>
              <input
                name="name"
                type="text"
                placeholder="Ej. Ana Pérez"
                value={supportForm.name}
                onChange={handleSupportChange}
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Email *
              </label>
              <input
                name="email"
                type="email"
                placeholder="ana@ejemplo.com"
                value={supportForm.email}
                onChange={handleSupportChange}
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Asunto{" "}
                <span className="text-gray-400 font-normal">(Opcional)</span>
              </label>
              <input
                name="subject"
                type="text"
                placeholder="¿Cómo podemos ayudarte?"
                value={supportForm.subject}
                onChange={handleSupportChange}
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Mensaje *
              </label>
              <textarea
                name="message"
                placeholder="Escribe los detalles aquí..."
                value={supportForm.message}
                onChange={handleSupportChange}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow-lg shadow-teal-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default memo(SupportWidget);
