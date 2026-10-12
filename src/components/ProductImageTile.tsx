import { Star } from 'lucide-react';
import { Product } from '../data/products';

interface ProductImageTileProps {
  product: Product;
  onSelect: (product: Product) => void;
  aspect?: 'tall' | 'wide' | 'square';
}

export function ProductImageTile({
  product,
  onSelect,
  aspect = 'tall',
}: ProductImageTileProps) {
  const aspectClass =
    aspect === 'tall'
      ? 'aspect-[3/4]'
      : aspect === 'wide'
      ? 'aspect-[16/10]'
      : 'aspect-square';

  return (
    <div
      onClick={() => onSelect(product)}
      className={`group relative ${aspectClass} w-full rounded-[28px] overflow-hidden cursor-pointer shadow-vexora-card hover:shadow-vexora-hover transition-all duration-300 bg-[#f2f4f5]`}
    >
      {/* Tall or wide image filling entire card with zero internal padding */}
      <img
        src={product.image}
        alt={product.name}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Subtle top rating indicator */}
      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1">
        <Star className="w-2.5 h-2.5 fill-current text-white" />
        <span>{product.rating}</span>
      </div>

      {/* Semi-transparent white label box at bottom-left */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-[85%]">
        <div className="bg-white/95 backdrop-blur-md rounded-[12px] p-3 text-[#000000] shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[14px] font-semibold tracking-tight-subheading truncate">
              {product.name}
            </span>
            <span className="text-[13px] tabular-nums font-semibold shrink-0">
              ${product.price}
            </span>
          </div>
          <p className="text-[11px] text-[#787574] truncate">
            {product.brand} · {product.categoryLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
