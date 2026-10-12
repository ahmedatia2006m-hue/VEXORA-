import { Star, ArrowUpRight } from 'lucide-react';
import { Product } from '../data/products';

interface ProductTypeHeroProps {
  product: Product;
  onSelect: (product: Product) => void;
  titleOverride?: string;
  subtitleOverride?: string;
}

export function ProductTypeHero({
  product,
  onSelect,
  titleOverride,
  subtitleOverride,
}: ProductTypeHeroProps) {
  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative w-full h-[360px] sm:h-[420px] rounded-[28px] overflow-hidden cursor-pointer shadow-vexora-card hover:shadow-vexora-hover transition-all duration-300 bg-[#332f2d] select-none"
    >
      {/* Full-bleed product image */}
      <img
        src={product.image}
        alt={product.name}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Measured contrast scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

      {/* Brand name and star rating overlay directly on image at top-left */}
      <div className="absolute top-6 left-6 right-6">
        <span className="text-[11px] font-semibold tracking-wider text-white/80 uppercase">
          Featured Brand Atelier
        </span>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight-heading text-white mt-1">
          {titleOverride || product.brand}
        </h3>

        {/* Star rating and review count in 14px white */}
        <div className="flex items-center gap-2 text-[14px] text-white mt-2">
          <div className="flex items-center text-white">
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-medium">{product.rating}</span>
          <span className="text-white/70">· {product.reviewsCount} verified reviews</span>
        </div>
      </div>

      {/* Bottom CTA affordance */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
        <div className="max-w-md">
          <p className="text-[13px] text-white/90 line-clamp-2 leading-relaxed">
            {subtitleOverride || product.description}
          </p>
          <div className="mt-2 text-white font-medium text-[15px] tabular-nums">
            From ${product.price}
          </div>
        </div>

        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-lg group-hover:bg-[#5433eb] group-hover:text-white transition-colors">
          <ArrowUpRight className="w-5 h-5 stroke-[2]" />
        </div>
      </div>
    </div>
  );
}
