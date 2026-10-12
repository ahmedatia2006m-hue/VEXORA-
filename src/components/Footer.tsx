export function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-white pt-16 pb-20 px-6 sm:px-12 select-none">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-16 border-b border-[#332f2d]">
          {/* Col 1 */}
          <div>
            <div className="flex items-baseline mb-4">
              <span className="text-2xl font-semibold tracking-[-0.05em] text-white">vexora</span>
              <span className="w-2 h-2 rounded-full bg-[#5433eb] ml-1 inline-block" />
            </div>
            <p className="text-xs text-[#acb0aa] leading-relaxed max-w-xs">
              Floating shopping constellation on white marble. Discover independent creators and artisan ateliers worldwide.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Constellations
            </h4>
            <ul className="space-y-2.5 text-xs text-[#acb0aa]">
              <li><a href="#" className="hover:text-white transition-colors">Beauty & Skincare</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Home & Living</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Acoustic Audio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Footwear & Suede</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Limited Editions</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Atelier Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#acb0aa]">
              <li><a href="#" className="hover:text-white transition-colors">Global Insured Courier</a></li>
              <li><a href="#" className="hover:text-white transition-colors">30-Day Curated Return</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Artisan Authentication</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Merchant Application</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vexora Circle Membership</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Legal & Privacy
            </h4>
            <ul className="space-y-2.5 text-xs text-[#acb0aa]">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Charter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Discovery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Invariants</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#787574] gap-4">
          <p>© 2026 Vexora Platform. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Powered by Shop Violet</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#5433eb]" />
            <span>Discovery Engine</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
