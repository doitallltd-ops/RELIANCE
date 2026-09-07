/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StoreHero } from './components/StoreHero';
import { NavigationTabs } from './components/NavigationTabs';
import { PopularTimesCard } from './components/PopularTimesCard';
import { CatalogSection } from './components/CatalogSection';
import { CartDrawer } from './components/CartDrawer';
import { ReviewsSection } from './components/ReviewsSection';
import { StoreInfoSection } from './components/StoreInfoSection';
import { DirectionsModal } from './components/DirectionsModal';
import { SuggestEditModal } from './components/SuggestEditModal';
import { Footer } from './components/Footer';
import { Product, CartItem } from './types';
import { GROCERY_PRODUCTS } from './data/storeData';
import { 
  ArrowRight, 
  ShieldCheck, 
  ShoppingBag, 
  Clock, 
  Star,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rsp_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default initial cart item for convenient instant testing
    return [
      { product: GROCERY_PRODUCTS[0], quantity: 2 }, // Nashik Red Onion
      { product: GROCERY_PRODUCTS[2], quantity: 1 }, // Amul Milk
    ];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [isSuggestEditOpen, setIsSuggestEditOpen] = useState(false);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rsp_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] flex flex-col font-sans selection:bg-[#C5A47E] selection:text-black">
      
      {/* Site Header */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
        activeTab={activeTab}
      />

      {/* Main Store Hero Banner */}
      <StoreHero
        onOpenDirections={() => setIsDirectionsOpen(true)}
        onOpenSuggestEdit={() => setIsSuggestEditOpen(true)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
      />

      {/* Tab Navigation */}
      <NavigationTabs
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 350, behavior: 'smooth' });
        }}
        cartCount={cartTotalCount}
      />

      {/* Active Tab Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Live Popular Times Spotlight */}
            <section aria-labelledby="live-crowd-heading">
              <div className="flex items-center justify-between mb-3">
                <h3 id="live-crowd-heading" className="serif text-lg font-normal text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Store Footfall & Busy Times
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('popular-times')}
                  className="text-xs text-[#C5A47E] font-medium hover:underline flex items-center gap-1"
                >
                  <span>Full Weekly Schedule</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <PopularTimesCard />
            </section>

            {/* Featured Deals & Mandi Produce Preview */}
            <section aria-labelledby="featured-deals-heading" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 id="featured-deals-heading" className="serif text-xl sm:text-2xl font-light text-white">
                    Today's Smart Mandi Deals
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Direct from farm & wholesale suppliers at unbeatable rates
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('catalog')}
                  className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-[#C5A47E] rounded-lg text-xs font-semibold hover:bg-white/10 flex items-center gap-1 transition-colors"
                >
                  <span>View All Items ({GROCERY_PRODUCTS.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {GROCERY_PRODUCTS.slice(0, 4).map((product) => {
                  const itemInCart = cartItems.find((i) => i.product.id === product.id);
                  const qty = itemInCart?.quantity || 0;

                  return (
                    <div
                      key={product.id}
                      className="bg-[#0d0d0d] rounded-2xl border border-white/10 hover:border-[#C5A47E]/40 overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all group"
                    >
                      <div className="relative aspect-4/3 bg-[#050505] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                        />
                        {product.discountPercentage > 0 && (
                          <span className="absolute top-2 right-2 bg-red-950 text-red-400 border border-red-800/60 font-black text-[10px] px-2 py-0.5 rounded-md shadow-xs">
                            {product.discountPercentage}% OFF
                          </span>
                        )}
                        <span className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-xs text-[#C5A47E] text-[9px] font-bold px-2 py-0.5 rounded-xs border border-white/10">
                          {product.tag || 'Mandi Fresh'}
                        </span>
                      </div>

                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[11px] font-medium text-neutral-500 block mb-0.5">
                            {product.weightOrVolume}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold text-neutral-100 line-clamp-2">
                            {product.name}
                          </h4>
                          {product.hindiName && (
                            <p className="text-[11px] text-neutral-400 font-medium mt-0.5">{product.hindiName}</p>
                          )}
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-end justify-between">
                          <div>
                            <span className="text-sm font-bold text-white">₹{product.price}</span>
                            {product.mrp > product.price && (
                              <span className="text-xs text-neutral-500 line-through ml-1.5">
                                ₹{product.mrp}
                              </span>
                            )}
                          </div>

                          {qty === 0 ? (
                            <button
                              type="button"
                              onClick={() => handleAddToCart(product)}
                              className="px-3 py-1 rounded-lg border border-[#C5A47E] text-[#C5A47E] hover:bg-[#C5A47E] hover:text-black font-bold text-xs transition-colors"
                            >
                              ADD
                            </button>
                          ) : (
                            <div className="flex items-center rounded-lg bg-[#C5A47E] text-black text-xs font-bold">
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(product.id, -1)}
                                className="px-2 py-1 hover:bg-[#d5b58e]"
                              >
                                -
                              </button>
                              <span className="px-1.5">{qty}</span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(product.id, 1)}
                                className="px-2 py-1 hover:bg-[#d5b58e]"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Store Features & Neighbourhood Value */}
            <section className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-6 shadow-2xl">
              <h3 className="serif text-lg font-normal text-white mb-4">
                Why Shop At Reliance Smart Point Sion West?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-[#C5A47E] flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="serif font-normal text-white text-sm">Below MRP Everyday</h4>
                    <p className="mt-1 leading-relaxed text-neutral-400 font-light">
                      Save on staples, oils, pulses, cleaning supplies, and dairy with consistent minimum 5% to 50% discount tags.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-[#C5A47E] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="serif font-normal text-white text-sm">Fast 30-Min Delivery</h4>
                    <p className="mt-1 leading-relaxed text-neutral-400 font-light">
                      Express doorstep delivery across Sindhi Society, Sion West, GTB Nagar, and Matunga with free delivery on ₹199+.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-[#C5A47E] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="serif font-normal text-white text-sm">Direct Mandi Quality</h4>
                    <p className="mt-1 leading-relaxed text-neutral-400 font-light">
                      Vegetables and fruits are handpicked each morning and sorted under strict freshness standards.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Customer Testimonial Preview */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="serif text-lg font-normal text-white flex items-center gap-2">
                  <span>Customer Opinions</span>
                  <span className="text-[#C5A47E] font-medium text-xs flex items-center gap-1 font-sans">
                    <Star className="w-3.5 h-3.5 fill-[#C5A47E]" />
                    3.8 (1,794 Reviews)
                  </span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs text-[#C5A47E] font-medium hover:underline"
                >
                  Read all reviews →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Rohan Sawant</span>
                    <span className="text-[#C5A47E]">★★★★★</span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed font-light">
                    "Very convenient grocery store right opposite Guru Kripa Hotel in Sion West. I visit regularly for fresh vegetables in the morning around 8:30 AM. Polite staff and good Reliance One rewards."
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/10 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Pooja Chhabria</span>
                    <span className="text-[#C5A47E]">★★★★☆</span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed font-light">
                    "Good neighbourhood supermarket with decent discounts on daily staples like Aashirvaad Atta and Fortune oil. Wheelchair ramp at the entrance is very helpful for elderly residents."
                  </p>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* CATALOG / MENU TAB */}
        {activeTab === 'catalog' && (
          <CatalogSection
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {/* POPULAR TIMES TAB */}
        {activeTab === 'popular-times' && (
          <div className="space-y-6">
            <div>
              <h2 className="serif text-2xl font-light text-white">Store Traffic & Popular Times</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Plan your shopping trip to avoid checkout lines at Reliance Smart Point Sion West
              </p>
            </div>
            <PopularTimesCard />
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <ReviewsSection />
        )}

        {/* STORE INFO & HOURS TAB */}
        {activeTab === 'info' && (
          <StoreInfoSection
            onOpenDirections={() => setIsDirectionsOpen(true)}
            onOpenSuggestEdit={() => setIsSuggestEditOpen(true)}
          />
        )}

      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Directions Modal */}
      <DirectionsModal
        isOpen={isDirectionsOpen}
        onClose={() => setIsDirectionsOpen(false)}
      />

      {/* Suggest Edit Modal */}
      <SuggestEditModal
        isOpen={isSuggestEditOpen}
        onClose={() => setIsSuggestEditOpen(false)}
      />

      {/* Site Footer */}
      <Footer
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 350, behavior: 'smooth' });
        }}
        onOpenDirections={() => setIsDirectionsOpen(true)}
      />

    </div>
  );
}
