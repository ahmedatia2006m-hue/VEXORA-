import { Compass, Search, Heart, ShoppingBag } from 'lucide-react';

interface SidebarNavRailProps {
  activeTab: 'discover' | 'browse' | 'saved' | 'cart';
  setActiveTab: (tab: 'discover' | 'browse' | 'saved' | 'cart') => void;
  cartCount: number;
  savedCount: number;
  onOpenProfile: () => void;
}

export function SidebarNavRail({
  activeTab,
  setActiveTab,
  cartCount,
  savedCount,
  onOpenProfile,
}: SidebarNavRailProps) {
  const navItems = [
    {
      id: 'discover' as const,
      label: 'Discover',
      icon: Compass,
      count: 0,
    },
    {
      id: 'browse' as const,
      label: 'Explore Catalog',
      icon: Search,
      count: 0,
    },
    {
      id: 'saved' as const,
      label: 'Saved Items',
      icon: Heart,
      count: savedCount,
    },
    {
      id: 'cart' as const,
      label: 'Shopping Bag',
      icon: ShoppingBag,
      count: cartCount,
    },
  ];

  return (
    <>
      {/* Desktop Left Rail: 64px wide, #ffffff, no border */}
      <aside className="hidden lg:flex fixed left-0 top-12 bottom-0 w-16 bg-[#ffffff] flex-col items-center justify-between py-6 z-30 select-none">
        {/* Top App Icon / Discover */}
        <div className="flex flex-col items-center gap-3 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={item.label}
                className="relative group w-12 h-12 flex items-center justify-center transition-transform active:scale-95"
              >
                {/* 48px square tappable area with 20px radius on active/hover */}
                <div
                  className={`w-12 h-12 rounded-[20px] flex items-center justify-center transition-colors ${
                    isActive ? 'bg-[#f2f4f5]' : 'hover:bg-[#f2f4f5]/60'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 stroke-[1.75] transition-colors ${
                      isActive ? 'text-[#000000]' : 'text-[#787574] group-hover:text-[#000000]'
                    }`}
                  />
                </div>

                {/* Counter indicator */}
                {item.count > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#5433eb] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Profile Avatar at bottom: 32px circle with 1px #ebebeb ring */}
        <button
          onClick={onOpenProfile}
          title="Account & Orders"
          className="relative group w-12 h-12 flex items-center justify-center focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full ring-1 ring-[#ebebeb] overflow-hidden flex items-center justify-center bg-[#f2f4f5] text-[12px] font-semibold text-[#000000] hover:ring-[#5433eb] transition-all">
            <span className="text-xs">VX</span>
          </div>
        </button>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-[#ebebeb] flex items-center justify-around px-4 z-40 select-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative p-2 flex flex-col items-center justify-center"
            >
              <div
                className={`w-10 h-10 rounded-[16px] flex items-center justify-center transition-colors ${
                  isActive ? 'bg-[#f2f4f5]' : ''
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-[#000000]' : 'text-[#787574]'
                  }`}
                />
              </div>
              {item.count > 0 && (
                <span className="absolute top-1 right-2 w-4 h-4 bg-[#5433eb] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}

        <button
          onClick={onOpenProfile}
          className="w-8 h-8 rounded-full ring-1 ring-[#ebebeb] overflow-hidden flex items-center justify-center bg-[#f2f4f5] text-[11px] font-semibold text-[#000000]"
        >
          <span>VX</span>
        </button>
      </nav>
    </>
  );
}
