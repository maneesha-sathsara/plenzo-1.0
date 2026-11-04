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
  const [couponCopied, setCouponCopied] = useState<string | null>(null);
  
  
  const [currentDealIndex, setCurrentDealIndex] = useState<number>(0);

  
  const defaultDeals = [
    { id: '1', title: 'Wireless Audio & Premium Headphones', price: 12500, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop' },
    { id: '2', title: 'Next-Gen Smart Fitness Watch Series 8', price: 24900, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop' },
    { id: '3', title: 'Ultra HD 4K Gaming Camera & Lens', price: 85000, imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=600&auto=format&fit=crop' },
    { id: '4', title: 'Ergonomic RGB Mechanical Keyboard', price: 18500, imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop' },
    { id: '5', title: 'Portable Bluetooth Bass Speaker', price: 9800, imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop' },
    { id: '6', title: 'Pro Wireless Gaming Mouse with RGB', price: 7500, imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop' },
    { id: '7', title: 'Ultra-Slim 15.6 inch Portable Monitor', price: 42000, imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop' },
    { id: '8', title: 'Noise Cancelling True Wireless Earbuds', price: 15500, imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop' },
    { id: '9', title: 'Smart Home Security Wi-Fi Camera', price: 11200, imageUrl: 'https://images.unsplash.com/photo-1557324232-b8917d7c3dcb?q=80&w=600&auto=format&fit=crop' },
    { id: '10', title: 'Fast Charging 20000mAh Power Bank', price: 6500, imageUrl: 'https://images.unsplash.com/photo-1609592424067-7634db8487b2?q=80&w=600&auto=format&fit=crop' },
    { id: '11', title: 'RGB Desktop Gaming Soundbar', price: 8900, imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop' },
    { id: '12', title: 'Smart LED Desk Lamp with Wireless Charger', price: 9400, imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop' },
    { id: '13', title: 'Type-C Multi-Port Hub Adapter', price: 5500, imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=600&auto=format&fit=crop' },
    { id: '14', title: 'Smart Coffee Mug Temperature Control', price: 14000, imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop' },
    { id: '15', title: 'Mini Air Purifier for Desktop & Car', price: 10500, imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=600&auto=format&fit=crop' }
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
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

  
  const activeDeals = products.length > 0 ? products.slice(0, 15) : defaultDeals;

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDealIndex((prevIndex) => (prevIndex + 1) % activeDeals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeDeals.length]);

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

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCouponCopied(code);
    setTimeout(() => setCouponCopied(null), 2000);
  };

  const currentDeal = activeDeals[currentDealIndex] || activeDeals[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-200">
      
      
      <div className="sticky top-0 z-50 shadow-md">
        
        <div className="bg-amber-400 text-slate-900 text-xs py-1.5 px-4 text-center font-bold tracking-wide flex justify-center items-center gap-2">
          <span>⚡ MEGA SHOPPING SALE 2026: Up to 50% OFF on Selected Products!</span>
          <span className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded text-[10px] uppercase font-black cursor-pointer hover:bg-slate-800" onClick={() => copyCoupon('PLENZO50')}>
            Code: PLENZO50 (Click to Copy)
          </span>
        </div>

      
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-6">
            <a href="#" className="flex items-center gap-2 shrink-0">
              <span className="text-3xl font-black tracking-tight">
                <span className="text-amber-500">PLEN</span>
                <span className="text-orange-500">ZO</span>
                <span className="text-amber-500">.</span>
              </span>
            </a>

          
            <div className="flex-1 max-w-3xl relative hidden lg:block">
              <div className="flex w-full rounded-xl overflow-hidden border-2 border-amber-500 bg-white focus-within:ring-2 focus-within:ring-amber-200 transition-all shadow-sm">
                <select className="bg-slate-50 text-slate-700 text-xs px-3 py-2.5 outline-none border-r border-slate-200 hover:bg-slate-100 cursor-pointer w-auto max-w-[140px] font-medium">
                  <option>All Categories</option>
                  {categories.map(c => (
                    <option key={c.id}>{c.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Search products, categories, electronics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm outline-none text-slate-900"
                />
                <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-7 font-bold text-sm transition flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            
            <div className="flex items-center gap-4 shrink-0">
              <button className="p-2.5 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition relative hidden sm:block">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              <button className="p-2.5 bg-slate-50 hover:bg-amber-100 text-slate-800 rounded-xl transition relative flex items-center gap-2 border border-slate-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="text-xs font-bold hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow-md">
                Sign In
              </button>
            </div>
          </div>
        </header>

        {/* 3. Secondary Navigation */}
        <nav className="bg-slate-900 text-white text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center overflow-x-auto scrollbar-none">
            <button className="flex items-center gap-1.5 font-bold py-2.5 pr-5 border-r border-slate-700 hover:text-amber-400 transition shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              All Departments
            </button>
            <div className="flex items-center gap-5 pl-5 font-medium whitespace-nowrap">
              <a href="#deals" className="hover:text-amber-400 transition py-2.5">Today&apos;s Deals</a>
              <a href="#coupons" className="hover:text-amber-400 transition py-2.5">Discount Coupons</a>
              <a href="#" className="hover:text-amber-400 transition py-2.5">Customer Service</a>
              <a href="#" className="hover:text-amber-400 transition py-2.5">Registry</a>
              <a href="#" className="hover:text-amber-400 transition py-2.5">Gift Cards</a>
              <a href="#products" className="hover:text-amber-400 transition py-2.5 text-amber-400 font-bold flex items-center gap-1">
                Flash Sale <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded animate-pulse">LIVE</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
      

      
      <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-slate-900 py-12 px-6 shadow-inner relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
          <div className="md:col-span-2 space-y-4">
            <span className="bg-slate-900 text-amber-400 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
              EVERYDAY LOW PRICES
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-md">
              Sri Lanka&apos;s Favourite <br/> Online Marketplace
            </h1>
            <p className="text-white/90 font-medium text-base sm:text-lg max-w-xl drop-shadow-sm">
              Shop thousands of items across electronics, gadgets, and lifestyle products with fast islandwide delivery.
            </p>
            <div className="flex gap-3 pt-4">
              <a href="#products" className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-xl transition transform hover:-translate-y-0.5">
                Start Shopping
              </a>
              <a href="#coupons" className="px-8 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold text-sm rounded-xl backdrop-blur-md transition border border-white/30">
                Claim Coupons
              </a>
            </div>
          </div>

          
          <div className="flex justify-center relative">
            <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-2xl text-white text-center space-y-4 w-full max-w-sm border border-white/30 transition-all duration-700 transform">
              <div className="flex justify-center items-center px-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-white bg-red-600 px-3.5 py-1 rounded-full inline-block shadow-md flex items-center gap-1.5">
                  DEAL OF THE DAY 
                  <span className="inline-block animate-pulse text-amber-300 drop-shadow-[0_0_8px_rgba(255,165,0,0.8)] scale-110">🔥</span>
                </span>
              </div>
              <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-900/40 shadow-inner relative">
                <img
                  key={currentDeal.id + 'slide'}
                  src={currentDeal.imageUrl || defaultImage}
                  alt={currentDeal.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-black text-white tracking-tight line-clamp-1 drop-shadow">
                {currentDeal.title}
              </h3>
              <p className="text-xs text-amber-200 font-bold drop-shadow">
                Special Price: Rs. {currentDeal.price.toLocaleString()}
              </p>
              <button onClick={handleAddToCart} className="block w-full py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-black text-xs uppercase tracking-wider rounded-xl transition shadow-xl mt-2 cursor-pointer">
                CLAIM DEAL
              </button>
            </div>
          </div>
        </div>
      </section>

      <div id="coupons" className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 w-full">
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-2xl p-4 md:p-6 text-slate-950 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-amber-300">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-bounce">🎟️</span>
            <div>
              <h4 className="text-base font-black tracking-wide">Active Promo Coupons</h4>
              <p className="text-xs text-slate-800 font-semibold">Click code to copy instantly at checkout</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => copyCoupon('SAVE1000')} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md">
              <span>Rs. 1,000 OFF</span> <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black">{couponCopied === 'SAVE1000' ? 'COPIED!' : 'SAVE1000'}</span>
            </button>
            <button onClick={() => copyCoupon('TECH20')} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md">
              <span>20% FLAT OFF</span> <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black">{couponCopied === 'TECH20' ? 'COPIED!' : 'TECH20'}</span>
            </button>
            <button onClick={() => copyCoupon('FREESHIP')} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md">
              <span>FREE SHIPPING</span> <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black">{couponCopied === 'FREESHIP' ? 'COPIED!' : 'FREESHIP'}</span>
            </button>
          </div>
        </div>
      </div>

      
      <section className="bg-white border-b border-slate-200 py-6 px-6 shadow-sm z-10 relative mt-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3.5 justify-center p-3.5 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200/70 hover:shadow-md transition cursor-pointer">
            <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl text-xl shadow-md font-bold">🚚</div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold text-slate-900">Fast Delivery</h4>
              <p className="text-[11px] text-slate-600 font-medium">Islandwide Shipping</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 justify-center p-3.5 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200/70 hover:shadow-md transition cursor-pointer">
            <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl text-xl shadow-md font-bold">🛡️</div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold text-slate-900">100% Authentic</h4>
              <p className="text-[11px] text-slate-600 font-medium">Genuine Guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 justify-center p-3.5 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200/70 hover:shadow-md transition cursor-pointer">
            <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl text-xl shadow-md font-bold">💳</div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold text-slate-900">Safe Cash Delivery</h4>
              <p className="text-[11px] text-slate-600 font-medium">Pay on Arrival</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 justify-center p-3.5 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200/70 hover:shadow-md transition cursor-pointer">
            <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl text-xl shadow-md font-bold">🔄</div>
            <div className="text-left">
              <h4 className="text-xs font-extrabold text-slate-900">Easy Returns</h4>
              <p className="text-[11px] text-slate-600 font-medium">Hassle-free Refunds</p>
            </div>
          </div>
        </div>
      </section>

      
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8 w-full flex-1">
        
        {/* Left Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="font-black text-slate-900 mb-4 text-sm tracking-wide border-b border-slate-100 pb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li>
                <button onClick={() => setSelectedCategory('all')} className={`w-full text-left px-3 py-2 rounded-lg transition ${selectedCategory === 'all' ? 'bg-amber-50 text-amber-700 font-bold' : 'hover:bg-slate-50'}`}>
                  All Categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button onClick={() => setSelectedCategory(cat.name)} className={`w-full text-left px-3 py-2 rounded-lg transition ${selectedCategory.toLowerCase() === cat.name.toLowerCase() ? 'bg-amber-50 text-amber-700 font-bold' : 'hover:bg-slate-50'}`}>
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="font-black text-slate-900 mb-4 text-sm tracking-wide border-b border-slate-100 pb-3">Price Range</h4>
            <ul className="space-y-3 text-sm text-slate-600 font-medium mb-4">
              <li className="cursor-pointer hover:text-amber-600 transition flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-slate-300"></div> Under Rs. 5,000</li>
              <li className="cursor-pointer hover:text-amber-600 transition flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-slate-300"></div> Rs. 5k - 15k</li>
              <li className="cursor-pointer hover:text-amber-600 transition flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-slate-300"></div> Rs. 15k - 50k</li>
              <li className="cursor-pointer hover:text-amber-600 transition flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-slate-300"></div> Over Rs. 50,000</li>
            </ul>
            <div className="flex gap-2 items-center">
              <input type="text" placeholder="Min" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-amber-500 outline-none text-xs font-medium" />
              <span className="text-slate-400">-</span>
              <input type="text" placeholder="Max" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-amber-500 outline-none text-xs font-medium" />
              <button className="bg-slate-900 text-white p-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </aside>

        
        <div className="flex-1 w-full">
          
          
          <div id="deals" className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                🔥 Hot Live Deals & Flash Sales
              </h3>
              <span className="text-xs text-slate-500 font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">Swipe ➔</span>
            </div>
            
            {loading ? (
              <div className="flex gap-4 overflow-x-auto pb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="min-w-[240px] h-64 bg-slate-200 rounded-2xl animate-pulse shrink-0"></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x">
                {products.slice(0, 6).map((deal) => (
                  <div key={deal.id} className="min-w-[250px] max-w-[250px] bg-white border border-slate-200 rounded-2xl p-4 shrink-0 snap-start shadow-sm hover:shadow-lg transition relative group">
                    <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                      FLASH SALE
                    </span>
                    <div className="w-full h-40 bg-slate-100 rounded-xl overflow-hidden mb-3 relative">
                      <img src={deal.imageUrl || defaultImage} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-600 uppercase">{deal.category?.name || 'General'}</span>
                    <h5 className="font-bold text-slate-800 text-sm line-clamp-1 mt-0.5">{deal.title}</h5>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-xs text-slate-400 line-through block">Rs. {Math.round(deal.price * 1.3).toLocaleString()}</span>
                        <span className="text-base font-black text-slate-900">Rs. {deal.price.toLocaleString()}</span>
                      </div>
                      <button onClick={handleAddToCart} className="bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-black px-4 py-2 rounded-xl transition shadow-sm">
                        Buy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">All Products Catalog</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Showing {filteredProducts.length} results from live inventory</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-700 hidden sm:block">Sort by:</span>
              <select className="bg-slate-50 text-slate-800 text-sm px-4 py-2.5 rounded-xl outline-none border border-slate-200 hover:border-amber-400 cursor-pointer font-bold shadow-sm transition">
                <option>Featured Picks</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
            </div>
          </div>

      
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-slate-200/50 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
              <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                🔍
              </div>
              <h4 className="text-xl font-black text-slate-900">No products found</h4>
              <p className="text-sm text-slate-500 mt-2 font-medium">Try resetting your search query or category filters.</p>
              <button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }} className="mt-6 px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition shadow-md">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-xl hover:border-amber-200 transition duration-300 flex flex-col justify-between relative group">
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase shadow-sm">
                      HOT DEAL
                    </span>
                  </div>
                  <div>
                    <div className="w-full h-56 bg-slate-50 rounded-2xl overflow-hidden mb-4 relative flex items-center justify-center">
                      <img src={product.imageUrl || defaultImage} alt={product.title} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition duration-500" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wide bg-amber-50 px-2.5 py-1 rounded-md">
                        {product.category?.name || 'General'}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 text-xs">
                        {'★'.repeat(4)}{'☆'}
                        <span className="text-slate-400 text-[10px] font-bold ml-1">(128)</span>
                      </div>
                    </div>
                    <h4 className="font-black text-slate-900 text-base mt-2 line-clamp-2 group-hover:text-amber-600 transition leading-snug">
                      {product.title}
                    </h4>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        {product.stock < 10 ? (
                          <span className="text-[10px] font-black text-red-600 block mb-1">HURRY! ONLY {product.stock} LEFT</span>
                        ) : (
                          <span className="text-[10px] font-black text-emerald-600 block mb-1">IN STOCK</span>
                        )}
                        <span className="text-2xl font-black text-slate-900">
                          Rs. {product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button onClick={handleAddToCart} className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-900 font-black text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      
      <footer className="bg-slate-900 text-slate-400 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 border-t border-slate-800">
          <div className="space-y-4">
            <span className="text-3xl font-black tracking-tight block mb-2">
              <span className="text-amber-500">PLEN</span>
              <span className="text-orange-400">ZO</span>
              <span className="text-amber-500">.</span>
            </span>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Sri Lanka&apos;s trusted multi-category online marketplace for electronics, fashion, gadgets, and home essentials with fast islandwide delivery.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 font-medium">
              <li><a href="#" className="hover:text-amber-400 transition">About Us</a></li>
              <li><a href="#products" className="hover:text-amber-400 transition">Catalog</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-3 font-medium">
              <li><a href="#" className="hover:text-amber-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Track Order</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4 font-medium">Subscribe to get special discounts and mega sale alerts.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="px-4 py-3 bg-slate-800 text-white rounded-xl border border-slate-700 text-sm outline-none focus:border-amber-500 w-full" />
              <button className="px-5 py-3 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="bg-slate-950 py-6 text-center text-slate-500 text-xs font-medium">
          © 2026 Plenzo E-Commerce. All rights reserved.
        </div>
      </footer>
    </div>
  );
}