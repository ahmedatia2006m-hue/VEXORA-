import { useState, useId } from 'react';
import { ArrowRight, Star, Sparkles, X } from 'lucide-react';
import { Product, CATEGORIES } from '../data/products';

interface HeroConstellationProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
  onSearchSubmit?: () => void;
}

export function HeroConstellation({
  products,
  onSelectProduct,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onSearchSubmit,
}: HeroConstellationProps) {
  const searchInputId = useId();
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Take the 4 signature items for the floating constellation
  const constellationItems = products.slice(0, 4);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <section className="relative w-full max-w-[1200px] mx-auto pt-10 sm:pt-14 pb-16 px-4 sm:px-6">
      {/* Subtle floating background ambient elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#ffffff]/70 via-[#f2f4f5] to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      {/* 1. FLOATING SHOPPING CONSTELLATION OVER WORDMARK */}
      <div className="relative min-h-[380px] sm:min-h-[420px] flex items-center justify-center mb-8">
        {/* The 4 floating product cards in an organic, overlapping constellation */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-items-center">
          {constellationItems.map((product, idx) => {
            // Asymmetric floating offsets for genuine constellation feel
            const offsetClasses = [
              'md:-translate-y-6 md:-rotate-1',
              'md:translate-y-4 md:rotate-1.5',
              'md:-translate-y-4 md:rotate-[-1.5deg]',
              'md:translate-y-6 md:rotate-1',
            ][idx % 4];

            const isDark = product.isDarkSurface;

            return (
              <button
                key={product.id}
                onClick={() => onSelectProduct(product)}
                onMouseEnter={() => setHoveredCardId(product.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`group relative text-left w-full max-w-[210px] sm:max-w-[230px] rounded-[28px] ${
                  isDark ? 'bg-[#332f2d] text-white' : 'bg-[#ffffff] text-[#000000]'
                } p-2.5 sm:p-3 shadow-vexora-card hover:shadow-vexora-hover transition-all duration-300 ease-out transform ${offsetClasses} hover:translate-y-[-10px] hover:scale-[1.03] active:scale-98 cursor-pointer z-10`}
              >
                {/* 1:1 Product Image with 20px inner radius */}
                <div className="relative aspect-square w-full rounded-[20px] overflow-hidden bg-[#f2f4f5] mb-2.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[#000000] text-[9px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Card metadata below */}
                <div className="px-1 pb-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span
                      className={`text-[13px] sm:text-[14px] font-semibold truncate tracking-tight-subheading ${
                        isDark ? 'text-white' : 'text-[#000000]'
                      }`}
                    >
                      {product.brand}
                    </span>
                    <span className="text-[12px] tabular-nums font-semibold opacity-90 shrink-0">
                      ${product.price}
                    </span>
                  </div>

                  <p
                    className={`text-[11px] truncate mb-1.5 ${
                      isDark ? 'text-[#acb0aa]' : 'text-[#787574]'
                    }`}
                  >
                    {product.name}
                  </p>

                  {/* 5-star rating row in 9px caption */}
                  <div className="flex items-center gap-1.5 text-[9px] tracking-tight-caption">
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
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. CENTERED WORDMARK WITH SIGNATURE SHOP VIOLET DOT */}
      <div className="text-center mb-8">
        <div className="inline-flex items-baseline justify-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.05em] text-[#000000] select-none">
            vexora
          </h1>
          {/* Saturated shop violet dot (#5433eb) */}
          <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#5433eb] ml-1.5 inline-block shadow-sm" />
        </div>
        <p className="mt-2 text-sm sm:text-base text-[#787574] tracking-tight-body">
          Floating shopping constellation on white marble
        </p>
      </div>

      {/* 3. SEARCH INPUT WITH VIOLET SUBMIT */}
      <div className="max-w-2xl mx-auto mb-10">
        <form
          onSubmit={handleFormSubmit}
          className="relative flex items-center bg-[#ffffff] rounded-full border border-black/10 shadow-xs hover:border-black/20 focus-within:border-[#5433eb]/40 focus-within:ring-2 focus-within:ring-[#5433eb]/10 transition-all p-1 pl-5 sm:pl-6"
        >
          <label htmlFor={searchInputId} className="sr-only">
            Search products, brands, or curations
          </label>
          <input
            id={searchInputId}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What are you shopping for today?"
            className="w-full bg-transparent text-[16px] text-[#000000] placeholder-[#787574] focus:outline-none tracking-tight-body pr-4"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="p-1 mr-2 text-[#787574] hover:text-[#000000] rounded-full"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* 48px Circular Violet (#5433eb) Submit Button with Tinted Shadow */}
          <button
            type="submit"
            aria-label="Submit search"
            className="w-12 h-12 rounded-full bg-[#5433eb] text-white flex items-center justify-center shrink-0 shadow-vexora-violet hover:bg-[#4524db] active:scale-95 transition-transform cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </form>
      </div>

      {/* 4. CATEGORY PILLS ROW */}
      <div className="flex items-center justify-center gap-2.5 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 rounded-full py-2 pl-2 pr-4 transition-all duration-200 border whitespace-nowrap text-[15px] sm:text-[16px] tracking-tight-body shadow-vexora-pill cursor-pointer ${
                isSelected
                  ? 'bg-[#ffffff] border-[#5433eb] ring-1 ring-[#5433eb] text-[#000000]'
                  : 'bg-[#ffffff] border-[#ebebeb] hover:border-[#cccccc] text-[#000000]'
              }`}
            >
              {/* 16px circular category icon in its native color */}
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: cat.iconColor }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>

              <span className="font-normal">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
