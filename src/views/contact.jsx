import { useState } from "react";

const Contact = () => {
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
        msg: "Por favor completa Nombre, Email y Mensaje.",
      });
      return;
    }

    console.log("Enviando soporte:", form);
    setStatus({
      type: "success",
      msg: "¡Mensaje enviado con éxito! Nuestro equipo te responderá pronto.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Encabezado */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Contacto y Soporte
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          ¿Tienes alguna pregunta o problema? Escríbenos y te responderemos en
          breve.
        </p>
      </div>

      {/* Tarjeta del Formulario */}
      <div className="bg-white p-8 border border-gray-200 rounded-2xl shadow-sm">
        {/* Mensajes de Estado */}
        {status && (
          <div
            className={`mb-6 p-4 rounded-xl border text-sm font-medium ${
              status.type === "error"
                ? "bg-red-50 text-red-800 border-red-200"
                : "bg-green-50 text-green-800 border-green-200"
            }`}
          >
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fila: Nombre + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Nombre
              </label>
              <input
                name="name"
                type="text"
                placeholder="Tu nombre completo"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all duration-200"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Asunto */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Asunto{" "}
              <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <input
              name="subject"
              type="text"
              placeholder="¿De qué trata tu consulta?"
              value={form.subject}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Mensaje */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Mensaje
            </label>
            <textarea
              name="message"
              placeholder="Escribe los detalles aquí..."
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all duration-200 resize-none"
            />
          </div>

          {/* Acciones */}
          <div className="flex items-center justify-end space-x-4 pt-2">
            <button
              type="button"
              onClick={() => {
                setForm({ name: "", email: "", subject: "", message: "" });
                setStatus(null);
              }}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Limpiar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-sm transition-colors duration-200"
            >
              Enviar mensaje
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
