import { useEffect, useState } from "react";
import { hamburgerImg, vegetablesImg, pharmacyImg } from "../../assets/images";

const HeroPhotoCarousel = () => {
  const photos = [hamburgerImg, vegetablesImg, pharmacyImg];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="relative h-48 w-48 overflow-hidden">
      {photos.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`Photo ${index + 1}`}
          className={`absolute inset-0 h-full w-full object-fit transition-all duration-[1500ms] ${
            activeIndex === index
              ? "opacity-100 scale-100"
              : "opacity-0 scale-[1.2] transition-all duration-[1000ms]"
          }`}
        />
      ))}
    </div>
  );
};

export default HeroPhotoCarousel;
