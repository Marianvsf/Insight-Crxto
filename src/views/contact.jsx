import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus({
        type: "error",
        msg: "Por favor, completa los campos obligatorios.",
      });
      return;
    }

    console.log("Enviando soporte:", form);
    setStatus({
      type: "success",
      msg: "¡Mensaje enviado con éxito! Te responderemos pronto.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 sm:p-8 pt-24 sm:pt-28 font-sans">
      <div className="w-full max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition duration-150 font-medium"
          aria-label="Volver a la página anterior"
        >
          ← Volver
        </button>
      </div>
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row">
        {/* LADO IZQUIERDO: Información de Contacto (Ancla Visual) */}
        <div className="relative w-full md:w-5/12 bg-slate-900 p-10 text-white overflow-hidden flex flex-col justify-between">
          {/* Círculos decorativos de fondo */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Hablemos</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-10">
              ¿Tienes alguna pregunta, problema o simplemente quieres saludar?
              Nuestro equipo está listo para ayudarte en lo que necesites.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/5">
                  <svg
                    className="w-5 h-5 text-teal-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-sm font-medium">
                    soporte@tuplataforma.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/5">
                  <svg
                    className="w-5 h-5 text-teal-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Oficina
                  </p>
                  <p className="text-sm font-medium">
                    Av. Principal, Ciudad Tech
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: Formulario */}
        <div className="w-full md:w-7/12 p-10 bg-white">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Envíanos un mensaje
          </h3>

          {/* Mensajes de Estado Mejorados */}
          {status && (
            <div
              className={`flex items-center gap-3 mb-6 p-4 rounded-2xl text-sm font-medium transition-all duration-500 animate-in fade-in slide-in-from-top-4 ${
                status.type === "error"
                  ? "bg-red-50 text-red-800 border border-red-100"
                  : "bg-teal-50 text-teal-800 border border-teal-100"
              }`}
            >
              {status.type === "error" ? (
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
              ) : (
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
              )}
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Fila: Nombre + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Nombre *
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Ej. Ana Pérez"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all duration-300"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="ana@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            {/* Asunto */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Asunto{" "}
                <span className="text-gray-400 font-normal">(Opcional)</span>
              </label>
              <input
                name="subject"
                type="text"
                placeholder="¿Cómo podemos ayudarte?"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all duration-300"
              />
            </div>

            {/* Mensaje */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Mensaje *
              </label>
              <textarea
                name="message"
                placeholder="Escribe los detalles aquí..."
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all duration-300 resize-none"
              />
            </div>

            {/* Botones de Acción */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setForm({ name: "", email: "", subject: "", message: "" });
                  setStatus(null);
                }}
                className="px-6 py-3 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="px-8 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-500/20"
              >
                Enviar mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
