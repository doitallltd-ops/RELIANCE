import { useState, type FormEvent } from 'react';
import { Edit3, CheckCircle2 } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData';

interface SuggestEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuggestEditModal({ isOpen, onClose }: SuggestEditModalProps) {
  const [topic, setTopic] = useState('hours');
  const [suggestion, setSuggestion] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSuggestion('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-[#0e0e0e] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/15 text-[#F0F0F0]">
        
        <div className="flex items-start justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-[#C5A47E]" />
            <h4 className="serif text-base font-normal text-white">Suggest an edit</h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#C5A47E] mx-auto" />
            <h5 className="serif text-base font-normal text-white">Suggestion Submitted</h5>
            <p className="text-xs text-neutral-400">
              Thank you for contributing to keeping the Reliance Smart Point Sion West listing accurate!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
            <p className="text-neutral-400">
              Suggest changes for <strong className="text-neutral-200">{STORE_DETAILS.name}</strong> (Sion West).
            </p>

            <div>
              <label className="block font-medium text-neutral-300 mb-1">What would you like to edit?</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-white/10 bg-white/5 text-white outline-hidden focus:border-[#C5A47E]"
              >
                <option value="hours" className="bg-[#121212] text-white">Store Hours or Holiday Schedule</option>
                <option value="address" className="bg-[#121212] text-white">Address, Landmark or Entrance Location</option>
                <option value="phone" className="bg-[#121212] text-white">Contact Number or WhatsApp Order line</option>
                <option value="services" className="bg-[#121212] text-white">Delivery Radius or Wheelchair Amenities</option>
                <option value="other" className="bg-[#121212] text-white">Other Information</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-neutral-300 mb-1">Your suggested changes or details</label>
              <textarea
                rows={3}
                required
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="e.g. On Ganesh Chaturthi or Diwali, store opens early at 6:30 AM..."
                className="w-full p-2.5 rounded-lg border border-white/10 bg-white/5 outline-hidden focus:border-[#C5A47E] text-white placeholder:text-neutral-500"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-300 mb-1">Your Email (Optional for updates)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full p-2.5 rounded-lg border border-white/10 bg-white/5 outline-hidden focus:border-[#C5A47E] text-white placeholder:text-neutral-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#C5A47E] hover:bg-[#d5b58e] text-black font-bold shadow-sm"
              >
                Submit Suggestion
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
