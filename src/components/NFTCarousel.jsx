import { memo, useEffect, useState } from "react";

const SLIDE_INTERVAL = 4000;

// Fuera del componente: referencia estable, no se recrea en cada render.
const galleryImages = [
  `${import.meta.env.BASE_URL}assets/img1.jpg`,
  `${import.meta.env.BASE_URL}assets/img2.jpg`,
  `${import.meta.env.BASE_URL}assets/img3.jpg`,
];

function NFTCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === galleryImages.length - 1 ? 0 : prev + 1,
      );
    }, SLIDE_INTERVAL);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-900 text-sm sm:text-base">
          Mercado NFT
        </h3>
        <span className="text-[11px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-semibold">
          Trending 🔥
        </span>
      </div>

      <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] w-full bg-slate-900">
        {galleryImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={img}
              alt={`NFT Collection ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />
          </div>
        ))}

        <div className="absolute bottom-0 left-0 w-full p-5 text-white">
          <p className="text-[11px] text-teal-400 font-bold uppercase tracking-wider mb-1">
            Floor Price: 2.5 ETH
          </p>
          <h4 className="text-base sm:text-lg font-bold leading-tight">
            Colección "Genesis" <br /> & Metaverso
          </h4>
        </div>

        <div className="absolute top-4 right-4 flex gap-1.5">
          {galleryImages.map((img, idx) => (
            <div
              key={img}
              className={`h-1.5 w-1.5 rounded-full transition-all ${idx === currentSlide ? "bg-teal-500 scale-125" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(NFTCarousel);
