import { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  Globe, 
  Phone, 
  Share2, 
  Navigation, 
  ShoppingBag, 
  CheckCircle2, 
  Accessibility, 
  ExternalLink, 
  Edit3, 
  Copy, 
  Check, 
  Camera, 
  Sparkles 
} from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData';

interface StoreHeroProps {
  onOpenDirections: () => void;
  onOpenSuggestEdit: () => void;
  onNavigateTab: (tab: string) => void;
}

export function StoreHero({
  onOpenDirections,
  onOpenSuggestEdit,
  onNavigateTab,
}: StoreHeroProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [showPhotoGalleryModal, setShowPhotoGalleryModal] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(STORE_DETAILS.address.full);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: STORE_DETAILS.name + ' - Sion West',
        text: 'Visit Reliance Smart Point supermarket in Sion West, Mumbai. Fresh veggies, daily groceries, and live store times.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  return (
    <div className="bg-[#050505] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        
        {/* Top Store Visual Banner & Storefront Showcase */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a] mb-6">
          {/* Main Visual: Storefront replica inspired by screenshot 123.PNG */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full bg-[#050505] overflow-hidden">
            {/* Background image representing the vibrant grocery supermarket */}
            <img
              src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1600&auto=format&fit=crop&q=80"
              alt="Reliance Smart Point Supermarket Aisles & Storefront"
              className="w-full h-full object-cover object-center opacity-40 filter brightness-90"
            />
            
            {/* Dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent"></div>

            {/* Storefront Signage Overlay - Faithfully echoing the red awning from Image 123.PNG */}
            <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 bg-gradient-to-r from-red-700/90 to-red-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-white shadow-lg border border-red-500/40">
                <span className="font-bold tracking-wider text-xs uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C5A47E] animate-ping"></span>
                  रिलायन्स SMART POINT
                </span>
                <span className="text-xs text-red-200 border-l border-red-500/60 pl-2">Sion Store #482</span>
              </div>

              <button
                id="see-photos-button"
                type="button"
                onClick={() => setShowPhotoGalleryModal(true)}
                className="flex items-center gap-2 bg-black/70 hover:bg-black/90 text-neutral-200 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border border-white/20 shadow-md"
              >
                <Camera className="w-3.5 h-3.5 text-[#C5A47E]" />
                <span>See 28 Photos</span>
              </button>
            </div>

            {/* Banner bottom details over the image */}
            <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#C5A47E]/15 border border-[#C5A47E]/40 text-[#C5A47E] font-medium text-xs mb-2 backdrop-blur-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="tracking-wide">Verified Supermarket Listing</span>
                </div>
                <h1 className="serif text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#F0F0F0] drop-shadow-md">
                  {STORE_DETAILS.name}
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 mt-1 flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-red-400">{STORE_DETAILS.brandNameHindi}</span>
                  <span className="text-neutral-600">•</span>
                  <span>{STORE_DETAILS.category}</span>
                  <span className="text-neutral-600">•</span>
                  <span className="inline-flex items-center gap-1 text-neutral-400">
                    <Accessibility className="w-4 h-4 text-sky-400" /> Wheelchair Accessible
                  </span>
                </p>
              </div>

              {/* Rating pill right inside the banner */}
              <div className="flex items-center gap-3 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl shadow-2xl shrink-0">
                <div className="flex flex-col items-center justify-center border-r border-white/10 pr-3">
                  <span className="text-2xl font-bold text-white">{STORE_DETAILS.overallRating}</span>
                  <div className="flex text-[#C5A47E] text-xs mt-0.5">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A47E] text-[#C5A47E]" />
                    ))}
                    <Star className="w-3.5 h-3.5 text-[#C5A47E]" />
                  </div>
                </div>
                <div className="text-xs">
                  <p className="font-bold text-neutral-200">1,794 Google Reviews</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Neighbourhood Supermarket</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid directly reflecting screenshot 1234.PNG */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Key Info (Address, Hours, Delivery, Plus Code) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Delivery status card */}
            <div className="p-4 rounded-xl bg-[#0d0d0d] border border-emerald-900/40 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/50 flex items-center justify-center shadow-xs">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                    Delivery Available
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                      Express 30 Mins
                    </span>
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Order online directly from this store for home delivery in Sion West & surrounding areas.
                  </p>
                </div>
              </div>
              <button
                id="hero-order-delivery-button"
                type="button"
                onClick={() => onNavigateTab('catalog')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C5A47E] hover:bg-[#d5b58e] text-black text-xs font-bold transition-colors shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Shop Menu</span>
              </button>
            </div>

            {/* Essential Store Details list (matching 1234.PNG) */}
            <div className="bg-[#0d0d0d] rounded-xl p-4 sm:p-5 border border-white/10 space-y-3.5">
              
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1 text-sm">
                  <p className="text-neutral-100 font-medium leading-relaxed">
                    {STORE_DETAILS.address.full}
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Landmark: <span className="text-neutral-200">{STORE_DETAILS.address.landmark}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="shrink-0 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors text-xs flex items-center gap-1"
                  title="Copy complete address"
                >
                  {copiedAddress ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </span>
                  )}
                </button>
              </div>

              {/* Hours */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#C5A47E] shrink-0" />
                  <div className="text-sm">
                    <span className="font-bold text-emerald-400">Open</span>
                    <span className="text-neutral-300 font-medium"> • Closes 10 pm</span>
                    <span className="text-xs text-neutral-500 ml-2">(Mon–Sun 7:00 AM – 10:00 PM)</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateTab('info')}
                  className="text-xs text-[#C5A47E] hover:text-[#e0c6a5] font-semibold"
                >
                  View All Hours
                </button>
              </div>

              {/* Website */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-sky-400 shrink-0" />
                  <a
                    href="https://storelocator.ril.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-neutral-300 hover:text-[#C5A47E] transition-colors flex items-center gap-1.5"
                  >
                    <span>storelocator.ril.com</span>
                    <ExternalLink className="w-3 h-3 text-neutral-500" />
                  </a>
                </div>
                <span className="text-[11px] text-neutral-500 font-medium">Official Reliance Portal</span>
              </div>

              {/* Plus Code */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center text-neutral-400 font-mono font-bold text-xs">
                    ❖
                  </div>
                  <div className="text-sm font-mono text-[#C5A47E] font-medium">
                    {STORE_DETAILS.address.plusCode}
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE_DETAILS.address.plusCode)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-400 hover:text-white font-semibold underline underline-offset-4"
                >
                  Map Plus Code
                </a>
              </div>
            </div>

            {/* Quick Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                id="hero-directions-button"
                type="button"
                onClick={onOpenDirections}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C5A47E] hover:bg-[#d5b58e] text-black text-xs font-bold transition-all shadow-md"
              >
                <Navigation className="w-4 h-4 fill-black" />
                <span>Directions</span>
              </button>

              <a
                id="hero-call-store-link"
                href="tel:+912224078899"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-neutral-200 text-xs font-semibold transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Store</span>
              </a>

              <button
                id="hero-live-times-button"
                type="button"
                onClick={() => onNavigateTab('popular-times')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/50 border border-red-800/40 text-red-300 hover:bg-red-900/60 text-xs font-semibold transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#C5A47E]" />
                <span>Check Live Rush</span>
              </button>

              <button
                id="hero-suggest-edit-button"
                type="button"
                onClick={onOpenSuggestEdit}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-medium transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Suggest an edit</span>
              </button>

              <button
                id="hero-share-button"
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-medium transition-all ml-auto"
                title="Share store info"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{shareSuccess ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Grocery Highlights & Quick Order Promo */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Quick Delivery Order Card */}
            <div className="bg-gradient-to-br from-[#161616] to-[#0c0c0c] border border-[#C5A47E]/30 text-white rounded-2xl p-5 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#C5A47E]/10 rounded-full blur-xl"></div>
              <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold mb-2">
                <span className="tracking-widest uppercase text-[10px] text-[#C5A47E]">DAILY PROMOTION</span>
                <span className="bg-[#C5A47E] text-black font-extrabold px-2 py-0.5 rounded text-[10px]">
                  UP TO 50% OFF
                </span>
              </div>
              <h3 className="serif text-xl font-light text-white leading-tight">
                Fresh Mandi Arrivals & Smart Deals
              </h3>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Shop farm-fresh vegetables, dairy, pulses, and pantry essentials directly at wholesale prices.
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <p className="text-[#C5A47E] font-bold text-xs">Nashik Onions</p>
                  <p className="text-white text-sm font-bold">₹24 / kg</p>
                  <span className="text-[10px] text-neutral-500 line-through">MRP ₹45</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <p className="text-[#C5A47E] font-bold text-xs">Hybrid Tomatoes</p>
                  <p className="text-white text-sm font-bold">₹22 / kg</p>
                  <span className="text-[10px] text-neutral-500 line-through">MRP ₹40</span>
                </div>
              </div>

              <button
                id="hero-browse-smart-deals-button"
                type="button"
                onClick={() => onNavigateTab('catalog')}
                className="w-full mt-4 py-2.5 bg-[#C5A47E] hover:bg-[#d5b58e] text-black font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse Full Store Catalog</span>
              </button>
            </div>

            {/* Store Amenities Snapshot */}
            <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-4 space-y-2.5">
              <h4 className="text-xs font-semibold text-[#C5A47E] uppercase tracking-wider">
                Store Amenities
              </h4>
              <ul className="text-xs space-y-2 text-neutral-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Instant UPI & Card checkout counters</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Direct elevator/ramp wheelchair accessibility</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Ample two-wheeler parking outside Galaxy Supermarket</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Reliance One loyalty club point redemption</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {showPhotoGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-[#0e0e0e] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-white/15">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Reliance Smart Point - Store Photos</h3>
                <p className="text-xs text-neutral-400">Sion West, Mumbai • Customer & Storefront Views</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPhotoGalleryModal(false)}
                className="text-neutral-400 hover:text-white p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <img
                  src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80"
                  alt="Store Front & Aisles"
                  className="rounded-xl h-48 w-full object-cover border border-white/10 shadow-sm"
                />
                <p className="text-xs font-medium text-neutral-300">Clean, well-lit supermarket grocery aisles</p>
              </div>
              <div className="space-y-2">
                <img
                  src="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop&q=80"
                  alt="Fresh Vegetables"
                  className="rounded-xl h-48 w-full object-cover border border-white/10 shadow-sm"
                />
                <p className="text-xs font-medium text-neutral-300">Fresh vegetables section (Daily Mandi arrivals)</p>
              </div>
              <div className="space-y-2">
                <img
                  src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80"
                  alt="Staples & Grains"
                  className="rounded-xl h-48 w-full object-cover border border-white/10 shadow-sm"
                />
                <p className="text-xs font-medium text-neutral-300">Atta, Rice, Pulses and Grains aisle</p>
              </div>
              <div className="space-y-2">
                <img
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop&q=80"
                  alt="Dairy Counter"
                  className="rounded-xl h-48 w-full object-cover border border-white/10 shadow-sm"
                />
                <p className="text-xs font-medium text-neutral-300">Refrigerated Dairy & Chilled Goods counter</p>
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-black/40 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPhotoGalleryModal(false)}
                className="px-4 py-2 bg-[#C5A47E] text-black rounded-lg text-xs font-bold hover:bg-[#d5b58e]"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
