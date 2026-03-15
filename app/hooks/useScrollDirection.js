import { useEffect, useRef, useState } from "react";

export default function useScrollDirection() {
  const [isVisible, setIsVisible] = useState("up");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        setIsVisible("up");
      } else if (currentScrollY < lastScrollY.current && currentScrollY > 100) {
        setIsVisible("up");
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible("down");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isVisible;
}