import { Star, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../data/products';

interface BrandSpotlightCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isSaved?: boolean;
  onToggleSave?: (productId: string) => void;
}

export function BrandSpotlightCard({
  product,
  onSelect,
  onAddToCart,
  isSaved = false,
  onToggleSave,
}: BrandSpotlightCardProps) {
  const isDark = product.isDarkSurface;

  // Mini thumbnail swatches
  const thumbnails = [
    product.image,
    '/src/assets/images/vexora_botanical_serum_1791776120076.jpg',
    '/src/assets/images/vexora_scandi_lounge_1791776132525.jpg',
  ].slice(0, 3);

  return (
    <div
      className={`group relative rounded-[28px] ${
        isDark ? 'bg-[#332f2d] text-white' : 'bg-[#ffffff] text-[#000000]'
      } p-3 shadow-vexora-card hover:shadow-vexora-hover transition-all duration-300 flex flex-col justify-between`}
    >
      {/* Top area: 1:1 image with 20px inner radius */}
      <div
        onClick={() => onSelect(product)}
        className="relative aspect-square w-full rounded-[20px] overflow-hidden bg-[#f2f4f5] cursor-pointer mb-3"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick Save button */}
        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(product.id);
            }}
            aria-label={isSaved ? 'Remove from saved' : 'Save item'}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#000000] hover:bg-white shadow-xs transition-colors"
          >
            <Heart
              className={`w-4 h-4 ${
                isSaved ? 'fill-[#5433eb] text-[#5433eb]' : 'text-[#787574]'
              }`}
            />
          </button>
        )}

        {product.badge && (
          <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-[#000000] text-[9px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
            {product.badge}
          </div>
        )}
      </div>

      {/* Brand name and details */}
      <div className="px-1 mb-2">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span
            onClick={() => onSelect(product)}
            className="text-[14px] font-semibold tracking-tight-subheading truncate cursor-pointer hover:underline"
          >
            {product.brand}
          </span>
          <span className="text-[13px] tabular-nums font-semibold shrink-0">
            ${product.price}
          </span>
        </div>

        <p
          onClick={() => onSelect(product)}
          className={`text-[12px] truncate cursor-pointer mb-2 ${
            isDark ? 'text-[#acb0aa]' : 'text-[#787574]'
          }`}
        >
          {product.name}
        </p>

        {/* Star rating and review count in 9px caption */}
        <div className="flex items-center gap-1.5 text-[9px] tracking-tight-caption mb-3">
          <div className="flex items-center text-[#5433eb]">
            <Star className="w-2.5 h-2.5 fill-current" />
            <Star className="w-2.5 h-2.5 fill-current" />
            <Star className="w-2.5 h-2.5 fill-current" />
            <Star className="w-2.5 h-2.5 fill-current" />
            <Star className="w-2.5 h-2.5 fill-current" />
          </div>
          <span className={isDark ? 'text-[#acb0aa]' : 'text-[#787574]'}>
            {product.rating} ({product.reviewsCount})
          </span>
        </div>

        {/* Mini Product Thumbnail Strip: row of small images at 48px square with 12px radius */}
        <div className="flex items-center gap-1.5 pt-1 border-t border-black/5 dark:border-white/5">
          {thumbnails.map((thumb, idx) => (
            <div
              key={idx}
              className="w-10 h-10 rounded-[12px] overflow-hidden bg-neutral-100 ring-1 ring-black/5 shrink-0"
            >
              <img
                src={thumb}
                alt="Product swatch"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <span className={`text-[10px] ml-auto ${isDark ? 'text-[#acb0aa]' : 'text-[#787574]'}`}>
            {product.variants?.length ? `${product.variants.length} styles` : 'Curated'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-2 pt-1 flex items-center gap-2">
        <button
          onClick={() => onAddToCart(product)}
          className="flex-1 py-2 px-3 bg-[#f2f4f5] hover:bg-[#ebebeb] text-[#000000] text-[12px] font-medium rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
}
