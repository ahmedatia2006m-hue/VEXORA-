import { useState } from 'react';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [accepted, setAccepted] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  if (accepted) return null;

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-lg z-40 bg-white rounded-[28px] p-5 shadow-vexora-card border border-[#ebebeb] text-[#000000]">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-[14px] leading-relaxed text-[#000000] tracking-tight-body">
              Vexora uses minimal essential cookies to remember your bag and deliver a pillow-soft discovery experience. Read our{' '}
              <button
                onClick={() => setShowPreferences(true)}
                className="text-[14px] font-normal text-[#000000] underline hover:text-[#5433eb] transition-colors cursor-pointer"
              >
                Cookie Preferences
              </button>{' '}
              for details.
            </p>

            <div className="flex items-center gap-2 pt-1">
              {/* Cookie Consent Button: Pill at 9999px radius, white fill, 1px #ebebeb border, 12px semibold black */}
              <button
                onClick={() => setAccepted(true)}
                className="rounded-full bg-white border border-[#ebebeb] text-[#000000] text-[12px] font-semibold py-1.5 px-4 shadow-vexora-pill hover:border-[#cccccc] hover:shadow-xs transition-all cursor-pointer"
              >
                Accept all cookies
              </button>

              <button
                onClick={() => setAccepted(true)}
                className="rounded-full bg-[#f2f4f5] text-[#787574] hover:text-[#000000] text-[12px] font-medium py-1.5 px-3 transition-colors cursor-pointer"
              >
                Essential only
              </button>
            </div>
          </div>

          <button
            onClick={() => setAccepted(true)}
            aria-label="Dismiss cookie notice"
            className="text-[#787574] hover:text-[#000000] p-1 rounded-full shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showPreferences && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 text-[#000000] shadow-vexora-card relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold tracking-tight-heading">Cookie Preferences</h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-[#787574] hover:text-black p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#787574] mb-4">
              Control how cookies are utilized during your Vexora discovery sessions.
            </p>
            <div className="space-y-3 mb-6 text-xs">
              <div className="p-3 bg-[#f2f4f5] rounded-[16px] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-black">Essential Cart & Security</p>
                  <p className="text-[#787574]">Required for bag and checkout encryption</p>
                </div>
                <span className="text-[11px] font-semibold text-[#5433eb]">Always Active</span>
              </div>
              <div className="p-3 bg-[#f2f4f5] rounded-[16px] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-black">Constellation Personalization</p>
                  <p className="text-[#787574]">Remembers preferred categories & themes</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-[#5433eb] focus:ring-[#5433eb]"
                />
              </div>
            </div>
            <button
              onClick={() => {
                setShowPreferences(false);
                setAccepted(true);
              }}
              className="w-full py-2.5 bg-[#000000] text-white rounded-full text-xs font-semibold hover:bg-neutral-800 transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </>
  );
}
