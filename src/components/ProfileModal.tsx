import { X, Package, Shield, CreditCard, Bell, MapPin, Sparkles } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 text-[#000000] shadow-vexora-card relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#787574] hover:text-black p-1 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-[#f2f4f5] ring-2 ring-[#ebebeb] flex items-center justify-center text-lg font-semibold text-[#000000]">
            VX
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight-heading">Curator Account</h2>
            <p className="text-xs text-[#787574]">Member since March 2026 · Vexora Circle</p>
          </div>
        </div>

        {/* Orders section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-[#787574] uppercase tracking-wider">
              Recent Dispatches
            </h3>
            <span className="text-xs text-[#5433eb] font-medium">All History</span>
          </div>

          <div className="p-4 bg-[#f2f4f5] rounded-[20px] space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[#000000]">Order #VX-7741</span>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-100/60 px-2.5 py-0.5 rounded-full">
                In Transit
              </span>
            </div>
            <p className="text-xs text-[#787574]">
              Amber Restore Botanical Serum · Sona Reference Studio Monitors
            </p>
            <div className="text-[11px] text-[#787574] pt-1 flex items-center gap-2">
              <Package className="w-3.5 h-3.5 text-[#5433eb]" />
              <span>Expected Delivery: Tomorrow, 2:00 PM</span>
            </div>
          </div>
        </div>

        {/* Settings grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 border border-[#ebebeb] rounded-[18px] hover:bg-[#f2f4f5] transition-colors cursor-pointer">
            <MapPin className="w-4 h-4 text-[#5433eb] mb-1.5" />
            <h4 className="text-xs font-semibold text-[#000000]">Saved Addresses</h4>
            <p className="text-[11px] text-[#787574]">742 Evergreen Terrace</p>
          </div>

          <div className="p-3.5 border border-[#ebebeb] rounded-[18px] hover:bg-[#f2f4f5] transition-colors cursor-pointer">
            <CreditCard className="w-4 h-4 text-[#5433eb] mb-1.5" />
            <h4 className="text-xs font-semibold text-[#000000]">Payment Methods</h4>
            <p className="text-[11px] text-[#787574]">Apple Pay · Visa ending 4129</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#000000] text-white rounded-full text-xs font-medium hover:bg-neutral-800 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}
