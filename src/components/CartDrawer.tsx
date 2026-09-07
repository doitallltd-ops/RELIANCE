import { useState, type FormEvent } from 'react';
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Tag, 
  ArrowRight,
  Truck,
  Store,
  Sparkles
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
}: CartDrawerProps) {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('SMART50');
  const [couponError, setCouponError] = useState('');
  const [address, setAddress] = useState('Flat 402, Sindhi Society, Sion West');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  // Calculation metrics
  const itemsTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalMrp = cartItems.reduce((acc, item) => acc + item.product.mrp * item.quantity, 0);
  const storeDiscount = totalMrp - itemsTotal;
  const freeDeliveryThreshold = 199;
  const deliveryFee = deliveryType === 'pickup' || itemsTotal >= freeDeliveryThreshold ? 0 : 30;

  // Coupon discount
  let couponDiscount = 0;
  if (appliedCoupon === 'SMART50') {
    couponDiscount = itemsTotal >= 250 ? 50 : 0;
  }

  const finalTotal = Math.max(0, itemsTotal + deliveryFee - couponDiscount);
  const totalSavings = storeDiscount + couponDiscount + (itemsTotal >= freeDeliveryThreshold ? 30 : 0);

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'SMART50') {
      if (itemsTotal < 250) {
        setCouponError('Requires minimum order of ₹250');
        return;
      }
      setAppliedCoupon('SMART50');
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try SMART50');
    }
  };

  const handlePlaceOrder = () => {
    const generatedId = 'RSP-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderPlaced(true);
  };

  const handleOrderDone = () => {
    setOrderPlaced(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d0d0d] border-l border-white/10 shadow-2xl flex flex-col justify-between text-[#F0F0F0]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#080808] text-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C5A47E]" />
              <div>
                <h3 className="serif font-normal text-base leading-none">Your Grocery Basket</h3>
                <p className="text-[11px] text-neutral-400 mt-1">Reliance Smart Point • Sion West</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            
            {orderPlaced ? (
              /* Order Confirmation Screen */
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 bg-[#C5A47E]/20 border border-[#C5A47E]/40 text-[#C5A47E] rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C5A47E] bg-[#C5A47E]/10 px-2.5 py-1 rounded-full border border-[#C5A47E]/30">
                    Order Confirmed
                  </span>
                  <h3 className="serif text-xl font-light text-white mt-2">
                    Thank You For Your Order!
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Order ID: <span className="font-mono font-bold text-[#C5A47E]">{orderId}</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-xs space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-neutral-400">Delivery Address:</span>
                    <span className="font-semibold text-neutral-200 text-right max-w-[200px] truncate">{address}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-neutral-400">Estimated Arrival:</span>
                    <span className="font-bold text-emerald-400">30–40 Minutes</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-neutral-400">Amount to Pay (COD/UPI):</span>
                    <span className="font-bold text-white text-sm">₹{finalTotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#C5A47E] font-semibold">
                    <span>Total Smart Savings:</span>
                    <span>₹{totalSavings}</span>
                  </div>
                </div>

                {/* Progress Step */}
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/40 text-left text-xs space-y-1">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>Store team is packing fresh stock</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">
                    Fresh produce packed under strict hygiene at Sion West store. Delivery partner will notify via SMS.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOrderDone}
                  className="w-full py-3 rounded-xl bg-[#C5A47E] hover:bg-[#d5b58e] text-black font-bold text-sm shadow-lg transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-14 h-14 text-neutral-600 mx-auto" />
                <h4 className="text-base font-bold text-neutral-200">Your basket is empty</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Add fresh vegetables, dairy milk, atta, oil, and daily staples to begin your order.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#C5A47E] text-black text-xs font-bold hover:bg-[#d5b58e] transition-all shadow-sm"
                >
                  Explore Store Items
                </button>
              </div>
            ) : (
              /* Active Cart Items */
              <>
                {/* Free Delivery Bar */}
                {deliveryType === 'delivery' && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                    {itemsTotal < freeDeliveryThreshold ? (
                      <div>
                        <div className="flex justify-between text-neutral-300 font-medium">
                          <span>Add <strong className="text-[#C5A47E]">₹{freeDeliveryThreshold - itemsTotal}</strong> more for <strong>FREE Delivery</strong></span>
                          <span className="text-neutral-500 text-[11px]">Threshold: ₹199</span>
                        </div>
                        <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div
                            className="bg-[#C5A47E] h-full rounded-full transition-all"
                            style={{ width: `${Math.min(100, (itemsTotal / freeDeliveryThreshold) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Yay! You've unlocked FREE Home Delivery 🎉</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Delivery Mode Toggle */}
                <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      deliveryType === 'delivery'
                        ? 'bg-[#C5A47E] text-black shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Home Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      deliveryType === 'pickup'
                        ? 'bg-[#C5A47E] text-black shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Store Pickup (No Queue)</span>
                  </button>
                </div>

                {/* Delivery address / Pickup info */}
                {deliveryType === 'delivery' ? (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-neutral-200 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        Delivering to Sion West
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                        30–45 Mins
                      </span>
                    </div>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter flat / society / landmark..."
                      className="w-full text-xs p-2 rounded-lg border border-white/10 bg-black/40 text-neutral-100 outline-hidden focus:border-[#C5A47E]"
                    />
                  </div>
                ) : (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-neutral-300 space-y-1">
                    <p className="font-bold text-[#C5A47E] flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5 text-[#C5A47E]" />
                      Pick up at: Reliance Smart Point, Sion West
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      Opp. Guru Kripa Hotel, Sindhi Society. Show your order ID at the priority pickup counter.
                    </p>
                  </div>
                )}

                {/* Cart Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    <span>Items ({cartItems.length})</span>
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-neutral-500 hover:text-red-400 transition-colors font-medium text-[11px]"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="divide-y divide-white/10">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="py-2.5 flex items-center justify-between gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-black shrink-0 border border-white/10"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-semibold text-neutral-100 truncate">
                            {item.product.name}
                          </h5>
                          <p className="text-[11px] text-neutral-400">
                            {item.product.weightOrVolume} • ₹{item.product.price}
                          </p>
                          <span className="text-[10px] text-emerald-400 font-semibold">
                            Saving ₹{(item.product.mrp - item.product.price) * item.quantity}
                          </span>
                        </div>

                        {/* Quantity Controller */}
                        <div className="flex items-center rounded-lg border border-white/10 bg-white/5 shadow-2xs overflow-hidden shrink-0">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1.5 hover:bg-white/10 text-neutral-300 transition-colors"
                            aria-label="Reduce quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1.5 hover:bg-white/10 text-neutral-300 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Coupon Box */}
                <div className="pt-2">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#C5A47E]" />
                        <div>
                          <p className="font-bold">Code '{appliedCoupon}' Applied</p>
                          <p className="text-[11px] text-neutral-400">₹{couponDiscount} Smart Discount saved</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAppliedCoupon(null)}
                        className="text-red-400 hover:text-red-300 text-xs font-bold underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Coupon Code (e.g. SMART50)"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1 text-xs px-3 py-2 rounded-lg border border-white/10 bg-black/40 text-white uppercase outline-hidden focus:border-[#C5A47E]"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-[#C5A47E] text-black rounded-lg text-xs font-bold hover:bg-[#d5b58e]"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-red-400">{couponError}</p>
                      )}
                      <p className="text-[10px] text-neutral-500">
                        Use code <strong className="text-[#C5A47E]">SMART50</strong> for ₹50 off on orders ₹250+
                      </p>
                    </form>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <h6 className="font-bold text-[#C5A47E] uppercase tracking-wider text-[11px]">
                    Bill Summary
                  </h6>
                  <div className="flex justify-between text-neutral-400">
                    <span>Total MRP</span>
                    <span className="line-through text-neutral-600">₹{totalMrp}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Store Price Discount</span>
                    <span>- ₹{storeDiscount}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${deliveryFee}`}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-[#C5A47E] font-semibold">
                      <span>Promo Coupon</span>
                      <span>- ₹{couponDiscount}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-sm font-bold text-white">
                    <span>Grand Total</span>
                    <span className="text-base text-white">₹{finalTotal}</span>
                  </div>
                  <div className="p-2 bg-[#C5A47E]/10 border border-[#C5A47E]/30 rounded-lg text-[#C5A47E] font-bold text-center text-[11px]">
                    🎉 You are saving ₹{totalSavings} on this order!
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Footer with Checkout CTA */}
          {!orderPlaced && cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-white/10 bg-[#080808]">
              <button
                id="place-order-button"
                type="button"
                onClick={handlePlaceOrder}
                className="w-full py-3.5 rounded-xl bg-[#C5A47E] hover:bg-[#d5b58e] text-black font-bold text-sm flex items-center justify-between px-5 shadow-xl transition-all"
              >
                <div className="text-left">
                  <p className="text-[11px] text-neutral-700 font-semibold leading-none">To Pay</p>
                  <p className="text-base font-extrabold text-black">₹{finalTotal}</p>
                </div>
                <div className="flex items-center gap-1.5 font-bold">
                  <span>{deliveryType === 'delivery' ? 'Place Delivery Order' : 'Confirm Store Pickup'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
              <p className="text-center text-[10px] text-neutral-500 mt-2">
                Cash on Delivery, UPI (GPay/PhonePe), and Sodexo Cards accepted at door.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
