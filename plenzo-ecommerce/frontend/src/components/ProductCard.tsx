// frontend/src/components/ProductCard.tsx
'use client';

import React, { useState } from 'react';

interface ProductProps {
  title: string;
  category: string;
  priceLKR: number;
  originalPriceLKR?: number;
  imageUrl: string;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
}

export default function ProductCard({
  title,
  category,
  priceLKR,
  originalPriceLKR,
  imageUrl,
  rating = 4.8,
  reviewsCount = 36,
  badge
}: ProductProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-3 hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col justify-between">
      
      {/* Product Image & Badge Container */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-3">
        {badge && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
            {badge}
          </span>
        )}

        {/* Wishlist Heart Toggle Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white text-gray-700 transition shadow-sm"
          aria-label="Add to Wishlist"
        >
          <svg
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-red-500 stroke-red-500' : 'stroke-current fill-none'
            }`}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Details Section */}
      <div className="flex-1 flex flex-col justify-between px-1">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
            {category}
          </span>
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {title}
          </h3>

          {/* E-Commerce Star Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-amber-400 text-xs">★</span>
            <span className="text-xs font-bold text-gray-800">{rating}</span>
            <span className="text-[11px] text-gray-400">({reviewsCount})</span>
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
          <div>
            <div className="text-sm font-bold text-gray-900">
              LKR {priceLKR.toLocaleString()}
            </div>
            {originalPriceLKR && (
              <div className="text-[11px] text-gray-400 line-through">
                LKR {originalPriceLKR.toLocaleString()}
              </div>
            )}
          </div>

          <button className="bg-black hover:bg-emerald-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-sm">
            <span>Add</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}