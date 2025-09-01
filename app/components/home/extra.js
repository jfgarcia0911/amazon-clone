"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icons
import Image from "next/image";

const items = [
    '/Image1.jpg',
    '/Image2.jpg',
    '/Image3.jpg',
    '/Image4.jpg',
    '/Image5.jpg',
    '/Image6.jpg',
]

export default function Etra() {

const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {items.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <Image
              src={'/Image1'}
              alt={`Slide ${index}`}
              fill
              priority
              className="object-cover"
            />
          </div>
        ))}
      </div>
<Image
              src={'/Image1'}
              alt='d'
              fill
              priority
              className="object-cover"
            />
      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 -translate-y-1/2 bg-gray-800/40 text-white p-2 rounded-full hover:bg-gray-800"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 -translate-y-1/2 bg-gray-800/40 text-white p-2 rounded-full hover:bg-gray-800"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
