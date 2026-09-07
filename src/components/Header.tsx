import { useState } from 'react';
import { ShoppingBag, MapPin, Clock, Search, Phone, ShieldCheck, ChevronDown } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_DETAILS } from '../data/storeData';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateTab: (tabId: string) => void;
  activeTab: string;
}

export function Header({
  cartItems,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onNavigateTab,
  activeTab,
}: HeaderProps) {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      {/* Top micro-announcement bar */}
      <div className="bg-[#030303] text-neutral-400 text-xs py-1.5 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-red-950 text-red-400 border border-red-800/50">
              SION WEST
            </span>
            <span className="hidden sm:inline text-neutral-400">
              ⚡ 30-Min Local Express Grocery Delivery in Sion West, Matunga & GTB Nagar
            </span>
            <span className="sm:hidden text-neutral-400">
              ⚡ 30-Min Express Delivery in Sion
            </span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C5A47E]" />
              <span className="text-neutral-300">Open today until 10:00 PM</span>
            </span>
            <a
              href="tel:+912224078899"
              className="hidden md:flex items-center gap-1 text-[#C5A47E] hover:text-[#e0c6a5] transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>+91 22 2407 8899</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Logo & Store Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigateTab('overview')}>
            {/* Reliance Smart Point Emblem */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center shadow-md text-white font-black text-xl tracking-tighter shrink-0 border border-red-500/40">
                <span className="text-white text-lg font-extrabold flex items-center">
                  R<span className="text-[#C5A47E] text-sm font-bold">✦</span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-[#F0F0F0] leading-none">
                    Reliance <span className="text-red-500">SMART</span> Point
                  </span>
                </div>
                <span className="text-xs font-medium text-neutral-400 mt-0.5 flex items-center gap-1.5">
                  <span className="text-neutral-300">रिलायन्स स्मार्ट पॉइंट</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-[#C5A47E] font-semibold">Sion West</span>
                </span>
              </div>
            </div>
          </div>

          {/* Location selector button */}
          <button
            id="location-picker-button"
            type="button"
            onClick={() => setShowLocationModal(true)}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-left"
          >
            <MapPin className="w-4 h-4 text-red-500 shrink-0" />
            <div className="text-xs leading-tight">
              <p className="text-neutral-400 font-normal">Store Location</p>
              <p className="text-neutral-200 font-semibold truncate max-w-[170px]">
                Opp. Guru Kripa, Sion
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 ml-1" />
          </button>

          {/* Search bar for products */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="header-grocery-search"
                type="text"
                placeholder="Search daily groceries, vegetables, milk, atta, oil..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (activeTab !== 'catalog') {
                    onNavigateTab('catalog');
                  }
                }}
                className="w-full pl-10 pr-4 py-2 bg-white/5 focus:bg-white/10 border border-white/10 focus:border-[#C5A47E] rounded-lg text-sm text-neutral-100 placeholder:text-neutral-500 outline-hidden transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Live Busyness Trigger */}
            <button
              id="live-busyness-nav-button"
              type="button"
              onClick={() => onNavigateTab('popular-times')}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-950/50 text-emerald-300 border border-emerald-800/40 text-xs font-semibold hover:bg-emerald-900/60 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>LIVE: Not Busy</span>
            </button>

            {/* Cart Button with Sophisticated Dark Styling */}
            <button
              id="open-cart-drawer-button"
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-sm transition-all shadow-md hover:shadow-red-900/30 border border-red-500/50"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-[#C5A47E] text-black text-xs px-1.5 py-0.5 rounded-full font-black">
                  {totalCartCount}
                </span>
              )}
              {totalCartPrice > 0 && (
                <span className="hidden sm:inline text-xs font-bold border-l border-red-400/50 pl-2 text-white">
                  ₹{totalCartPrice}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-3 sm:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="mobile-grocery-search"
              type="text"
              placeholder="Search groceries, vegetables, atta..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activeTab !== 'catalog') {
                  onNavigateTab('catalog');
                }
              }}
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-neutral-100 placeholder:text-neutral-500 outline-hidden focus:border-[#C5A47E]"
            />
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0e0e0e] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/15 text-neutral-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  Store Location
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Serving Sion West and surrounding Mumbai neighbourhoods
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowLocationModal(false)}
                className="text-neutral-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm font-semibold text-white">{STORE_DETAILS.name}</p>
              <p className="text-xs text-neutral-300 mt-1">{STORE_DETAILS.address.full}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-neutral-400">
                <span className="font-mono bg-black/50 px-2 py-0.5 rounded border border-white/10 text-[#C5A47E]">
                  {STORE_DETAILS.address.plusCode}
                </span>
                <span>• Sion Station West (350m)</span>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Express delivery active for PIN codes: 400022, 400019, 400037</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLocationModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#C5A47E] text-black font-bold hover:bg-[#d5b58e] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
