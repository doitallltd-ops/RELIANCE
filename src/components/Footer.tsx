import { Phone, Globe } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenDirections: () => void;
}

export function Footer({ onNavigateTab, onOpenDirections }: FooterProps) {
  return (
    <footer className="bg-[#050505] text-neutral-400 text-xs border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Store info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C5A47E] text-black font-extrabold text-sm flex items-center justify-center shadow-sm">
                R✦
              </div>
              <span className="serif text-white font-normal text-base tracking-wide">
                Reliance SMART Point
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-md font-light">
              Sindhi Society, 2/2, Galaxy Supermarket, Opposite Guru Kripa Hotel, Sion West, Mumbai, Maharashtra 400022. Serving local households with daily farm produce, dairy, groceries, and staples.
            </p>
            <div className="flex items-center gap-4 text-xs pt-1">
              <span className="text-neutral-300 font-mono">Plus Code: {STORE_DETAILS.address.plusCode}</span>
              <span className="text-neutral-600">•</span>
              <span className="text-[#C5A47E] font-medium">Open Daily 7 AM – 10 PM</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-[#C5A47E] font-semibold uppercase tracking-widest text-[10px] mb-3">
              Store Directory
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('overview')}
                  className="hover:text-white transition-colors"
                >
                  Store Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('catalog')}
                  className="hover:text-white transition-colors"
                >
                  Menu & Daily Groceries
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('popular-times')}
                  className="hover:text-[#C5A47E] transition-colors font-medium text-neutral-300"
                >
                  Live Crowd Traffic & Times
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('reviews')}
                  className="hover:text-white transition-colors"
                >
                  Customer Reviews (1,794)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDirections}
                  className="hover:text-white transition-colors"
                >
                  Directions from Sion Station
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-[#C5A47E] font-semibold uppercase tracking-widest text-[10px] mb-3">
              Contact & Hours
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A47E] shrink-0" />
                <a href="tel:+912224078899" className="hover:text-white transition-colors">
                  +91 22 2407 8899
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#C5A47E] shrink-0" />
                <a
                  href="https://storelocator.ril.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  storelocator.ril.com
                </a>
              </li>
              <li className="text-[11px] text-neutral-500 pt-1">
                Toll Free Reliance Support: 1800 891 0001
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Reliance Smart Point, Sion West. Supermarket & Grocery Store.</p>
          <div className="flex items-center gap-2">
            <span>Air Conditioned • Wheelchair Accessible • Express Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
