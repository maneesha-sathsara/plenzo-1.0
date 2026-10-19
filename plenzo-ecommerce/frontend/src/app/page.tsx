// frontend/src/app/page.tsx
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const products = [
    { 
      id: 1, 
      title: "Plenzo Smart Watch Series X", 
      priceLKR: 12500, 
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      tag: "New Arrival"
    },
    { 
      id: 2, 
      title: "Echo Wireless Earbuds", 
      priceLKR: 8900, 
      imageUrl: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800" 
    },
    { 
      id: 3, 
      title: "Minimalist Leather Wallet", 
      priceLKR: 4500, 
      imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
      tag: "Bestseller"
    },
    { 
      id: 4, 
      title: "Ceramic Coffee Tumbler", 
      priceLKR: 3200, 
      imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800" 
    },
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-emerald-500 selection:text-white pb-20 relative">
      
      {/* Glassmorphism Sticky Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="text-2xl font-black tracking-tighter text-black uppercase">
            Plenzo<span className="text-emerald-500">.</span>
          </div>
          
          {/* AI Smart Search Bar (Placeholder for future automation) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
            <input 
              type="text" 
              placeholder="Ask AI to find anything..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            <svg className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500 items-center">
            <a href="#" className="hover:text-black transition">Shop</a>
            <a href="#" className="hover:text-black transition">Collections</a>
          </div>
          <div className="flex gap-4 items-center ml-4">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition shadow-md">
              <span className="text-xs font-bold">0</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Advanced UI */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto w-full mt-28 mb-16">
        <div className="relative w-full h-[65vh] min-h-[450px] bg-black rounded-[2.5rem] overflow-hidden flex items-center p-8 md:p-16 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            alt="Hero Background"
          />
          {/* Subtle glow effect */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl text-white">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase">
              The Global Standard
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.1]">
              Elevate your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 italic font-light">
                everyday.
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-md font-light leading-relaxed">
              Experience the next generation of premium lifestyle products. Designed globally, delivered locally with intelligent precision.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-10 px-1">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Trending Now</h2>
            <p className="text-gray-500 mt-2 text-sm">Curated picks based on global trends.</p>
          </div>
          <a href="#" className="text-sm font-semibold text-gray-900 hover:text-emerald-600 transition underline-offset-4 hover:underline mb-1">
            View All Collection &rarr;
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              priceLKR={product.priceLKR}
              imageUrl={product.imageUrl}
              tag={product.tag}
            />
          ))}
        </div>
      </section>

      {/* Floating AI Assistant Button (Future AI Automation) */}
      <button className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-emerald-600 transition-all duration-300 group">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Ask Plenzo AI
        </span>
      </button>
    </main>
  );
}