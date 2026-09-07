import { useState } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle, Clock, Zap, Users, Info } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData';
import { HourlyBusyness } from '../types';

export function PopularTimesCard() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // 0 = Mondays (matching screenshot 12345.png)
  const [hoveredHour, setHoveredHour] = useState<HourlyBusyness | null>(null);
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);

  const currentDayData = STORE_DETAILS.popularTimes[selectedDayIndex];

  const handlePrevDay = () => {
    setSelectedDayIndex((prev) => (prev === 0 ? STORE_DETAILS.popularTimes.length - 1 : prev - 1));
  };

  const handleNextDay = () => {
    setSelectedDayIndex((prev) => (prev === STORE_DETAILS.popularTimes.length - 1 ? 0 : prev + 1));
  };

  // Find the live or selected hour
  const liveHour = currentDayData.hours.find((h) => h.isCurrentLiveHour) || currentDayData.hours[6]; // 12p
  const displayedHour = hoveredHour || liveHour;

  return (
    <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-5 sm:p-6 shadow-2xl text-[#F0F0F0]">
      
      {/* Header: Title, Day Selector, Help Icon */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <h3 className="serif text-lg font-normal text-white flex items-center gap-2">
            Popular times
          </h3>

          {/* Interactive Day Dropdown */}
          <div className="relative">
            <select
              id="popular-times-day-select"
              value={selectedDayIndex}
              onChange={(e) => setSelectedDayIndex(Number(e.target.value))}
              aria-label="Select day for popular times"
              className="appearance-none bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-sm font-semibold text-neutral-200 cursor-pointer outline-hidden transition-colors focus:border-[#C5A47E]"
            >
              {STORE_DETAILS.popularTimes.map((day, idx) => (
                <option key={day.dayName} value={idx} className="bg-[#121212] text-white">
                  {day.dayName}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Day Navigation arrows */}
          <button
            type="button"
            onClick={handlePrevDay}
            className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            title="Previous Day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextDay}
            className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            title="Next Day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowHelpTooltip(!showHelpTooltip)}
              className="p-1.5 text-neutral-500 hover:text-neutral-300 transition-colors"
              title="About Popular Times"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            {showHelpTooltip && (
              <div className="absolute right-0 top-8 z-30 w-64 p-3 bg-[#161616] border border-white/15 text-neutral-200 rounded-xl text-xs shadow-2xl leading-relaxed">
                Popular times and visit durations are calculated using anonymized Google location history and footfall sensors.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Status indicator directly from screenshot 12345.png */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-red-950 text-red-400 border border-red-800/60 text-[10px] font-black px-2 py-0.5 rounded tracking-wide uppercase">
            LIVE
          </span>
          <span className="text-sm font-medium text-neutral-200 italic">
            Not too busy
          </span>
        </div>

        {/* Dynamic inspection display */}
        <div className="text-xs text-neutral-400 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
          <span className="font-bold text-white">
            {displayedHour.hour > 12 ? `${displayedHour.hour - 12} PM` : `${displayedHour.hour} AM`}
          </span>
          <span className="text-neutral-600 mx-1.5">•</span>
          <span className={displayedHour.busynessPercent > 80 ? 'text-red-400 font-semibold' : 'text-emerald-400 font-semibold'}>
            {displayedHour.crowdLevel} ({displayedHour.busynessPercent}% capacity)
          </span>
        </div>
      </div>

      {/* Graph Area replicating Google Maps visual style */}
      <div className="mt-6 pt-2 pb-2">
        
        {/* The Bar Chart Container */}
        <div className="relative h-36 flex items-end justify-between gap-1 sm:gap-2 px-1 border-b border-white/10">
          {/* Subtle horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-dashed border-neutral-700 w-full"></div>
            <div className="border-b border-dashed border-neutral-700 w-full"></div>
            <div className="border-b border-dashed border-neutral-700 w-full"></div>
          </div>

          {currentDayData.hours.map((item) => {
            const isLive = item.isCurrentLiveHour;
            const isHovered = hoveredHour?.hour === item.hour;
            const heightPercent = Math.max(12, item.busynessPercent);

            return (
              <div
                key={item.hour}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                onMouseEnter={() => setHoveredHour(item)}
                onMouseLeave={() => setHoveredHour(null)}
                onClick={() => setHoveredHour(item)}
              >
                {/* Bar */}
                <div
                  className="w-full max-w-[20px] rounded-t-sm transition-all duration-200 relative overflow-hidden"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: isLive ? '#e11d48' : isHovered ? '#C5A47E' : '#2a949e',
                  }}
                >
                  {/* For the live hour: ghost cap representing the standard vs live difference */}
                  {isLive && (
                    <div className="absolute top-0 inset-x-0 h-1/4 bg-white/30 border-b border-white/40"></div>
                  )}
                </div>

                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute bottom-full mb-2 z-20 bg-[#1a1a1a] border border-white/20 text-white text-[11px] py-1 px-2.5 rounded shadow-xl whitespace-nowrap pointer-events-none">
                    <p className="font-bold text-[#C5A47E]">{item.hour > 12 ? `${item.hour - 12} PM` : `${item.hour} AM`}</p>
                    <p>{item.crowdLevel}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* X-axis Labels matching 6a, 9a, 12p, 3p, 6p, 9p from screenshot */}
        <div className="flex justify-between text-xs text-neutral-500 pt-2 px-2 font-mono">
          <span>6a</span>
          <span>9a</span>
          <span className="font-bold text-[#C5A47E]">12p</span>
          <span>3p</span>
          <span>6p</span>
          <span>9p</span>
        </div>
      </div>

      {/* Summary Footer Notes */}
      <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C5A47E]" />
          <span className="text-neutral-300">{currentDayData.typicalWaitDescription}</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <Zap className="w-4 h-4 text-[#C5A47E] shrink-0" />
          <span>{currentDayData.peakHourDescription}</span>
        </div>
      </div>

      {/* Pro-tip banner */}
      <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-neutral-300">
        <Info className="w-4 h-4 text-[#C5A47E] shrink-0 mt-0.5" />
        <p>
          <span className="font-bold text-[#C5A47E]">Smart Shopper Tip:</span> Fresh vegetables arrive from local agricultural mandis daily between 7:30 AM – 9:00 AM. Visit during early morning hours for top freshness with zero queue.
        </p>
      </div>

    </div>
  );
}
