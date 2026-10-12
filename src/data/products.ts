export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'beauty' | 'home' | 'audio' | 'footwear' | 'women' | 'men';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImages?: string[];
  description: string;
  badge?: string;
  isHeroSpotlight?: boolean;
  isDarkSurface?: boolean;
  accentColor?: string;
  variants?: string[];
  inStock: boolean;
  merchantLocation: string;
  story: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'All Curations', iconColor: '#5433eb' },
  { id: 'beauty', label: 'Beauty & Skincare', iconColor: '#c2410c' },
  { id: 'home', label: 'Home & Living', iconColor: '#15803d' },
  { id: 'audio', label: 'Studio & Audio', iconColor: '#2563eb' },
  { id: 'footwear', label: 'Footwear & Street', iconColor: '#4f46e5' },
  { id: 'women', label: 'Women’s Curations', iconColor: '#9333ea' },
  { id: 'men', label: 'Men’s Essentials', iconColor: '#0f766e' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-serum',
    name: 'Amber Restore Botanical Serum',
    brand: 'AURA BOTANICALS',
    category: 'beauty',
    categoryLabel: 'Beauty & Skincare',
    price: 68.0,
    originalPrice: 85.0,
    rating: 4.9,
    reviewsCount: 1420,
    image: '/src/assets/images/vexora_botanical_serum_1791776120076.jpg',
    description: 'Cold-pressed botanical lipids formulated with organic squalane and amber bakuchiol for radiant skin barrier renewal.',
    badge: 'Best Seller',
    isHeroSpotlight: true,
    accentColor: '#d97706',
    variants: ['30ml / 1.0 fl oz', '50ml / 1.7 fl oz'],
    inStock: true,
    merchantLocation: 'Reykjavik, Iceland',
    story: 'Handcrafted in micro-batches with glacial spring infusions and regenerative seed oils.',
  },
  {
    id: 'prod-chair',
    name: 'Kallio Curved Bouclé Lounge Chair',
    brand: 'NORDIC LIVING ARCHIVE',
    category: 'home',
    categoryLabel: 'Home & Living',
    price: 890.0,
    originalPrice: 1100.0,
    rating: 4.95,
    reviewsCount: 388,
    image: '/src/assets/images/vexora_scandi_lounge_1791776132525.jpg',
    description: 'Sculptural solid European white oak frame sculpted with continuous sweep joints and high-density wool bouclé upholstery.',
    badge: 'Artisan Crafted',
    isHeroSpotlight: true,
    accentColor: '#854d0e',
    variants: ['Natural White Oak', 'Smoked Walnut'],
    inStock: true,
    merchantLocation: 'Copenhagen, Denmark',
    story: 'Designed in collaboration with heritage woodturners using FSC-certified timber.',
  },
  {
    id: 'prod-headphones',
    name: 'Sona Reference Studio Monitors',
    brand: 'SONA ACOUSTICS',
    category: 'audio',
    categoryLabel: 'Studio & Audio',
    price: 349.0,
    rating: 4.88,
    reviewsCount: 892,
    image: '/src/assets/images/vexora_studio_headphones_1791776142357.jpg',
    description: 'Beryllium-coated 45mm acoustic transducers offering uncolored spatial monitoring, CNC-machined titanium armatures, and lambswool earpads.',
    badge: 'Acoustic Reference',
    isHeroSpotlight: true,
    isDarkSurface: true,
    accentColor: '#332f2d',
    variants: ['Graphite & Silver', 'Anodized Matte Black'],
    inStock: true,
    merchantLocation: 'Tokyo, Japan',
    story: 'Engineered for audio engineers who demand neutral impulse response and zero coloration.',
  },
  {
    id: 'prod-sneaker',
    name: 'Crafted Court Low-Top Sneaker',
    brand: 'LUXE ATELIER',
    category: 'footwear',
    categoryLabel: 'Footwear & Street',
    price: 240.0,
    originalPrice: 280.0,
    rating: 4.84,
    reviewsCount: 654,
    image: '/src/assets/images/vexora_minimal_sneaker_1791776151942.jpg',
    description: 'Full-grain Italian calfskin leather hand-stitched with brushed Tuscan suede overlays and natural amber gum rubber outsoles.',
    badge: 'Limited Run',
    isHeroSpotlight: true,
    accentColor: '#78716c',
    variants: ['EU 40 / US 7', 'EU 41 / US 8', 'EU 42 / US 9', 'EU 43 / US 10', 'EU 44 / US 11'],
    inStock: true,
    merchantLocation: 'Florence, Italy',
    story: 'Stitched by third-generation Tuscan shoemakers with vegetable-tanned lining.',
  },
  {
    id: 'prod-mist',
    name: 'Pure Hydration Balancing Mist',
    brand: 'AURA BOTANICALS',
    category: 'beauty',
    categoryLabel: 'Beauty & Skincare',
    price: 42.0,
    rating: 4.79,
    reviewsCount: 421,
    image: '/src/assets/images/vexora_botanical_serum_1791776120076.jpg',
    description: 'Micro-fine organic rosewater and snow mushroom hydrosol infused with electrolyte mineral complexes.',
    variants: ['100ml / 3.4 fl oz'],
    inStock: true,
    merchantLocation: 'Reykjavik, Iceland',
    story: 'Refreshing antioxidant mist for morning ritual and travel moisture restoration.',
  },
  {
    id: 'prod-lamp',
    name: 'Brushed Brass Horizon Lamp',
    brand: 'NORDIC LIVING ARCHIVE',
    category: 'home',
    categoryLabel: 'Home & Living',
    price: 320.0,
    rating: 4.92,
    reviewsCount: 215,
    image: '/src/assets/images/vexora_scandi_lounge_1791776132525.jpg',
    description: 'Spun solid brass dome luminaire with dimmable warm 2700K diffusion and custom woven flax cord.',
    variants: ['Warm Brass', 'Brushed Aluminum'],
    inStock: true,
    merchantLocation: 'Copenhagen, Denmark',
    story: 'Provides sculptural illumination with ambient downward glow without glare.',
  },
  {
    id: 'prod-dac',
    name: 'Titanium High-Res DAC Amplifier',
    brand: 'SONA ACOUSTICS',
    category: 'audio',
    categoryLabel: 'Studio & Audio',
    price: 195.0,
    rating: 4.87,
    reviewsCount: 310,
    image: '/src/assets/images/vexora_studio_headphones_1791776142357.jpg',
    description: 'Ultra-low distortion dual ESS Sabre DAC supporting 32-bit/768kHz lossless decoding with 4.4mm balanced output.',
    isDarkSurface: true,
    variants: ['Titanium Gray'],
    inStock: true,
    merchantLocation: 'Tokyo, Japan',
    story: 'Pocketsize audiophile performance for both studio desks and portable listening.',
  },
  {
    id: 'prod-runner',
    name: 'Monochrome Runner Suede',
    brand: 'LUXE ATELIER',
    category: 'footwear',
    categoryLabel: 'Footwear & Street',
    price: 265.0,
    rating: 4.81,
    reviewsCount: 412,
    image: '/src/assets/images/vexora_minimal_sneaker_1791776151942.jpg',
    description: 'Aerodynamic silhouette formed with breathable technical mesh and hand-cut charcoal suede heel counters.',
    variants: ['EU 41 / US 8', 'EU 42 / US 9', 'EU 43 / US 10', 'EU 44 / US 11'],
    inStock: true,
    merchantLocation: 'Florence, Italy',
    story: 'Blends archival track aesthetic with contemporary Italian luxury construction.',
  },
];
