import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

export function AppDownloadBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <div className="w-full bg-[#000000] text-white h-12 flex items-center justify-between px-4 sm:px-6 z-40 relative text-sm select-none">
        <div className="flex items-center gap-3 mx-auto">
          {/* 24px rounded app icon */}
          <div className="w-6 h-6 rounded-md bg-[#5433eb] flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-[12px] font-bold text-white tracking-tighter">V</span>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-[14px] hover:text-white/90 transition-opacity font-normal tracking-[-0.023em]"
          >
            <span>Download Vexora app</span>
            <span className="text-[10px] text-[#acb0aa] hidden sm:inline">
              Available on iOS & Android
            </span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5 text-white stroke-[2]" />
          </button>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-[#acb0aa] hover:text-white p-1 rounded-full transition-colors absolute right-4 top-1/2 -translate-y-1/2"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 text-[#000000] shadow-vexora-card relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-[#787574] hover:text-black p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#5433eb] flex items-center justify-center text-white font-bold text-lg">
                V
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight-heading">Vexora Shopping App</h3>
                <p className="text-xs text-[#787574]">Pillow-soft shopping constellation</p>
              </div>
            </div>
            <p className="text-sm text-[#787574] mb-6 leading-relaxed">
              Explore floating curations, receive instant order tracking, and experience zero-friction checkout with Apple Pay & Google Pay.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 px-4 bg-[#000000] text-white rounded-full text-xs font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>App Store (iOS)</span>
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 px-4 bg-[#f2f4f5] text-[#000000] rounded-full text-xs font-medium hover:bg-[#ebebeb] transition-colors flex items-center justify-center gap-2"
              >
                <span>Google Play (Android)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
