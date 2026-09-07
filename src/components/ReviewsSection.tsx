import { useState, type FormEvent } from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquarePlus, Search } from 'lucide-react';
import { STORE_DETAILS, STORE_REVIEWS } from '../data/storeData';
import { StoreReview } from '../types';

export function ReviewsSection() {
  const [reviews, setReviews] = useState<StoreReview[]>(STORE_REVIEWS);
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [searchReviewText, setSearchReviewText] = useState('');
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newContent, setNewContent] = useState('');
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());

  const handleLike = (id: string) => {
    setLikedReviews((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;

    const created: StoreReview = {
      id: 'user-rev-' + Date.now(),
      author: newAuthor.trim(),
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      relativeTime: 'Just now',
      content: newContent.trim(),
      likes: 0,
      userAvatarBg: 'bg-red-800',
      verifiedCustomer: true,
    };

    setReviews([created, ...reviews]);
    setNewAuthor('');
    setNewContent('');
    setNewRating(5);
    setShowAddReviewModal(false);
  };

  const filteredReviews = reviews.filter((r) => {
    if (selectedStarFilter !== null && r.rating !== selectedStarFilter) {
      return false;
    }
    if (searchReviewText.trim()) {
      const q = searchReviewText.toLowerCase();
      return r.content.toLowerCase().includes(q) || r.author.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-5 sm:p-7 shadow-2xl space-y-6 text-[#F0F0F0]">
      
      {/* Title & Review Summary Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="serif text-xl font-normal text-white">Customer Reviews & Ratings</h3>
            <span className="text-[10px] bg-white/5 border border-white/10 text-[#C5A47E] font-semibold px-2 py-0.5 rounded-full">
              Google Maps Verified
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Ratings for Reliance Smart Point, Galaxy Supermarket, Sion West
          </p>
        </div>

        <button
          id="write-review-open-button"
          type="button"
          onClick={() => setShowAddReviewModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C5A47E] hover:bg-[#d5b58e] text-black text-xs font-bold transition-all shadow-md shrink-0 self-start md:self-auto"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Ratings Overview Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white/5 p-5 rounded-xl border border-white/10">
        {/* Big Number */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center md:border-r border-white/10 pr-0 md:pr-4">
          <span className="text-5xl font-bold text-white leading-none">
            {STORE_DETAILS.overallRating}
          </span>
          <div className="flex text-[#C5A47E] mt-2">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-5 h-5 fill-[#C5A47E] text-[#C5A47E]" />
            ))}
            <Star className="w-5 h-5 text-[#C5A47E]" />
          </div>
          <p className="text-xs font-medium text-neutral-400 mt-1">
            Based on {STORE_DETAILS.totalReviews.toLocaleString()} reviews
          </p>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="md:col-span-8 space-y-1.5 text-xs">
          {[
            { stars: 5, pct: 54, count: 968 },
            { stars: 4, pct: 24, count: 430 },
            { stars: 3, pct: 11, count: 198 },
            { stars: 2, pct: 6, count: 108 },
            { stars: 1, pct: 5, count: 90 },
          ].map((bar) => (
            <button
              key={bar.stars}
              type="button"
              onClick={() => setSelectedStarFilter(selectedStarFilter === bar.stars ? null : bar.stars)}
              className={`w-full flex items-center gap-2.5 py-1 px-2 rounded-md hover:bg-white/5 transition-colors text-left ${
                selectedStarFilter === bar.stars ? 'bg-white/10 font-bold' : ''
              }`}
            >
              <span className="w-6 font-medium text-neutral-300">{bar.stars} ★</span>
              <div className="flex-1 bg-neutral-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#C5A47E] h-full rounded-full"
                  style={{ width: `${bar.pct}%` }}
                />
              </div>
              <span className="w-12 text-right text-neutral-500 text-[11px] font-mono">{bar.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedStarFilter(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedStarFilter === null ? 'bg-[#C5A47E] text-black font-bold' : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            All ({reviews.length})
          </button>
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setSelectedStarFilter(star)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                selectedStarFilter === star ? 'bg-[#C5A47E] text-black font-bold' : 'bg-white/5 text-neutral-300 hover:bg-white/10'
              }`}
            >
              <span>{star}</span>
              <Star className="w-3 h-3 fill-current text-[#C5A47E]" />
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search in reviews..."
              value={searchReviewText}
              onChange={(e) => setSearchReviewText(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-neutral-100 placeholder:text-neutral-500 outline-hidden focus:border-[#C5A47E]"
            />
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4 pt-2">
        {filteredReviews.map((rev) => {
          const isLiked = likedReviews.has(rev.id);
          return (
            <div
              key={rev.id}
              className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors space-y-2.5 bg-[#121212]"
            >
              {/* Author header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${rev.userAvatarBg} text-white font-bold text-xs flex items-center justify-center border border-white/10`}>
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-neutral-100">{rev.author}</span>
                      {rev.localGuideLevel && (
                        <span className="text-[10px] bg-[#C5A47E]/20 text-[#C5A47E] font-semibold px-1.5 py-0.2 rounded border border-[#C5A47E]/30">
                          Local Guide • Level {rev.localGuideLevel}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                      <span>{rev.relativeTime}</span>
                      {rev.verifiedCustomer && (
                        <span className="text-emerald-400 flex items-center gap-0.5 font-medium">
                          <CheckCircle className="w-3 h-3" /> Verified Shopper
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex text-[#C5A47E]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-3.5 h-3.5 ${
                        idx < rev.rating ? 'fill-[#C5A47E] text-[#C5A47E]' : 'text-neutral-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {rev.content}
              </p>

              {/* Footer actions */}
              <div className="flex items-center gap-4 pt-1 text-xs text-neutral-500">
                <button
                  type="button"
                  onClick={() => handleLike(rev.id)}
                  className={`flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-white/5 transition-colors ${
                    isLiked ? 'text-[#C5A47E] font-bold' : 'text-neutral-400'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#C5A47E] text-[#C5A47E]' : ''}`} />
                  <span>Helpful ({rev.likes + (isLiked ? 1 : 0)})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Write a Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-[#0e0e0e] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-white/15 text-[#F0F0F0]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="serif text-base font-normal text-white">
                Review Reliance Smart Point, Sion
              </h4>
              <button
                type="button"
                onClick={() => setShowAddReviewModal(false)}
                className="text-neutral-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-medium text-neutral-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-white/5 outline-hidden focus:border-[#C5A47E] text-white placeholder:text-neutral-500"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-[#C5A47E] text-[#C5A47E]' : 'text-neutral-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-semibold text-neutral-300 ml-2">{newRating} of 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">Your Feedback</label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Tell others about vegetable freshness, billing wait times, staff courtesy, or parking..."
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-white/5 outline-hidden focus:border-[#C5A47E] text-white placeholder:text-neutral-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="px-4 py-2 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C5A47E] hover:bg-[#d5b58e] text-black font-bold shadow-sm"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
