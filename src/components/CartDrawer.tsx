import { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 12;
  const grandTotal = subtotal + shippingCost;

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      const orderId = `VX-${Math.floor(1000 + Math.random() * 9000)}`;
      setIsCheckingOut(false);
      setOrderComplete(orderId);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#ffffff] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#ebebeb] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold tracking-tight-heading text-[#000000]">
                Shopping Bag
              </h2>
              <span className="text-sm text-[#787574] tabular-nums">
                ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#787574] hover:text-[#000000] hover:bg-[#f2f4f5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderComplete ? (
              <div className="text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight-heading">
                  Order Confirmed
                </h3>
                <p className="text-sm text-[#787574] leading-relaxed">
                  Thank you! Your order <span className="font-semibold text-black">{orderComplete}</span> has been routed to the artisan ateliers and is preparing for dispatch.
                </p>
                <div className="p-4 bg-[#f2f4f5] rounded-[20px] text-xs text-left space-y-2 mt-4">
                  <div className="flex justify-between font-medium">
                    <span>Delivery Status</span>
                    <span className="text-[#5433eb]">Express Insured</span>
                  </div>
                  <div className="flex justify-between text-[#787574]">
                    <span>Tracking Number</span>
                    <span className="font-mono">VX-TRK-98102</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOrderComplete(null);
                    onClose();
                  }}
                  className="w-full py-3 px-6 bg-[#000000] text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors mt-6"
                >
                  Continue Shopping
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="w-16 h-16 rounded-[28px] bg-[#f2f4f5] text-[#787574] mx-auto flex items-center justify-center text-xl font-bold">
                  VX
                </div>
                <h3 className="text-lg font-semibold tracking-tight-heading">
                  Your bag is empty
                </h3>
                <p className="text-sm text-[#787574]">
                  Explore the floating constellation to curate objects for your space.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 py-2.5 px-6 rounded-full bg-[#000000] text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
                >
                  Browse Curations
                </button>
              </div>
            ) : (
              <>
                {/* Free shipping status bar */}
                <div className="p-4 bg-[#f2f4f5] rounded-[20px] space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#000000] font-medium">
                      {subtotal >= freeShippingThreshold
                        ? '🎉 You unlocked complimentary express delivery'
                        : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for free delivery`}
                    </span>
                    <span className="text-[#787574] tabular-nums font-semibold">
                      {Math.round(progressToFreeShipping)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#ebebeb] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#5433eb] transition-all duration-300 rounded-full"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>

                {/* Items list */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 rounded-[20px] bg-white border border-[#ebebeb] shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-[14px] object-cover bg-[#f2f4f5] shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-xs font-semibold text-[#787574] uppercase tracking-wider">
                                {item.product.brand}
                              </h4>
                              <h3 className="text-sm font-semibold text-[#000000] line-clamp-1">
                                {item.product.name}
                              </h3>
                            </div>
                            <span className="text-sm font-semibold tabular-nums text-[#000000]">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          {item.selectedVariant && (
                            <p className="text-[11px] text-[#787574] mt-0.5">
                              {item.selectedVariant}
                            </p>
                          )}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between mt-2 pt-1">
                          <div className="flex items-center border border-[#ebebeb] rounded-full px-2 py-0.5 gap-2 bg-[#f2f4f5]/60">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="text-[#787574] hover:text-[#000000] p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold tabular-nums min-w-[14px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="text-[#787574] hover:text-[#000000] p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[#787574] hover:text-red-500 p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && !orderComplete && (
            <div className="p-6 border-t border-[#ebebeb] bg-white space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#787574]">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#000000]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#787574]">
                  <span>Insured Shipping</span>
                  <span className="tabular-nums font-medium text-[#000000]">
                    {shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#000000] pt-2 border-t border-[#ebebeb]">
                  <span>Total</span>
                  <span className="tabular-nums">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button in Shop Violet */}
              <button
                disabled={isCheckingOut}
                onClick={handleSimulateCheckout}
                className="w-full py-3.5 px-6 rounded-full bg-[#5433eb] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-vexora-violet hover:bg-[#4524db] active:scale-98 transition-all cursor-pointer disabled:opacity-60"
              >
                {isCheckingOut ? (
                  <span>Processing Checkout...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#787574]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>30-Day Curated Guarantee · Encrypted 256-bit Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
