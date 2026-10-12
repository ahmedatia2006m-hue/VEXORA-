import { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, MapPin, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedVariant?: string) => void;
  isSaved?: boolean;
  onToggleSave?: (productId: string) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  isSaved = false,
  onToggleSave,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants?.[0] || 'Default Edition'
  );
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog with 28px radius */}
      <div className="relative w-full max-w-4xl bg-white rounded-[28px] overflow-hidden shadow-2xl z-10 my-auto text-[#000000]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#787574] hover:text-[#000000] shadow-sm hover:scale-105 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Imagery with 20px inner radius container */}
          <div className="p-4 sm:p-6 bg-[#f2f4f5] flex items-center justify-center">
            <div className="relative aspect-square w-full rounded-[20px] overflow-hidden bg-white shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#000000] text-[10px] font-semibold px-3 py-1 rounded-full shadow-xs">
                  {product.badge}
                </div>
              )}
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand and Provenance */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold tracking-wider text-[#787574] uppercase">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-xs text-[#787574]">
                  <MapPin className="w-3.5 h-3.5 text-[#5433eb]" />
                  <span>{product.merchantLocation}</span>
                </div>
              </div>

              <h2 className="text-2xl font-semibold tracking-tight-heading text-[#000000] mb-3">
                {product.name}
              </h2>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-[#5433eb]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-sm font-semibold">{product.rating}</span>
                <span className="text-xs text-[#787574]">
                  ({product.reviewsCount} verified reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-semibold tabular-nums text-[#000000]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[#787574] line-through tabular-nums">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description & Story */}
              <p className="text-sm text-[#787574] leading-relaxed mb-4">
                {product.description}
              </p>

              <div className="p-3.5 bg-[#f2f4f5] rounded-[16px] text-xs text-[#000000] mb-6">
                <p className="font-medium mb-1">Craftsmanship Note</p>
                <p className="text-[#787574] leading-normal">{product.story}</p>
              </div>

              {/* Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2 mb-6">
                  <label className="text-xs font-semibold text-[#000000] uppercase tracking-wider">
                    Select Edition
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVariant(v)}
                        className={`py-2 px-3.5 rounded-full text-xs font-medium transition-all ${
                          selectedVariant === v
                            ? 'bg-[#000000] text-white shadow-xs'
                            : 'bg-[#f2f4f5] text-[#000000] hover:bg-[#ebebeb]'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA & Trust badges */}
            <div className="space-y-4 pt-4 border-t border-[#ebebeb]">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#5433eb] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-vexora-violet hover:bg-[#4524db] active:scale-98 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedNotice ? 'Added to Bag ✓' : 'Add to Bag'}</span>
                </button>

                {onToggleSave && (
                  <button
                    onClick={() => onToggleSave(product.id)}
                    aria-label="Save to Wishlist"
                    className="w-12 h-12 rounded-full border border-[#ebebeb] flex items-center justify-center text-[#000000] hover:bg-[#f2f4f5] transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isSaved ? 'fill-[#5433eb] text-[#5433eb]' : 'text-[#787574]'
                      }`}
                    />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#787574] pt-2">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#5433eb]" />
                  <span>Insured Express Shipping</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#5433eb]" />
                  <span>Complimentary 30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
