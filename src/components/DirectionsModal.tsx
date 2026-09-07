import { Navigation, Train, Bus, Car, ExternalLink } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DirectionsModal({ isOpen, onClose }: DirectionsModalProps) {
  if (!isOpen) return null;

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE_DETAILS.address.full)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-[#0e0e0e] rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-white/15 space-y-5 text-[#F0F0F0]">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="serif text-lg font-normal text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#C5A47E]" />
              Directions to Reliance Smart Point
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Sindhi Society, Sion West, Mumbai (Opposite Guru Kripa Hotel)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Address callout */}
        <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 text-xs space-y-1">
          <p className="font-semibold text-white">Exact Address:</p>
          <p className="text-neutral-300">{STORE_DETAILS.address.full}</p>
          <p className="text-neutral-500 font-mono pt-1">Plus Code: {STORE_DETAILS.address.plusCode}</p>
        </div>

        {/* Transit Modes */}
        <div className="space-y-3 text-xs">
          
          <div className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-start gap-3">
            <div className="p-2 rounded-lg bg-sky-950/60 text-sky-400 border border-sky-800/40 shrink-0">
              <Train className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">By Local Train (Central Railway)</p>
              <p className="text-neutral-400 mt-0.5">
                Alight at <strong className="text-neutral-200">Sion Railway Station</strong> (Platform 1 side / West). Walk 350 meters westward past the station market towards Guru Kripa Hotel. Approximate walking time: <strong className="text-[#C5A47E]">4–5 minutes</strong>.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-start gap-3">
            <div className="p-2 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-800/40 shrink-0">
              <Bus className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">By BEST Bus</p>
              <p className="text-neutral-400 mt-0.5">
                Take any bus halting at <strong className="text-neutral-200">Guru Kripa / Sion Circle / Sion Hospital stop</strong> (Bus nos. 7, 25, 302, 341, C-40, 504). Store is right across the street.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Driving & Parking</p>
              <p className="text-neutral-400 mt-0.5">
                Enter via Sindhi Society lane from Ambedkar Road / Guru Kripa Chowk. Dedicated two-wheeler parking available immediately outside the storefront.
              </p>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-white/10 text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/5"
          >
            Close
          </button>
          <a
            id="launch-google-maps-directions"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-[#C5A47E] hover:bg-[#d5b58e] text-black text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}
