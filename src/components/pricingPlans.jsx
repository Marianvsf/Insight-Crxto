import { Link } from "react-router-dom";

export const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/mes",
    description: "Ideal para empezar a explorar el mercado cripto.",
    features: [
      "Seguimiento de precios en vivo",
      "Dashboard básico de mercado",
      "Alertas de precio limitadas",
      "Soporte por email",
    ],
    cta: { label: "Comenzar Gratis", to: "/register" },
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mes",
    description: "Para quienes operan de forma activa y quieren más datos.",
    features: [
      "Todo lo del plan Free",
      "Alertas de precio ilimitadas",
      "Gráficos e indicadores avanzados",
      "Historial de mercado extendido",
      "Soporte prioritario",
    ],
    cta: { label: "Elegir Pro", to: "/register" },
    highlighted: true,
  },
  {
    name: "Premium",
    price: "A medida",
    period: "",
    description: "Para equipos y traders que necesitan soporte dedicado.",
    features: [
      "Todo lo del plan Pro",
      "Acceso anticipado a nuevas funciones",
      "Gestor de cuenta dedicado",
      "Integraciones personalizadas",
    ],
    cta: { label: "Hablar con Ventas", to: "/" },
    highlighted: false,
  },
];

export function PricingPlans() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
      {PLANS.map((plan) => (
        <div
          key={plan.name}
          className={`relative flex flex-col rounded-3xl p-8 border transition-all duration-300 ${
            plan.highlighted
              ? "bg-slate-950 text-white border-teal-400/30 shadow-2xl shadow-teal-500/20 md:-translate-y-4"
              : "bg-white text-gray-900 border-gray-200 shadow-lg hover:shadow-xl"
          }`}
        >
          {plan.highlighted && (
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-teal-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
              Más popular
            </span>
          )}

          <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
          <p
            className={`text-sm mb-6 ${plan.highlighted ? "text-slate-300" : "text-gray-500"}`}
          >
            {plan.description}
          </p>

          <div className="mb-6">
            <span className="text-4xl font-extrabold">{plan.price}</span>
            <span
              className={`text-sm ml-1 ${plan.highlighted ? "text-slate-300" : "text-gray-500"}`}
            >
              {plan.period}
            </span>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <svg
                  className={`w-5 h-5 mt-0.5 shrink-0 ${plan.highlighted ? "text-teal-400" : "text-teal-600"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  className={plan.highlighted ? "text-slate-200" : "text-gray-700"}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <Link
            to={plan.cta.to}
            className={`text-center px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              plan.highlighted
                ? "bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/30"
                : "bg-teal-600 hover:bg-teal-500 text-white"
            }`}
          >
            {plan.cta.label}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PricingPlans;
