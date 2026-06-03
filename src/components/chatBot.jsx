import { useEffect, useRef, useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaCommentDots } from "react-icons/fa";

// Base de conocimiento sencilla: cada entrada tiene palabras clave y una respuesta.
// La coincidencia es por palabras clave (sin IA ni API externa).
const KNOWLEDGE_BASE = [
  {
    keywords: ["bitcoin", "btc", "que es bitcoin"],
    answer:
      "Bitcoin (BTC) es la primera criptomoneda, creada en 2009. Funciona sobre una red descentralizada (blockchain) sin intermediarios y tiene un suministro máximo de 21 millones de monedas.",
  },
  {
    keywords: ["ethereum", "eth", "que es ethereum"],
    answer:
      "Ethereum (ETH) es una plataforma blockchain que permite crear contratos inteligentes y aplicaciones descentralizadas (dApps). Su moneda nativa es el Ether.",
  },
  {
    keywords: ["blockchain", "cadena de bloques"],
    answer:
      "La blockchain es un registro digital distribuido e inmutable donde se almacenan las transacciones en bloques enlazados de forma segura. Es la tecnología base de las criptomonedas.",
  },
  {
    keywords: ["wallet", "billetera", "monedero", "cartera"],
    answer:
      "Una billetera (wallet) es donde guardas tus criptomonedas. Pueden ser 'calientes' (conectadas a internet, como apps) o 'frías' (offline, como dispositivos físicos). Nunca compartas tu frase de recuperación.",
  },
  {
    keywords: ["comprar", "como compro", "invertir", "comprar cripto"],
    answer:
      "Para comprar cripto: 1) Crea y verifica tu cuenta, 2) Deposita fondos (tarjeta, transferencia o P2P), 3) Elige la criptomoneda y confirma la compra. Puedes empezar desde el Dashboard.",
  },
  {
    keywords: ["seguridad", "seguro", "proteger", "estafa", "scam"],
    answer:
      "Para operar seguro: activa la autenticación en dos pasos (2FA), usa contraseñas fuertes, no compartas tus claves privadas y desconfía de promesas de rentabilidad garantizada.",
  },
  {
    keywords: ["volatil", "volatilidad", "riesgo", "baja", "sube"],
    answer:
      "Las criptomonedas son muy volátiles: sus precios pueden subir o bajar fuertemente en poco tiempo. Invierte solo lo que estés dispuesto a perder y diversifica.",
  },
  {
    keywords: ["stablecoin", "usdt", "usdc", "estable"],
    answer:
      "Las stablecoins (como USDT o USDC) son criptomonedas cuyo valor está vinculado a un activo estable, normalmente el dólar (1:1). Sirven para reducir la exposición a la volatilidad.",
  },
  {
    keywords: ["comision", "comisiones", "fee", "fees", "costo"],
    answer:
      "Las comisiones dependen del tipo de operación (compra, venta, retiro) y de la red usada. Revisa siempre las comisiones antes de confirmar una transacción.",
  },
  {
    keywords: ["soporte", "ayuda", "contacto", "humano", "asesor"],
    answer:
      "Si necesitas ayuda personalizada, visita nuestro centro de soporte desde la página de Contacto y un asesor te responderá lo antes posible.",
  },
];

const SUGGESTIONS = [
  "¿Qué es Bitcoin?",
  "¿Cómo compro cripto?",
  "¿Qué es una wallet?",
  "Consejos de seguridad",
];

const WELCOME_MESSAGE = {
  from: "bot",
  text: "¡Hola! 👋 Soy tu asistente cripto. Pregúntame sobre Bitcoin, wallets, seguridad o cómo empezar a invertir.",
};

const FALLBACK_ANSWER =
  "No estoy seguro de eso 🤔. Prueba preguntando sobre Bitcoin, Ethereum, wallets, seguridad o cómo comprar cripto. Para ayuda personalizada visita la página de Contacto.";

// Normaliza texto: minúsculas y sin acentos, para comparar palabras clave.
function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function findAnswer(question) {
  const q = normalize(question);
  let best = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(normalize(kw))) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return best ? best.answer : FALLBACK_ANSWER;
}

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    // Pequeño retraso para simular "escribiendo..."
    const answer = findAnswer(trimmed);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: answer }]);
      setIsTyping(false);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Ventana del chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-[90vw] max-w-sm h-[70vh] max-h-[520px] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
          {/* Encabezado */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <FaRobot className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold leading-tight">Asistente Cripto</p>
                <p className="text-[11px] text-teal-50 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-300 inline-block" />
                  En línea
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-teal-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  </span>
                </div>
              </div>
            )}

            {/* Sugerencias (solo al inicio) */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 border border-teal-100 hover:bg-teal-100 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Entrada de texto */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 p-3 border-t border-gray-100 bg-white"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 px-3.5 py-2.5 text-sm rounded-full bg-gray-100 border border-transparent focus:border-teal-400 focus:bg-white focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Enviar mensaje"
              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-teal-600 text-white hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <FaPaperPlane className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat de ayuda"}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-teal-600 text-white shadow-lg shadow-teal-500/30 hover:bg-teal-500 hover:scale-105 transition-all duration-300"
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <FaCommentDots className="w-6 h-6" />
        )}
      </button>
    </>
  );
}

export default ChatBot;
