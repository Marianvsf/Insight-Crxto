import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación mínima
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", msg: "Por favor completa Nombre, Email y Mensaje." });
      return;
    }

    // Aquí podrías llamar a una API real. Por ahora simulamos envío.
    console.log("Enviando soporte:", form);
    setStatus({ type: "success", msg: "Mensaje enviado. Nuestro equipo de soporte te responderá pronto." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contacto — Soporte</h1>

      <p className="mb-6 text-gray-600">¿Tienes un problema o pregunta? Escríbenos y te responderemos en breve.</p>

      {status && (
        <div className={`mb-4 p-3 rounded ${status.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
          {status.msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Asunto (opcional)</label>
          <input name="subject" value={form.subject} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mensaje</label>
          <textarea name="message" value={form.message} onChange={handleChange} rows={6} className="w-full p-2 border rounded" />
        </div>

        <div className="flex items-center space-x-3">
          <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded">Enviar</button>
          <button type="button" onClick={() => { setForm({ name: "", email: "", subject: "", message: "" }); setStatus(null); }} className="px-4 py-2 border rounded">Limpiar</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
