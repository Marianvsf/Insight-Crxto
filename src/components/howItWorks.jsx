import React from "react";

const HowItWorks = () => {
  // Datos de los pasos (fácil de editar)
  const steps = [
    {
      id: 1,
      title: "Crea tu cuenta",
      desc: "Regístrate en menos de 2 minutos.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Verifica tu identidad",
      desc: "Proceso KYC rápido y seguro.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Deposita fondos",
      desc: "Usa tarjeta, transferencia o P2P.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Empieza a operar",
      desc: "Compra tu primer Bitcoin hoy.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full py-20 bg-[#0a0a0a] text-white overflow-hidden">
      {/* Fondo decorativo (opcional) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black opacity-50 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Encabezado de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Eliminamos la complejidad. Empieza a invertir en tu futuro en cuatro
            simples pasos.
          </p>
        </div>

        {/* Grid de Pasos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Número de paso sutil en el fondo */}
              <span className="absolute top-2 right-4 text-6xl font-bold text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none">
                {step.id}
              </span>

              {/* Icono con círculo brillante */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Texto */}
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{step.desc}</p>

              {/* Flecha conectora (solo visible en desktop entre items, excepto el último) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-gray-700">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Botón CTA Final */}
        <div className="mt-16 text-center">
          <button className="h-[52px] w-full sm:w-[240px] text-lg font-bold rounded-xl text-white transition-all duration-300 bg-teal-400 hover:scale-105">
            Comenzar Ahora
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
