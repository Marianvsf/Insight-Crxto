import { Link } from "react-router-dom";
import { PricingPlans } from "../components/pricingPlans.jsx";

const Sales = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative py-20 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-semibold uppercase tracking-[0.2em] mb-4 border border-teal-400/20">
            Planes y Precios
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Elige el plan ideal para ti
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            Sin importar si estás empezando o ya operas a diario, tenemos un
            plan que se ajusta a tus necesidades.
          </p>
        </div>
      </section>

      {/* Planes */}
      <section className="py-16 bg-gray-50/70">
        <div className="max-w-6xl mx-auto px-6">
          <PricingPlans />
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
            ¿Tienes dudas sobre qué plan elegir?
          </h2>
          <p className="text-gray-500 mb-8">
            Nuestro equipo puede ayudarte a encontrar el plan perfecto para tus
            necesidades.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-bold text-teal-600 hover:text-teal-700 group transition-colors text-lg"
          >
            Contactar a un asesor
            <span className="transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Sales;
