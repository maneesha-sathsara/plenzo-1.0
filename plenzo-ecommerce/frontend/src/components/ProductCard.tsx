// frontend/src/components/ProductCard.tsx
import React from 'react';

interface ProductProps {
  title: string;
  priceLKR: number;
  imageUrl: string;
  tag?: string;
}

export default function ProductCard({ title, priceLKR, imageUrl, tag }: ProductProps) {
  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4">
        {/* Product Tag (e.g. "New", "Bestseller") */}
        {tag && (
          <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full text-gray-900 shadow-sm">
            {tag}
          </div>
        )}
        
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
        />
        
        {/* Quick Add Button (Hover කලාම විතරක් පෙනේ) */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <button className="w-full bg-white/95 backdrop-blur-md text-black py-3 rounded-xl font-semibold text-sm hover:bg-black hover:text-white transition-colors shadow-lg">
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className="font-medium text-gray-900 text-base">{title}</h3>
        <p className="text-gray-500 text-sm font-medium">LKR {priceLKR.toLocaleString()}</p>
      </div>
    </div>
  );
}