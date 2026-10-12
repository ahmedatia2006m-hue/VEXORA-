import { ChevronRight } from 'lucide-react';

interface CategorySectionHeaderProps {
  title: string;
  count?: number;
  onExplore?: () => void;
  onScrollRight?: () => void;
  showScrollControl?: boolean;
}

export function CategorySectionHeader({
  title,
  count,
  onExplore,
  onScrollRight,
  showScrollControl = true,
}: CategorySectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left-aligned 20px GTStandard-MSemibold at -1.0px tracking in ink-black, followed by a 16px chevron */}
      <button
        onClick={onExplore}
        className="group flex items-center gap-2 text-[20px] font-semibold text-[#000000] tracking-tight-heading hover:opacity-80 transition-opacity text-left cursor-pointer"
      >
        <span>{title}</span>
        {count !== undefined && (
          <span className="text-[14px] text-[#787574] font-normal">({count})</span>
        )}
        <ChevronRight className="w-4 h-4 text-[#000000] stroke-[2] transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Category Carousel Arrow: Circular 32px white button with 0 4px 24px rgba(0,0,0,0.12) shadow */}
      {showScrollControl && onScrollRight && (
        <button
          onClick={onScrollRight}
          aria-label="Scroll right"
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#000000] shadow-vexora-carousel hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#ebebeb]/50"
        >
          <ChevronRight className="w-4 h-4 text-[#000000] stroke-[2]" />
        </button>
      )}
    </div>
  );
}
