/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { PRODUCTS, Product, CATEGORIES } from './data/products';
import { AppDownloadBanner } from './components/AppDownloadBanner';
import { SidebarNavRail } from './components/SidebarNavRail';
import { HeroConstellation } from './components/HeroConstellation';
import { BrandSpotlightCard } from './components/BrandSpotlightCard';
import { ProductImageTile } from './components/ProductImageTile';
import { ProductTypeHero } from './components/ProductTypeHero';
import { CategorySectionHeader } from './components/CategorySectionHeader';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProfileModal } from './components/ProfileModal';
import { CookieConsent } from './components/CookieConsent';
import { Footer } from './components/Footer';
import { Heart, Search, ShoppingBag, Sparkles, Filter } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'discover' | 'browse' | 'saved' | 'cart'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Interactive Product States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Amber Restore Botanical Serum
      quantity: 1,
      selectedVariant: '30ml / 1.0 fl oz',
    },
  ]);
  const [savedProductIds, setSavedProductIds] = useState<string[]>([
    'prod-serum',
    'prod-headphones',
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product: Product, variant?: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedVariant === variant
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedVariant === variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedVariant: variant || product.variants?.[0] || 'Default Edition',
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist toggle
  const handleToggleSave = (productId: string) => {
    setSavedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Filtered products logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const savedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => savedProductIds.includes(p.id));
  }, [savedProductIds]);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f2f4f5] text-[#000000] flex flex-col font-sans">
      {/* 1. App Download Banner at top */}
      <AppDownloadBanner />

      {/* 2. Persistent Sidebar Nav Rail */}
      <SidebarNavRail
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'cart') {
            setIsCartOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        cartCount={totalCartCount}
        savedCount={savedProductIds.length}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* 3. Main Content Container (Pushed right 64px on desktop to accommodate left rail) */}
      <main className="flex-1 lg:pl-16 pb-20">
        {activeTab === 'saved' ? (
          /* SAVED ITEMS VIEW */
          <div className="max-w-[1200px] mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight-heading">
                  Curated Wishlist
                </h2>
                <p className="text-sm text-[#787574] mt-1">
                  {savedProducts.length} items bookmarked in your personal constellation
                </p>
              </div>
              <button
                onClick={() => setActiveTab('discover')}
                className="py-2 px-4 rounded-full bg-white border border-[#ebebeb] text-xs font-medium hover:border-[#cccccc]"
              >
                Return to Discover
              </button>
            </div>

            {savedProducts.length === 0 ? (
              <div className="bg-white rounded-[28px] p-12 text-center shadow-vexora-card">
                <Heart className="w-12 h-12 text-[#787574] mx-auto mb-4 stroke-1" />
                <h3 className="text-lg font-semibold tracking-tight-heading mb-2">
                  No saved items yet
                </h3>
                <p className="text-sm text-[#787574] mb-6">
                  Click the heart icon on any product to save it to your collection.
                </p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="py-2.5 px-6 rounded-full bg-[#5433eb] text-white text-xs font-medium shadow-vexora-violet hover:bg-[#4524db]"
                >
                  Explore Constellation
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {savedProducts.map((product) => (
                  <BrandSpotlightCard
                    key={product.id}
                    product={product}
                    onSelect={setSelectedProduct}
                    onAddToCart={(p) => handleAddToCart(p)}
                    isSaved={true}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* DISCOVER & BROWSE VIEW */
          <>
            {/* HERO CONSTELLATION SECTION */}
            <HeroConstellation
              products={PRODUCTS}
              onSelectProduct={setSelectedProduct}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {/* If searching or filtering, show direct filtered section */}
            {(searchQuery.trim() !== '' || selectedCategory !== 'all') && (
              <section className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-16">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight-heading">
                      {selectedCategory !== 'all'
                        ? CATEGORIES.find((c) => c.id === selectedCategory)?.label
                        : 'Search Results'}
                    </h2>
                    <p className="text-xs text-[#787574]">
                      Showing {filteredProducts.length} curations
                      {searchQuery && ` matching "${searchQuery}"`}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="text-xs text-[#5433eb] hover:underline"
                  >
                    Reset filters
                  </button>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-[28px] p-12 text-center shadow-vexora-card">
                    <p className="text-base font-semibold mb-2">No matching curations found</p>
                    <p className="text-xs text-[#787574] mb-4">
                      Try searching with different terms or reset your active filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="py-2 px-5 rounded-full bg-[#000000] text-white text-xs font-medium"
                    >
                      Show all products
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((prod) => (
                      <BrandSpotlightCard
                        key={prod.id}
                        product={prod}
                        onSelect={setSelectedProduct}
                        onAddToCart={(p) => handleAddToCart(p)}
                        isSaved={savedProductIds.includes(prod.id)}
                        onToggleSave={handleToggleSave}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* MAIN CURATED BANDS (64-80px vertical rhythm) */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-16 sm:space-y-20">
              {/* SECTION 1: Featured Brand Spotlights (4-Column Grid) */}
              <section>
                <CategorySectionHeader
                  title="Spotlight Brand Ateliers"
                  count={4}
                  onExplore={() => setSelectedCategory('all')}
                  onScrollRight={() => {}}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PRODUCTS.slice(0, 4).map((product) => (
                    <BrandSpotlightCard
                      key={product.id}
                      product={product}
                      onSelect={setSelectedProduct}
                      onAddToCart={(p) => handleAddToCart(p)}
                      isSaved={savedProductIds.includes(product.id)}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION 2: Architectural Living & Home (2-Column Hero & Grid Composition) */}
              <section>
                <CategorySectionHeader
                  title="Architectural Living & Furniture"
                  onExplore={() => setSelectedCategory('home')}
                />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Left Hero Card: ~60% width (7 cols on 12-col grid) */}
                  <div className="lg:col-span-7">
                    <ProductTypeHero
                      product={PRODUCTS[1]} // Scandi Lounge Chair
                      onSelect={setSelectedProduct}
                      titleOverride="NORDIC LIVING ARCHIVE"
                      subtitleOverride="Sculpted solid European white oak frames and organic bouclé upholstery for tranquil architectural spaces."
                    />
                  </div>

                  {/* Right Product Tiles: ~40% width (5 cols) */}
                  <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                    <ProductImageTile
                      product={PRODUCTS[5]} // Horizon Lamp
                      onSelect={setSelectedProduct}
                      aspect="wide"
                    />
                    <ProductImageTile
                      product={PRODUCTS[1]} // Lounge Chair close-up
                      onSelect={setSelectedProduct}
                      aspect="wide"
                    />
                  </div>
                </div>
              </section>

              {/* SECTION 3: Acoustic Audio & Studio Monitors (Level 3 Surface) */}
              <section>
                <CategorySectionHeader
                  title="Acoustic Studio & High-Fidelity Audio"
                  onExplore={() => setSelectedCategory('audio')}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PRODUCTS.filter((p) => p.category === 'audio' || p.category === 'beauty').map(
                    (product) => (
                      <BrandSpotlightCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                        onAddToCart={(p) => handleAddToCart(p)}
                        isSaved={savedProductIds.includes(product.id)}
                        onToggleSave={handleToggleSave}
                      />
                    )
                  )}
                </div>
              </section>

              {/* SECTION 4: Footwear, Leather & Street Ateliers */}
              <section>
                <CategorySectionHeader
                  title="Footwear & Tuscan Leathercraft"
                  onExplore={() => setSelectedCategory('footwear')}
                />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                    <ProductImageTile
                      product={PRODUCTS[3]} // Minimal Sneaker
                      onSelect={setSelectedProduct}
                      aspect="wide"
                    />
                    <ProductImageTile
                      product={PRODUCTS[7]} // Monochrome Runner
                      onSelect={setSelectedProduct}
                      aspect="wide"
                    />
                  </div>
                  <div className="lg:col-span-7">
                    <ProductTypeHero
                      product={PRODUCTS[3]}
                      onSelect={setSelectedProduct}
                      titleOverride="LUXE ATELIER FLORENCE"
                      subtitleOverride="Hand-stitched full-grain Italian calfskin with brushed Tuscan suede overlays. Crafted with generational precision."
                    />
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Modals and Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isSaved={selectedProduct ? savedProductIds.includes(selectedProduct.id) : false}
        onToggleSave={handleToggleSave}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* 6. Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}
