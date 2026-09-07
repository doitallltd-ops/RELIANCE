import { 
  Store, 
  ShoppingBag, 
  BarChart3, 
  Star, 
  Info 
} from 'lucide-react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
}

export function NavigationTabs({ activeTab, onTabChange, cartCount }: NavigationTabsProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Store },
    { id: 'catalog', label: 'Menu & Groceries', icon: ShoppingBag, badge: cartCount > 0 ? `${cartCount}` : undefined },
    { id: 'popular-times', label: 'Popular Times', icon: BarChart3, liveBadge: true },
    { id: 'reviews', label: 'Reviews (1,794)', icon: Star },
    { id: 'info', label: 'Hours & About', icon: Info },
  ];

  return (
    <div className="bg-[#080808]/95 border-b border-white/10 sticky top-[73px] z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-8 overflow-x-auto no-scrollbar py-2" aria-label="Store Sections">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center gap-2 py-2.5 px-3 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-all rounded-t-lg
                  ${
                    isActive
                      ? 'border-[#C5A47E] text-[#C5A47E] bg-white/5 font-semibold'
                      : 'border-transparent text-neutral-400 hover:text-neutral-100 hover:border-white/20 hover:bg-white/5'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A47E]' : 'text-neutral-500'}`} />
                <span>{tab.label}</span>

                {tab.liveBadge && (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-950/80 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-700/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    LIVE
                  </span>
                )}

                {tab.badge && (
                  <span className="text-[10px] font-extrabold bg-[#C5A47E] text-black px-1.5 py-0.2 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
