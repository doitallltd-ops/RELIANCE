import { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Phone, 
  CreditCard, 
  Sparkles, 
  Edit3,
  Check,
  Navigation
} from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData';

interface StoreInfoSectionProps {
  onOpenDirections: () => void;
  onOpenSuggestEdit: () => void;
}

export function StoreInfoSection({
  onOpenDirections,
  onOpenSuggestEdit,
}: StoreInfoSectionProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(STORE_DETAILS.address.plusCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 text-[#F0F0F0]">
      
      {/* Operating Hours Table */}
      <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-5 sm:p-7 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-[#C5A47E]" />
            <div>
              <h3 className="serif font-normal text-base text-white">Operating Hours</h3>
              <p className="text-xs text-neutral-400">Open 7 Days a Week</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
            Open Today • Closes 10:00 PM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {STORE_DETAILS.hours.weeklySchedule.map((item) => (
            <div
              key={item.day}
              className={`flex items-center justify-between p-2.5 rounded-lg transition-colors ${
                item.isToday
                  ? 'bg-white/5 font-semibold text-white border border-[#C5A47E]/40'
                  : 'text-neutral-400 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{item.day}</span>
                {item.isToday && (
                  <span className="text-[10px] bg-[#C5A47E] text-black px-1.5 py-0.2 rounded font-bold">
                    Today
                  </span>
                )}
              </div>
              <span className="font-mono text-neutral-300">{item.hours}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Location & Reachability Details */}
      <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-5 sm:p-7 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="serif font-normal text-base text-white">Address & Landmark</h3>
              <p className="text-xs text-neutral-400">Sion West, Mumbai, Maharashtra</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenDirections}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C5A47E] hover:bg-[#d5b58e] text-black rounded-lg text-xs font-bold transition-colors shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </button>
            <button
              type="button"
              onClick={onOpenSuggestEdit}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-white/10 hover:bg-white/5 rounded-lg text-xs font-medium text-neutral-300 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Suggest an edit</span>
            </button>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white font-medium text-sm leading-relaxed">
              {STORE_DETAILS.address.full}
            </p>
            <p className="text-neutral-400 mt-1">
              Prominent Landmark: <strong className="text-[#C5A47E]">Directly opposite Guru Kripa Hotel</strong> (Iconic Sion Sindhi landmark)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between">
              <div>
                <p className="text-neutral-500 text-[11px]">Google Plus Code</p>
                <p className="font-mono font-bold text-neutral-200">{STORE_DETAILS.address.plusCode}</p>
              </div>
              <button
                type="button"
                onClick={handleCopyPlusCode}
                className="text-xs text-[#C5A47E] hover:underline font-semibold p-1"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : 'Copy'}
              </button>
            </div>

            <div className="p-3 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between">
              <div>
                <p className="text-neutral-500 text-[11px]">Customer Support & Orders</p>
                <a href="tel:+912224078899" className="font-bold text-[#C5A47E] hover:underline">
                  {STORE_DETAILS.phone}
                </a>
              </div>
              <Phone className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Serviced Delivery Pin Codes */}
        <div className="pt-2">
          <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
            Local Sion Delivery Radius (Within 35 Mins)
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {['Sion West (400022)', 'Sindhi Society', 'GTB Nagar (400037)', 'Matunga East (400019)', 'Chunabhatti', 'Pratiksha Nagar'].map((loc) => (
              <span key={loc} className="px-2.5 py-1 bg-white/5 border border-white/10 text-neutral-300 rounded-md font-medium">
                📍 {loc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modes & Supermarket Amenities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Payment options */}
        <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-5 shadow-2xl space-y-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#C5A47E]" />
            <h4 className="serif font-normal text-sm text-white">Accepted Payment Methods</h4>
          </div>
          <ul className="text-xs space-y-2 text-neutral-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A47E]"></span>
              <span><strong>UPI:</strong> Google Pay, PhonePe, Paytm, BHIM (QR at all counters)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A47E]"></span>
              <span><strong>Cards:</strong> Visa, MasterCard, RuPay, Amex</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A47E]"></span>
              <span><strong>Meal Vouchers:</strong> Sodexo / Pluxee Meal Cards & Edenred</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A47E]"></span>
              <span><strong>Cash:</strong> Cash on Delivery & Cash at counter</span>
            </li>
          </ul>
        </div>

        {/* Store Highlights */}
        <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-5 shadow-2xl space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A47E]" />
            <h4 className="serif font-normal text-sm text-white">Customer Benefits</h4>
          </div>
          <ul className="text-xs space-y-2 text-neutral-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A47E]"></span>
              <span><strong>Reliance One:</strong> Earn loyalty points on every bill</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A47E]"></span>
              <span><strong>Hassle-free Returns:</strong> 7-day exchange with purchase receipt</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A47E]"></span>
              <span><strong>Air Conditioned:</strong> Fully air-conditioned comfort shopping</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A47E]"></span>
              <span><strong>Wheelchair Ramp:</strong> Barrier-free ground entrance access</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}
