import { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Percent, 
  Tag, 
  ArrowUpDown 
} from 'lucide-react';
import { Product, CartItem } from '../types';
import { GROCERY_PRODUCTS, PRODUCT_CATEGORIES } from '../data/storeData';

interface CatalogSectionProps {
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCart: () => void;
}

export function CatalogSection({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  searchQuery,
  onSearchChange,
  onOpenCart,
}: CatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'discount'>('recommended');
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  // Map cart quantities for O(1) lookup
  const cartQuantities = useMemo(() => {
    const map = new Map<string, number>();
    cartItems.forEach((item) => map.set(item.product.id, item.quantity));
    return map;
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartValue = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return GROCERY_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory === 'Low Price Deals' && !product.isSmartOffer) {
        return false;
      } else if (selectedCategory !== 'All Items' && selectedCategory !== 'Low Price Deals' && product.category !== selectedCategory) {
        return false;
      }

      // Only discounted filter
      if (onlyDiscounted && product.discountPercentage < 15) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesHindi = product.hindiName?.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        return matchesName || matchesHindi || matchesCategory || matchesDesc;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, onlyDiscounted, searchQuery, sortBy]);

  return (
    <div id="store-catalog-section" className="space-y-6">
      
      {/* Banner matching the screenshot "+Quick / Shop All" Header */}
      <div className="bg-[#0d0d0d] text-white rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-2xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-950 text-red-400 border border-red-800/60 text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">
                Menu & Catalog
              </span>
              <span className="text-neutral-400 text-xs font-medium">In-Store & Delivery Stock</span>
            </div>
            <h2 className="serif text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-[#F0F0F0]">
              Daily Grocery & Fresh Produce
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Compare wholesale MRP with Reliance Smart Point discounted prices. Enjoy daily mandi fresh rates delivered directly to your doorstep in Sion.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {totalCartCount > 0 && (
              <button
                type="button"
                onClick={onOpenCart}
                className="px-4 py-2.5 bg-[#C5A47E] hover:bg-[#d5b58e] text-black rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Cart ({totalCartCount} items • ₹{totalCartValue})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Categories Bar */}
      <div className="bg-[#0d0d0d] rounded-xl border border-white/10 p-4 space-y-4 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all
                  ${
                    isSelected
                      ? 'bg-[#C5A47E] text-black shadow-sm font-bold'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                  }
                `}
              >
                {cat === 'Low Price Deals' && '🔥 '}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search, Filter Toggles & Sort Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div className="flex-1 min-w-[200px] max-w-sm">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="catalog-filter-search"
                type="text"
                placeholder="Filter by name, vegetable, brand..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-neutral-100 placeholder:text-neutral-500 outline-hidden focus:border-[#C5A47E] focus:bg-white/10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Deals Toggle */}
            <button
              type="button"
              onClick={() => setOnlyDiscounted(!onlyDiscounted)}
              className={`
                px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors
                ${
                  onlyDiscounted
                    ? 'bg-[#C5A47E]/20 border-[#C5A47E] text-[#C5A47E] font-semibold'
                    : 'border-white/10 text-neutral-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <Percent className="w-3.5 h-3.5 text-[#C5A47E]" />
              <span>Big Discounts Only</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-neutral-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-transparent font-medium cursor-pointer outline-hidden text-xs text-neutral-200"
              >
                <option value="recommended" className="bg-[#121212] text-white">Featured</option>
                <option value="price-asc" className="bg-[#121212] text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-[#121212] text-white">Price: High to Low</option>
                <option value="discount" className="bg-[#121212] text-white">Highest Discount</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 p-12 text-center text-neutral-400">
          <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-neutral-200">No items match your search</h3>
          <p className="text-xs text-neutral-500 mt-1">Try clearing filters or search for another grocery staple.</p>
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              setSelectedCategory('All Items');
              setOnlyDiscounted(false);
            }}
            className="mt-4 px-4 py-2 bg-[#C5A47E] text-black text-xs font-bold rounded-lg hover:bg-[#d5b58e]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const quantity = cartQuantities.get(product.id) || 0;
            const savings = product.mrp - product.price;

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-[#0d0d0d] rounded-2xl border border-white/10 hover:border-[#C5A47E]/40 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-black/50 group"
              >
                {/* Product Image & Badges */}
                <div className="relative bg-[#050505] aspect-4/3 w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    loading="lazy"
                  />

                  {/* Veg Indicator Symbol */}
                  <div className="absolute top-2.5 left-2.5 w-4 h-4 border border-emerald-500 bg-black/80 flex items-center justify-center rounded-xs shadow-xs" title="100% Vegetarian">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  </div>

                  {/* Discount percentage tag */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-2.5 right-2.5 bg-red-950 text-red-400 border border-red-800/60 font-black text-[10px] px-2 py-0.5 rounded-md shadow-sm">
                      {product.discountPercentage}% OFF
                    </div>
                  )}

                  {/* Product Tag */}
                  {product.tag && (
                    <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-xs text-[#C5A47E] text-[9px] font-bold px-2 py-0.5 rounded-sm border border-white/10">
                      {product.tag}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-neutral-500 block mb-0.5">
                      {product.weightOrVolume}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-neutral-100 leading-snug line-clamp-2">
                      {product.name}
                    </h4>
                    {product.hindiName && (
                      <p className="text-[11px] text-neutral-400 font-medium mt-0.5">
                        {product.hindiName}
                      </p>
                    )}
                  </div>

                  {/* Pricing & Add to Cart */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-end justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm sm:text-base font-bold text-white">
                          ₹{product.price}
                        </span>
                        {product.mrp > product.price && (
                          <span className="text-xs text-neutral-500 line-through">
                            ₹{product.mrp}
                          </span>
                        )}
                      </div>
                      {savings > 0 && (
                        <p className="text-[10px] text-emerald-400 font-semibold">
                          Save ₹{savings}
                        </p>
                      )}
                    </div>

                    {/* Add / Quantity Button */}
                    <div>
                      {quantity === 0 ? (
                        <button
                          id={`add-product-btn-${product.id}`}
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="px-3.5 py-1.5 rounded-lg border border-[#C5A47E] text-[#C5A47E] hover:bg-[#C5A47E] hover:text-black font-bold text-xs transition-all shadow-xs"
                        >
                          ADD
                        </button>
                      ) : (
                        <div className="flex items-center rounded-lg bg-[#C5A47E] text-black font-extrabold text-xs shadow-xs overflow-hidden">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            className="p-1.5 hover:bg-[#d5b58e] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            className="p-1.5 hover:bg-[#d5b58e] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom delivery note */}
      <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-[#C5A47E]" />
          <span>
            <strong className="text-neutral-200">Reliance One Club Loyalty:</strong> Earn 1 Point for every ₹100 spent at checkout.
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenCart}
          className="text-[#C5A47E] font-semibold hover:underline"
        >
          View Current Shopping Cart ({totalCartCount}) →
        </button>
      </div>

    </div>
  );
}
