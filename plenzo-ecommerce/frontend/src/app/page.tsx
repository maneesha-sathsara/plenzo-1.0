'use client';

import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  description?: string;
  imageUrl?: string;
  stock: number;
  category?: Category;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartCount, setCartCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });

    fetch('http://localhost:5000/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  const defaultImage =
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop';

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category?.name?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* 1. Top Announcement Bar */}
      <div className="bg-amber-400 text-slate-900 text-xs py-1.5 px-4 text-center font-bold tracking-wide flex justify-center items-center gap-2">
        <span>⚡ MEGA SHOPPING SALE 2026: Up to 50% OFF on Selected Products!</span>
        <span className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded text-[10px] uppercase font-black">
          Code: PLENZO50
        </span>
      </div>

      {/* 2. Retail Header & Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2">
            <span className="text-3xl font-black text-amber-500 tracking-tight">
              PLENZO<span className="text-slate-900">.</span>
            </span>
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative hidden md:block">
            <div className="flex">
              <input
                type="text"
                placeholder="Search products, categories, electronics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border-2 border-amber-500 rounded-l-xl text-sm focus:outline-none focus:bg-white"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 font-bold text-sm rounded-r-xl transition flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-4">
            {/* Wishlist Icon */}
            <button className="p-2.5 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded-xl transition relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Cart Icon */}
            <button className="p-2.5 bg-slate-100 hover:bg-amber-100 text-slate-800 rounded-xl transition relative flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-xs font-bold hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* 3. Retail Marketplace Hero Banner */}
      <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-slate-900 py-12 px-6 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-4">
            <span className="bg-slate-900 text-amber-400 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
              EVERYDAY LOW PRICES
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight drop-shadow-sm">
              Sri Lanka's Favourite Online Marketplace
            </h1>
            <p className="text-slate-900 font-semibold text-base sm:text-lg max-w-xl">
              Shop thousands of items across electronics, gadgets, and lifestyle products with fast islandwide delivery.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#products" className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-lg transition">
                Start Shopping
              </a>
              <a href="#categories" className="px-7 py-3.5 bg-white/20 hover:bg-white/30 text-slate-900 font-bold text-sm rounded-xl backdrop-blur-md transition">
                Explore Categories
              </a>
            </div>
          </div>

          <div className="flex justify-center relative">
            <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/50 text-slate-900 text-center space-y-4 w-full max-w-sm">
              <span className="text-xs font-black uppercase tracking-wider text-red-600 bg-red-100 px-3 py-1 rounded-full">
                Deal of the Day 🔥
              </span>
              <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
                  alt="Deal Product"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Wireless Audio Deals</h3>
              <p className="text-xs text-slate-600 font-medium">Get up to 35% OFF on premium audio gear</p>
              <a href="#products" className="block w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xs uppercase tracking-wider rounded-xl transition shadow-md">
                Claim Deal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Badges / Value Proposition */}
      <section className="bg-white border-b border-slate-200 py-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 justify-center p-2 bg-slate-50/80 rounded-xl border border-slate-100">
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl text-xl">🚚</div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold text-slate-800">Fast Delivery</h4>
              <p className="text-[11px] text-slate-500">Islandwide Shipping</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 justify-center p-2 bg-slate-50/80 rounded-xl border border-slate-100">
            <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl text-xl">🛡️</div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold text-slate-800">100% Authentic</h4>
              <p className="text-[11px] text-slate-500">Genuine Guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 justify-center p-2 bg-slate-50/80 rounded-xl border border-slate-100">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl text-xl">💳</div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold text-slate-800">Safe Cash Delivery</h4>
              <p className="text-[11px] text-slate-500">Pay on Arrival</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 justify-center p-2 bg-slate-50/80 rounded-xl border border-slate-100">
            <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl text-xl">🔄</div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold text-slate-800">Easy Returns</h4>
              <p className="text-[11px] text-slate-500">Hassle-free Refunds</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Main Catalog & Products Grid */}
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
        {/* Category Pills */}
        <div id="categories" className="mb-8">
          <h2 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-wider">Top Categories</h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap shadow-sm ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-slate-900 font-extrabold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              All Items ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap shadow-sm ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-amber-500 text-slate-900 font-extrabold'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Recommended Products</h3>
            <p className="text-xs text-slate-500 mt-0.5">Explore deals updated daily from live inventory</p>
          </div>
          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
            {filteredProducts.length} Products
          </span>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 bg-slate-200/80 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
              📦
            </div>
            <h4 className="text-lg font-bold text-slate-800">No products found</h4>
            <p className="text-sm text-slate-500 mt-1">Try resetting your search query or category filter.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-2xl transition duration-300 flex flex-col justify-between relative group"
              >
                {/* Hot Badge */}
                <span className="absolute top-6 left-6 z-10 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase shadow-sm">
                  HOT DEAL
                </span>

                <div>
                  <div className="w-full h-52 bg-slate-100 rounded-xl overflow-hidden mb-3">
                    <img
                      src={product.imageUrl || defaultImage}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded">
                      {product.category?.name || 'General'}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      {'★'.repeat(5)}
                      <span className="text-slate-400 text-[10px] font-semibold">(4.8)</span>
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base mt-2 line-clamp-1 group-hover:text-amber-600 transition">
                    {product.title}
                  </h4>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                    {product.description || 'High-quality product with official warranty and fast delivery.'}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 block">
                      In Stock ({product.stock})
                    </span>
                    <span className="text-lg font-black text-slate-900">
                      LKR {product.price.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-900 font-black text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 6. Complete Professional E-Commerce Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-2xl font-black text-amber-500 tracking-tight">PLENZO.</span>
            <p className="text-slate-400 text-xs leading-relaxed">
              Sri Lanka's trusted multi-category online marketplace for electronics, fashion, gadgets, and home essentials with fast islandwide delivery.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition">About Us</a></li>
              <li><a href="#products" className="hover:text-amber-400 transition">Catalog</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Customer Care</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Track Order</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Newsletter</h4>
            <p className="text-slate-400 text-xs mb-3">Subscribe to get special discounts and mega sale alerts.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 text-xs outline-none focus:border-amber-500 w-full"
              />
              <button className="px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 py-6 text-center text-slate-500 text-[11px]">
          © 2026 Plenzo E-Commerce. All rights reserved.
        </div>
      </footer>
    </div>
  );
}