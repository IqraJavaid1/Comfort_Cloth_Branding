/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Comfort — Outfits For Every You
 * Premium Modern Women's Fashion E-Commerce Experience
 */

import React, { useState, useMemo } from 'react';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Truck,
  ArrowRight,
  Star,
  Plus,
  Minus,
  Trash2,
  Check,
  Sparkles,
  Shirt,
  Scissors,
  Layers,
  Wind,
  Gem,
  Footprints,
  Feather,
  Clock,
  ShieldCheck,
  ChevronDown,
  Info,
  Lock,
  Unlock,
  Package,
  ListOrdered,
  DollarSign,
  TrendingUp,
  Edit3,
  Trash,
  PlusCircle,
  Eye,
  EyeOff,
  MessageSquare,
  LogOut,
  Store,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Tag,
  Mail,
  Settings,
  Printer,
  Download,
  Send,
  Bell,
  Sliders,
  RefreshCw,
  FileText,
  CheckCheck,
  CreditCard,
  MapPin,
  Phone,
  Calendar,
  ChevronRight
} from 'lucide-react';

// Asset paths
const LOGO_IMG = '/logo.png';
const LOGO_SVG = '/src/assets/images/logo.svg';
const HERO_IMG = '/src/assets/images/hero_fashion_model_1790831774400.jpg';
const FLORAL_MAXI_IMG = '/src/assets/images/product_floral_maxi_1790831785578.jpg';
const COORD_SET_IMG = '/src/assets/images/product_coord_set_1790831796381.jpg';
const EMBROIDERED_KURTA_IMG = '/src/assets/images/product_embroidered_kurta_1790831806569.jpg';
const ABOUT_STORY_IMG = '/src/assets/images/about_editorial_story_1790831819549.jpg';

// Types
interface Product {
  id: number;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
}

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

// Initial Mock Products matching the specification
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Floral Maxi Dress',
    category: 'Dresses',
    categorySlug: 'dresses',
    price: 49.99,
    originalPrice: 69.99,
    image: FLORAL_MAXI_IMG,
    rating: 5.0,
    reviews: 24,
    isNew: true,
    description: 'Crafted from whisper-light breathable chiffon with delicate petal accents, an airy tiered skirt, and an adjustable soft waist tie. Flowing elegance made for garden parties, seaside strolls, and sunlit brunches.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blush Coral', 'Ivory Bloom', 'Deep Burgundy'],
    stock: 28,
  },
  {
    id: 2,
    name: 'Elegant Co-ord Set',
    category: 'Co-ords',
    categorySlug: 'co-ords',
    price: 54.99,
    originalPrice: 75.00,
    image: COORD_SET_IMG,
    rating: 4.9,
    reviews: 19,
    isNew: true,
    description: 'An elevated monochrome matching duo tailored from pre-washed breathable linen. Features a relaxed mock-neck tunic with graceful drape and matching wide-leg trousers with hidden deep pockets.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Dusty Rose', 'Terracotta Coral', 'Oatmeal Cream'],
    stock: 22,
  },
  {
    id: 3,
    name: 'Embroidered Kurta Set',
    category: 'Ethnic & Fusion',
    categorySlug: 'dresses',
    price: 44.99,
    originalPrice: 59.99,
    image: EMBROIDERED_KURTA_IMG,
    rating: 5.0,
    reviews: 32,
    isNew: true,
    description: 'A celebration of heirloom artistry with delicate micro-thread embroidery around the notched neckline and sleeve cuffs. Includes silky modal palazzo bottoms for unconditional ease all day.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pastel Coral', 'Soft Cream Gold', 'Petal Pink'],
    stock: 35,
  },
  {
    id: 4,
    name: 'Chic Wide Leg Pants',
    category: 'Bottoms',
    categorySlug: 'bottoms',
    price: 39.99,
    originalPrice: 52.00,
    image: HERO_IMG,
    rating: 4.8,
    reviews: 18,
    isNew: true,
    description: 'High-waisted tailored trousers designed with clean front pleats and a gently elasticized rear waistband. Flows like water in luxurious plant-based modal fabric.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cinnamon Cream', 'Warm Sand', 'Midnight Rose'],
    stock: 40,
  },
  {
    id: 5,
    name: 'Silk Touch Blouson',
    category: 'Tops & Shirts',
    categorySlug: 'tops-shirts',
    price: 36.50,
    originalPrice: 48.00,
    image: FLORAL_MAXI_IMG,
    rating: 4.9,
    reviews: 15,
    isNew: false,
    description: 'A feather-light silky blouse featuring gathered cuffs, a soft mandarin collar, and mother-of-pearl buttons. Effortlessly pairs with work trousers or casual denim.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Pearl Cream', 'Blush Tint'],
    stock: 19,
  },
  {
    id: 6,
    name: 'Cashmere Blend Trench Wrap',
    category: 'Outerwear',
    categorySlug: 'outerwear',
    price: 89.00,
    originalPrice: 120.00,
    image: ABOUT_STORY_IMG,
    rating: 5.0,
    reviews: 41,
    isNew: false,
    description: 'An unlined drape duster coat made from brushed wool and ultra-fine cashmere. Slips over any outfit for an immediate touch of quiet European luxury.',
    sizes: ['S', 'M', 'L'],
    colors: ['Soft Camel', 'Rose Dust'],
    stock: 14,
  }
];

const CATEGORIES = [
  { name: 'Dresses', slug: 'dresses', icon: Sparkles },
  { name: 'Tops & Shirts', slug: 'tops-shirts', icon: Shirt },
  { name: 'Bottoms', slug: 'bottoms', icon: Scissors },
  { name: 'Co-ords', slug: 'co-ords', icon: Layers },
  { name: 'Outerwear', slug: 'outerwear', icon: Wind },
  { name: 'Accessories', slug: 'accessories', icon: Gem },
  { name: 'Footwear', slug: 'footwear', icon: Footprints },
];

interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  date: string;
  items: { productName: string; size: string; quantity: number; price: number; image?: string }[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

interface CustomerInquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Replied';
  reply?: string;
  repliedAt?: string;
}

interface PromoCode {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  usageCount: number;
  expiresAt: string;
  isActive: boolean;
}

interface Subscriber {
  id: number;
  email: string;
  date: string;
  tier: 'VIP Gold' | 'Standard Member';
}

interface StoreSettings {
  announcementText: string;
  freeShippingThreshold: number;
  supportEmail: string;
  supportPhone: string;
  storeStatus: 'Live' | 'Maintenance';
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'CF-884129',
    customerName: 'Sophia Montgomery',
    customerEmail: 'sophia.m@example.com',
    customerPhone: '+1 (415) 890-2134',
    shippingAddress: '450 Sutter St, Suite 1200, San Francisco, CA 94108',
    paymentMethod: 'Credit Card (Visa ending 4242)',
    trackingNumber: '',
    date: 'Oct 01, 2026',
    items: [
      { productName: 'Floral Maxi Dress', size: 'M', quantity: 1, price: 49.99, image: FLORAL_MAXI_IMG }
    ],
    total: 49.99,
    status: 'Processing'
  },
  {
    id: 'CF-884102',
    customerName: 'Camilla Parker',
    customerEmail: 'camilla.p@example.com',
    customerPhone: '+1 (212) 555-0199',
    shippingAddress: '785 5th Ave, Apt 14B, New York, NY 10022',
    paymentMethod: 'Apple Pay',
    trackingNumber: '1Z9999999999999999',
    date: 'Sep 30, 2026',
    items: [
      { productName: 'Elegant Co-ord Set', size: 'S', quantity: 1, price: 54.99, image: COORD_SET_IMG },
      { productName: 'Chic Wide Leg Pants', size: 'M', quantity: 1, price: 39.99, image: HERO_IMG }
    ],
    total: 94.98,
    status: 'Shipped'
  },
  {
    id: 'CF-883950',
    customerName: 'Gwendolyn Hayes',
    customerEmail: 'gwen.hayes@example.com',
    customerPhone: '+1 (310) 782-4410',
    shippingAddress: '10250 Santa Monica Blvd, Los Angeles, CA 90067',
    paymentMethod: 'PayPal',
    trackingNumber: '1Z8888888888888888',
    date: 'Sep 29, 2026',
    items: [
      { productName: 'Embroidered Kurta Set', size: 'L', quantity: 1, price: 44.99, image: EMBROIDERED_KURTA_IMG }
    ],
    total: 44.99,
    status: 'Delivered'
  }
];

const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: 1,
    name: 'Eleanor Vance',
    email: 'eleanor@example.com',
    subject: 'Sizing consultation for Floral Maxi Dress',
    message: 'Could you tell me if the waist is elasticized or fixed? I am between sizes S and M.',
    date: 'Today at 09:14 AM',
    status: 'New'
  },
  {
    id: 2,
    name: 'Charlotte Dupont',
    email: 'charlotte@example.com',
    subject: 'Express Shipping to Paris',
    message: 'Do you offer priority courier delivery for wedding guest outfits by this Friday?',
    date: 'Yesterday at 04:30 PM',
    status: 'Replied',
    reply: 'Hello Charlotte, yes! We offer DHL Express Worldwide delivery (2-3 business days) to Paris with signature on delivery.',
    repliedAt: 'Yesterday at 05:15 PM'
  }
];

const INITIAL_PROMOS: PromoCode[] = [
  {
    id: 'PR-1',
    code: 'COMFORT10',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 50,
    usageCount: 48,
    expiresAt: '2026-12-31',
    isActive: true
  },
  {
    id: 'PR-2',
    code: 'ELEGANCE20',
    discountType: 'percentage',
    discountValue: 20,
    minSpend: 100,
    usageCount: 22,
    expiresAt: '2026-11-15',
    isActive: true
  },
  {
    id: 'PR-3',
    code: 'FREESHIP50',
    discountType: 'fixed',
    discountValue: 5.99,
    minSpend: 40,
    usageCount: 65,
    expiresAt: '2026-12-31',
    isActive: true
  }
];

const INITIAL_SUBSCRIBERS: Subscriber[] = [
  { id: 1, email: 'eleanor.vance@lifestyle.com', date: 'Oct 01, 2026', tier: 'VIP Gold' },
  { id: 2, email: 'sophia.m@example.com', date: 'Sep 30, 2026', tier: 'VIP Gold' },
  { id: 3, email: 'camilla.p@example.com', date: 'Sep 29, 2026', tier: 'Standard Member' },
  { id: 4, email: 'charlotte.d@vogueparis.fr', date: 'Sep 28, 2026', tier: 'VIP Gold' },
  { id: 5, email: 'gwen.hayes@example.com', date: 'Sep 25, 2026', tier: 'Standard Member' },
];

const INITIAL_STORE_SETTINGS: StoreSettings = {
  announcementText: 'Free Shipping on Orders Above $50',
  freeShippingThreshold: 50,
  supportEmail: 'concierge@comfortfashion.com',
  supportPhone: '+1 (800) 266-3678',
  storeStatus: 'Live',
};

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'about' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Dynamic Catalog State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(INITIAL_INQUIRIES);
  const [promos, setPromos] = useState<PromoCode[]>(INITIAL_PROMOS);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(INITIAL_SUBSCRIBERS);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(INITIAL_STORE_SETTINGS);

  // Interactive Admin Portal & Login State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState<'overview' | 'products' | 'orders' | 'inquiries' | 'discounts' | 'subscribers' | 'settings'>('overview');
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'Processing' | 'Shipped' | 'Delivered'>('all');
  const [productStockFilter, setProductStockFilter] = useState<'all' | 'in-stock' | 'low-stock' | 'out-of-stock'>('all');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  // Admin Modals & Selection State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<AdminOrder | null>(null);
  const [selectedInquiryForReply, setSelectedInquiryForReply] = useState<CustomerInquiry | null>(null);
  const [inquiryReplyText, setInquiryReplyText] = useState('');
  const [showCreatePromoModal, setShowCreatePromoModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastSubject, setBroadcastSubject] = useState('Exclusive Comfort VIP Invitation: Spring Elegance Preview');
  const [broadcastMessage, setBroadcastMessage] = useState('Dear Comfort VIP member, we are thrilled to unveil our latest collection of effortless silks, breathable linens, and luxury essentials tailored for your confidence.');

  const [newPromoForm, setNewPromoForm] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: 15,
    minSpend: 50,
    expiresAt: '2026-12-31'
  });

  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'Dresses',
    categorySlug: 'dresses',
    price: 49.99,
    originalPrice: 69.99,
    stock: 25,
    description: '',
    image: FLORAL_MAXI_IMG,
    isNew: true,
  });

  // E-commerce state
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], size: 'M', quantity: 1 }
  ]);
  const [wishlist, setWishlist] = useState<number[]>([1, 2]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Shop filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(100);

  // Newsletter & Feedback Toast
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const freeShippingDifference = Math.max(0, storeSettings.freeShippingThreshold - cartSubtotal);
  const shippingFee = cartSubtotal >= storeSettings.freeShippingThreshold || cartSubtotal === 0 ? 0 : 5.99;
  const cartTotal = cartSubtotal + shippingFee;
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Cart Actions
  const addToCart = (product: Product, size: string = 'M', quantity: number = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.size === size);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, size, quantity }];
    });
    showToast(`Added ${product.name} (${size}) to your bag`);
    setCartDrawerOpen(true);
  };

  const updateCartQuantity = (productId: number, size: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: number, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
    showToast('Item removed from shopping bag');
  };

  // Wishlist Action
  const toggleWishlist = (productId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your saved wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist! ♥');
        return [...prev, productId];
      }
    });
  };

  // Admin Portal Actions
  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAdminLoginError(null);
    if ((adminUsername.trim() === 'admin' && adminPassword === 'comfort2025') || 
        (adminUsername.trim().toLowerCase() === 'admin' && adminPassword.length >= 4) ||
        (adminUsername.trim().length > 0 && adminPassword === 'admin')) {
      setIsAdminLoggedIn(true);
      setAdminLoginError(null);
      showToast('Welcome, Administrator. Comfort Executive Suite is now active.');
    } else {
      setAdminLoginError('Invalid credentials. Use demo: admin / comfort2025');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminPassword('');
    showToast('Logged out of Admin Portal.');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) return;

    if (editingProductId) {
      setProducts(prev => prev.map(p => {
        if (p.id === editingProductId) {
          return {
            ...p,
            name: newProductForm.name,
            category: newProductForm.category,
            categorySlug: newProductForm.categorySlug,
            price: Number(newProductForm.price),
            originalPrice: Number(newProductForm.originalPrice),
            stock: Number(newProductForm.stock),
            description: newProductForm.description || p.description,
            image: newProductForm.image || p.image,
            isNew: newProductForm.isNew,
          };
        }
        return p;
      }));
      showToast(`Updated product: ${newProductForm.name}`);
      setEditingProductId(null);
    } else {
      const newId = Math.max(...products.map(p => p.id), 0) + 1;
      const createdProd: Product = {
        id: newId,
        name: newProductForm.name,
        category: newProductForm.category,
        categorySlug: newProductForm.categorySlug,
        price: Number(newProductForm.price),
        originalPrice: Number(newProductForm.originalPrice) || undefined,
        stock: Number(newProductForm.stock) || 30,
        description: newProductForm.description || 'Artisan crafted Comfort silhouette designed for effortless elegance.',
        image: newProductForm.image || FLORAL_MAXI_IMG,
        rating: 5.0,
        reviews: 1,
        isNew: newProductForm.isNew,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Blush Coral', 'Deep Burgundy', 'Cream'],
      };
      setProducts(prev => [createdProd, ...prev]);
      showToast(`Added ${createdProd.name} to store catalog!`);
    }

    setNewProductForm({
      name: '',
      category: 'Dresses',
      categorySlug: 'dresses',
      price: 49.99,
      originalPrice: 69.99,
      stock: 25,
      description: '',
      image: FLORAL_MAXI_IMG,
      isNew: true,
    });
    setShowAddProductModal(false);
  };

  const handleDeleteProduct = (productId: number) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    if (confirm(`Are you sure you want to delete "${prod.name}" from the store catalog?`)) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      showToast(`Deleted ${prod.name} from catalog.`);
    }
  };

  const handleToggleProductNew = (productId: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const nextState = !p.isNew;
        showToast(`${p.name} marked as ${nextState ? 'NEW' : 'regular'}`);
        return { ...p, isNew: nextState };
      }
      return p;
    }));
  };

  const handleUpdateStockPrice = (productId: number, newPrice?: number, newStock?: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          price: newPrice !== undefined ? newPrice : p.price,
          stock: newStock !== undefined ? newStock : p.stock,
        };
      }
      return p;
    }));
    showToast('Updated product inventory.');
  };

  const handleUpdateOrderStatus = (orderId: string, specificStatus?: 'Processing' | 'Shipped' | 'Delivered', tracking?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        let nextStatus = specificStatus;
        if (!nextStatus) {
          if (o.status === 'Processing') nextStatus = 'Shipped';
          else if (o.status === 'Shipped') nextStatus = 'Delivered';
          else nextStatus = 'Processing';
        }
        const updated: AdminOrder = { 
          ...o, 
          status: nextStatus, 
          trackingNumber: tracking !== undefined ? tracking : (nextStatus === 'Shipped' && !o.trackingNumber ? `1Z${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}` : o.trackingNumber)
        };
        showToast(`Order #${o.id} status updated to ${nextStatus}`);
        if (selectedOrderForDetail && selectedOrderForDetail.id === orderId) {
          setSelectedOrderForDetail(updated);
        }
        return updated;
      }
      return o;
    }));
  };

  const handleSendInquiryReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiryForReply || !inquiryReplyText.trim()) return;
    
    setInquiries(prev => prev.map(inq => {
      if (inq.id === selectedInquiryForReply.id) {
        return {
          ...inq,
          status: 'Replied',
          reply: inquiryReplyText.trim(),
          repliedAt: 'Just now'
        };
      }
      return inq;
    }));
    showToast(`Reply sent to ${selectedInquiryForReply.name} (${selectedInquiryForReply.email})`);
    setSelectedInquiryForReply(null);
    setInquiryReplyText('');
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoForm.code.trim()) return;
    const cleanCode = newPromoForm.code.trim().toUpperCase();
    const newPromo: PromoCode = {
      id: `PR-${Date.now()}`,
      code: cleanCode,
      discountType: newPromoForm.discountType,
      discountValue: Number(newPromoForm.discountValue) || 10,
      minSpend: Number(newPromoForm.minSpend) || 0,
      usageCount: 0,
      expiresAt: newPromoForm.expiresAt || '2026-12-31',
      isActive: true
    };
    setPromos(prev => [newPromo, ...prev]);
    showToast(`Created promo code ${cleanCode}!`);
    setShowCreatePromoModal(false);
    setNewPromoForm({
      code: '',
      discountType: 'percentage',
      discountValue: 15,
      minSpend: 50,
      expiresAt: '2026-12-31'
    });
  };

  const handleTogglePromo = (promoId: string) => {
    setPromos(prev => prev.map(p => {
      if (p.id === promoId) {
        const next = !p.isActive;
        showToast(`Promo ${p.code} is now ${next ? 'Active' : 'Disabled'}`);
        return { ...p, isActive: next };
      }
      return p;
    }));
  };

  const handleDeletePromo = (promoId: string) => {
    setPromos(prev => prev.filter(p => p.id !== promoId));
    showToast('Promo code deleted');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Broadcast campaign dispatched to ${subscribers.length} VIP subscribers!`);
    setShowBroadcastModal(false);
  };

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Store settings updated successfully! Live storefront reflects updates.');
  };

  // Filtered Products for Shop View
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.categorySlug === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSize = selectedSize === 'ALL' || product.sizes.includes(selectedSize);
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesSize && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'newest') return b.id - a.id;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return (b.rating * b.reviews) - (a.rating * a.reviews);
    });
  }, [products, selectedCategory, searchQuery, selectedSize, maxPrice, sortBy]);

  // Wishlist products
  const wishlistProducts = useMemo(() => {
    return products.filter(p => wishlist.includes(p.id));
  }, [products, wishlist]);

  return (
    <div className="min-h-screen bg-[#FFF8F2] text-[#2B1717] flex flex-col font-sans selection:bg-[#EA7B7B]/30 selection:text-[#9E3B3B]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#9E3B3B] text-[#FFF8F2] px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-medium animate-bounce border border-[#FFEAD3]/20">
          <Sparkles className="w-4 h-4 text-[#FFEAD3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <aside aria-label="Store Announcement" className="bg-[#9E3B3B] text-[#FFF8F2] py-2 px-4 text-xs font-medium tracking-wide border-b border-[#FFEAD3]/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Truck className="w-3.5 h-3.5 text-[#FFEAD3]" />
            <span>{storeSettings.announcementText}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#FFF8F2]/80 text-[11px]">
            <button onClick={() => setCurrentView('contact')} className="hover:text-white transition">Help</button>
            <span>|</span>
            <button onClick={() => showToast('Order tracking is active with standard shipping.')} className="hover:text-white transition">Track Order</button>
            <span>|</span>
            <div className="flex items-center gap-1 cursor-pointer hover:text-white">
              <span>USD</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </aside>

      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#FFF8F2]/95 backdrop-blur-md border-b border-[#FFEAD3] shadow-[0_4px_20px_rgba(43,23,23,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          
          {/* Left: Comfort Logo */}
          <button 
            onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 group text-left focus:outline-none py-1"
            aria-label="Comfort Home"
          >
            <img 
              src={LOGO_IMG} 
              alt="Comfort - Outfits For Every You" 
              className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-102 drop-shadow-xs"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-[#2B1717]">
            <button 
              onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`py-1 relative transition-colors hover:text-[#9E3B3B] ${currentView === 'home' ? 'text-[#9E3B3B] font-semibold' : ''}`}
            >
              Home
              {currentView === 'home' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9E3B3B] rounded-full" />}
            </button>
            <button 
              onClick={() => setCurrentView('shop')}
              className={`py-1 relative transition-colors hover:text-[#9E3B3B] ${currentView === 'shop' ? 'text-[#9E3B3B] font-semibold' : ''}`}
            >
              Shop
              {currentView === 'shop' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9E3B3B] rounded-full" />}
            </button>
            <button 
              onClick={() => { setCurrentView('shop'); setSortBy('newest'); }}
              className="py-1 transition-colors hover:text-[#9E3B3B]"
            >
              New Arrivals
            </button>
            <button 
              onClick={() => { setCurrentView('shop'); setSelectedCategory('all'); }}
              className="py-1 transition-colors hover:text-[#9E3B3B]"
            >
              Collections
            </button>
            <button 
              onClick={() => setCurrentView('about')}
              className={`py-1 relative transition-colors hover:text-[#9E3B3B] ${currentView === 'about' ? 'text-[#9E3B3B] font-semibold' : ''}`}
            >
              About Us
              {currentView === 'about' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9E3B3B] rounded-full" />}
            </button>
            <button 
              onClick={() => setCurrentView('contact')}
              className={`py-1 relative transition-colors hover:text-[#9E3B3B] ${currentView === 'contact' ? 'text-[#9E3B3B] font-semibold' : ''}`}
            >
              Contact
              {currentView === 'contact' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9E3B3B] rounded-full" />}
            </button>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Icon */}
            <button 
              onClick={() => setCurrentView('shop')}
              className="p-2 sm:p-2.5 rounded-full hover:bg-[#FFEAD3]/60 text-[#2B1717] hover:text-[#9E3B3B] transition"
              aria-label="Search outfits"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User / Admin Portal Button */}
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-[#FFEAD3]/60 text-[#2B1717] hover:text-[#9E3B3B] transition cursor-pointer"
              aria-label="Admin Portal & Account"
              title={isAdminLoggedIn ? "Comfort Admin Dashboard (Active)" : "Comfort Admin Login"}
            >
              <User className="w-5 h-5" />
              {isAdminLoggedIn && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-400 animate-pulse" />
              )}
            </button>

            {/* Wishlist */}
            <button 
              onClick={() => setWishlistModalOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-[#FFEAD3]/60 text-[#2B1717] hover:text-[#9E3B3B] transition"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#D25353] fill-[#D25353]/20' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D25353] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button 
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-[#FFEAD3]/60 text-[#2B1717] hover:text-[#9E3B3B] transition"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#9E3B3B]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#9E3B3B] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#2B1717] hover:bg-[#FFEAD3]/60"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFF8F2] border-b border-[#FFEAD3] px-6 py-5 flex flex-col gap-3 shadow-lg animate-in slide-in-from-top duration-300">
            <button 
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              className="text-left py-2 font-medium text-base text-[#9E3B3B] border-b border-[#FFEAD3]/60"
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentView('shop'); setMobileMenuOpen(false); }}
              className="text-left py-2 font-medium text-base text-[#2B1717] border-b border-[#FFEAD3]/60"
            >
              Shop All
            </button>
            <button 
              onClick={() => { setCurrentView('shop'); setSortBy('newest'); setMobileMenuOpen(false); }}
              className="text-left py-2 font-medium text-base text-[#2B1717] border-b border-[#FFEAD3]/60"
            >
              New Arrivals
            </button>
            <button 
              onClick={() => { setCurrentView('about'); setMobileMenuOpen(false); }}
              className="text-left py-2 font-medium text-base text-[#2B1717] border-b border-[#FFEAD3]/60"
            >
              About Our Story
            </button>
            <button 
              onClick={() => { setCurrentView('contact'); setMobileMenuOpen(false); }}
              className="text-left py-2 font-medium text-base text-[#2B1717] border-b border-[#FFEAD3]/60"
            >
              Contact Concierge
            </button>
            <button 
              onClick={() => { setIsAdminOpen(true); setMobileMenuOpen(false); }}
              className="text-left py-2 font-medium text-base text-[#9E3B3B] flex items-center justify-between border-b border-[#FFEAD3]/60"
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#D25353]" />
                <span>Admin Portal</span>
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isAdminLoggedIn ? 'bg-emerald-100 text-emerald-800' : 'bg-[#FFEAD3] text-[#9E3B3B]'}`}>
                {isAdminLoggedIn ? 'Active' : 'Sign In'}
              </span>
            </button>
          </div>
        )}
      </header>

      {/* MAIN VIEW ROUTING */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#FFEAD3] via-[#FFF3E6] to-[#FFDFDE] py-14 md:py-20 lg:py-24 border-b border-[#FFEAD3]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  
                  {/* Left Column Content */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#D25353] uppercase">
                      STYLE MEETS COMFORT
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#9E3B3B] leading-[1.1] font-semibold">
                      Dress Like<br className="hidden sm:inline" /> Your Best Self
                    </h1>
                    <p className="text-base sm:text-lg text-[#5C3D3D] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                      Discover timeless styles, premium fabrics and outfits designed to make you feel confident, comfortable and uniquely you.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                      {/* Premium Button with Hoverboard Effect */}
                      <button 
                        onClick={() => setCurrentView('shop')}
                        className="btn-comfort px-9 py-4 rounded-full text-base font-semibold shadow-lg group cursor-pointer"
                      >
                        <span>Shop Now</span>
                        <ArrowRight className="w-5 h-5 ml-2.5 transition-transform group-hover:translate-x-1" />
                      </button>
                      <button 
                        onClick={() => setCurrentView('about')}
                        className="btn-outline-comfort px-8 py-4 rounded-full text-base font-medium"
                      >
                        Explore Our Ethos
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Fashion Model Editorial Image */}
                  <div className="lg:col-span-5 relative flex justify-center">
                    <div className="relative max-w-md w-full">
                      <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-[10px] border-white/90 bg-white">
                        <img 
                          src={HERO_IMG} 
                          alt="Comfort Fashion Editorial Lookbook Model" 
                          className="w-full h-[460px] sm:h-[520px] object-cover transition-transform duration-700 hover:scale-103"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      {/* Elegant Handwritten Decorative Script Banner */}
                      <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md px-6 py-3.5 rounded-2xl shadow-xl border border-[#FFEAD3] text-[#9E3B3B] font-script text-2xl sm:text-3xl whitespace-nowrap">
                        Fashion &nbsp;•&nbsp; Comfort &nbsp;•&nbsp; Confidence
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SHOP BY CATEGORY */}
            <section className="py-16 sm:py-20 bg-[#FFF8F2]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-xs font-bold tracking-[0.2em] text-[#D25353] uppercase mb-2">Curated Silhouettes</p>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#9E3B3B] mb-3">SHOP BY CATEGORY</h2>
                <p className="text-[#7A5858] max-w-md mx-auto text-sm sm:text-base mb-12">
                  Harmonious ensembles and wardrobe staples tailored for modern ease.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-5 sm:gap-6">
                  {CATEGORIES.map((cat) => {
                    const IconComp = cat.icon;
                    return (
                      <button
                        key={cat.slug}
                        onClick={() => {
                          setSelectedCategory(cat.slug);
                          setCurrentView('shop');
                        }}
                        className="category-card flex flex-col items-center gap-3 p-2 group cursor-pointer focus:outline-none"
                      >
                        <div className="category-circle w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFEAD3] flex items-center justify-center text-[#D25353] shadow-sm border-2 border-[#EA7B7B]/20">
                          <IconComp className="w-8 h-8 transition-colors group-hover:text-white" />
                        </div>
                        <span className="category-label text-sm font-semibold text-[#2B1717] transition-colors">
                          {cat.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* NEW ARRIVALS SECTION */}
            <section className="py-16 sm:py-24 bg-white border-y border-[#FFEAD3]/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-[#D25353] uppercase mb-1.5">NEW ARRIVALS</p>
                    <h2 className="text-3xl sm:text-4xl font-serif text-[#9E3B3B] leading-tight">Fresh Styles<br />Just For You</h2>
                    <p className="text-[#6E4D4D] text-sm sm:text-base mt-2">
                      Explore the latest trends and add a touch of elegance to your wardrobe.
                    </p>
                  </div>
                  <button 
                    onClick={() => { setCurrentView('shop'); setSortBy('newest'); }}
                    className="btn-outline-comfort px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 4 Product Cards Grid matching reference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
                  {products.slice(0, 4).map((product) => (
                    <div 
                      key={product.id}
                      className="product-card bg-white rounded-2xl overflow-hidden border border-[#E6D8CD]/70 shadow-sm flex flex-col group cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {/* Image Container with Badges */}
                      <div className="relative aspect-[3/4] bg-[#FAF4EF] overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="product-img w-full h-full object-cover transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        {product.isNew && (
                          <span className="absolute top-3.5 left-3.5 bg-[#9E3B3B] text-[#FFF8F2] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                            New
                          </span>
                        )}
                        <button 
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm transition hover:scale-110 ${
                            wishlist.includes(product.id) ? 'text-[#D25353] fill-[#D25353]' : 'text-gray-400 hover:text-[#D25353]'
                          }`}
                          aria-label="Save to wishlist"
                        >
                          <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-[#D25353]' : ''}`} />
                        </button>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 sm:p-5 flex flex-col flex-grow">
                        <span className="text-[11px] font-semibold text-[#D25353] uppercase tracking-wider mb-1">
                          {product.category}
                        </span>
                        <h3 className="font-semibold text-base text-[#2B1717] group-hover:text-[#9E3B3B] transition-colors mb-1.5 line-clamp-1">
                          {product.name}
                        </h3>

                        {/* Stars */}
                        <div className="flex items-center gap-1.5 text-xs text-[#E29548] mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#E29548]" />
                            ))}
                          </div>
                          <span className="text-gray-400 font-medium">({product.reviews})</span>
                        </div>

                        {/* Bottom Row: Price & Quick Add */}
                        <div className="mt-auto pt-3 border-t border-[#FFEAD3]/70 flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-[#9E3B3B]">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                              <span className="text-xs text-gray-400 line-through ml-2">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>

                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product, 'M', 1);
                            }}
                            className="w-9 h-9 rounded-full bg-[#FFEAD3] text-[#9E3B3B] hover:bg-[#9E3B3B] hover:text-[#FFF8F2] flex items-center justify-center transition-colors shadow-sm"
                            aria-label="Add to bag"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* ABOUT / BRAND STORY SECTION */}
            <section className="py-20 sm:py-24 bg-[#FFF5EC] overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  
                  {/* Left: Editorial Image */}
                  <div className="lg:col-span-5">
                    <div className="rounded-[28px] overflow-hidden shadow-2xl border-8 border-white bg-white">
                      <img 
                        src={ABOUT_STORY_IMG} 
                        alt="Comfort Artisanal Tailoring & Women's Fashion" 
                        className="w-full h-[450px] sm:h-[500px] object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Right: Brand Story Copy */}
                  <div className="lg:col-span-7 space-y-6">
                    <p className="text-xs font-bold tracking-[0.2em] text-[#D25353] uppercase">OUR STORY</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#9E3B3B] leading-tight">
                      Comfort Is More<br />Than Just A Brand
                    </h2>
                    <p className="text-base sm:text-lg text-[#5C3D3D] leading-relaxed">
                      We believe every girl deserves to feel beautiful, confident and comfortable — every single day. Our outfits are crafted with love, quality and a passion for modern femininity. We rethink each stitch, choosing hypoallergenic fibers and relaxed tailoring that celebrate your natural grace.
                    </p>

                    {/* Three Feature Points */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="bg-white p-4 rounded-xl border border-[#FFEAD3] shadow-sm text-center">
                        <Feather className="w-6 h-6 text-[#D25353] mx-auto mb-2" />
                        <span className="text-xs font-bold text-[#2B1717] block">Premium Quality Fabrics</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-[#FFEAD3] shadow-sm text-center">
                        <Clock className="w-6 h-6 text-[#D25353] mx-auto mb-2" />
                        <span className="text-xs font-bold text-[#2B1717] block">Trendy & Timeless Designs</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-[#FFEAD3] shadow-sm text-center">
                        <Heart className="w-6 h-6 text-[#D25353] mx-auto mb-2" />
                        <span className="text-xs font-bold text-[#2B1717] block">Made for Every You</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        onClick={() => setCurrentView('about')}
                        className="btn-comfort px-8 py-3.5 rounded-full text-sm font-semibold"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* NEWSLETTER BANNER */}
            <section className="bg-[#9E3B3B] text-[#FFF8F2] py-20 px-4 relative overflow-hidden">
              <div className="max-w-2xl mx-auto text-center relative z-10 space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFEAD3]">VIP Stylist Circle</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FFEAD3]">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-sm sm:text-base text-[#FFF8F2]/80 max-w-lg mx-auto leading-relaxed">
                  Be the first to know about new arrivals, exclusive offers and style tips.
                </p>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) {
                      showToast('Welcome to Comfort! Check your inbox for 10% off.');
                      setNewsletterEmail('');
                    }
                  }}
                  className="pt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input 
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="flex-grow px-5 py-3.5 rounded-full bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#EA7B7B] text-sm"
                  />
                  <button 
                    type="submit"
                    className="bg-[#D25353] hover:bg-[#EA7B7B] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-md cursor-pointer whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </section>
          </>
        )}

        {/* SHOP ALL CATALOG VIEW */}
        {currentView === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
            
            {/* Header & Breadcrumb */}
            <div className="flex flex-col sm:flex-row justify-between items-baseline border-b border-[#FFEAD3] pb-6 mb-8 gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif text-[#9E3B3B]">Shop All Outfits</h1>
                <p className="text-xs sm:text-sm text-[#7A5858] mt-1">Showing {filteredProducts.length} thoughtfully designed styles</p>
              </div>

              {/* Sort & Search in header */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search styles..."
                    className="pl-9 pr-4 py-2 text-xs rounded-full border border-[#FFEAD3] bg-white focus:outline-none focus:ring-1 focus:ring-[#9E3B3B] w-48 sm:w-60"
                  />
                </div>

                <select 
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-full border border-[#FFEAD3] bg-white text-xs text-[#2B1717] focus:outline-none font-medium cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="newest">Sort: Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Layout: Sidebar Filter + Product Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              
              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl border border-[#FFEAD3]">
                {/* Categories */}
                <div>
                  <h3 className="font-serif text-lg text-[#9E3B3B] mb-3 font-semibold">Categories</h3>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <button 
                      onClick={() => setSelectedCategory('all')}
                      className={`block w-full text-left py-1.5 px-2 rounded-md transition ${selectedCategory === 'all' ? 'bg-[#FFEAD3] text-[#9E3B3B] font-bold' : 'text-[#5C3D3D] hover:text-[#9E3B3B]'}`}
                    >
                      All Collections ({INITIAL_PRODUCTS.length})
                    </button>
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat.slug}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`block w-full text-left py-1.5 px-2 rounded-md transition ${selectedCategory === cat.slug ? 'bg-[#FFEAD3] text-[#9E3B3B] font-bold' : 'text-[#5C3D3D] hover:text-[#9E3B3B]'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizing Filter */}
                <div className="border-t border-[#FFEAD3] pt-5">
                  <h3 className="font-serif text-lg text-[#9E3B3B] mb-3 font-semibold">Filter by Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {['ALL', 'XS', 'S', 'M', 'L', 'XL'].map(s => (
                      <button 
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                          selectedSize === s 
                            ? 'bg-[#9E3B3B] text-white border-[#9E3B3B]' 
                            : 'bg-white text-[#2B1717] border-[#FFEAD3] hover:border-[#EA7B7B]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Price Slider */}
                <div className="border-t border-[#FFEAD3] pt-5">
                  <div className="flex justify-between items-center mb-2 text-xs font-semibold">
                    <span className="text-[#9E3B3B]">Max Price</span>
                    <span className="text-[#D25353]">${maxPrice}</span>
                  </div>
                  <input 
                    type="range"
                    min="30"
                    max="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#9E3B3B]"
                  />
                </div>

                {/* Reset Filters */}
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSize('ALL');
                    setMaxPrice(100);
                    setSearchQuery('');
                  }}
                  className="w-full py-2 rounded-full border border-[#9E3B3B] text-[#9E3B3B] text-xs font-semibold hover:bg-[#9E3B3B] hover:text-white transition"
                >
                  Reset All Filters
                </button>
              </aside>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <div 
                        key={product.id}
                        className="product-card bg-white rounded-2xl overflow-hidden border border-[#E6D8CD]/70 shadow-sm flex flex-col group cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <div className="relative aspect-[3/4] bg-[#FAF4EF] overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="product-img w-full h-full object-cover transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          {product.isNew && (
                            <span className="absolute top-3 left-3 bg-[#9E3B3B] text-[#FFF8F2] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                          <button 
                            onClick={(e) => toggleWishlist(product.id, e)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition"
                          >
                            <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'text-[#D25353] fill-[#D25353]' : 'text-gray-400'}`} />
                          </button>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <span className="text-[10px] font-semibold text-[#D25353] uppercase mb-1">{product.category}</span>
                          <h3 className="font-semibold text-sm sm:text-base text-[#2B1717] group-hover:text-[#9E3B3B] transition line-clamp-1 mb-1">{product.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-[#E29548] mb-3">
                            <Star className="w-3.5 h-3.5 fill-[#E29548]" />
                            <span className="font-bold text-[#2B1717]">{product.rating}</span>
                            <span className="text-gray-400">({product.reviews})</span>
                          </div>
                          <div className="mt-auto pt-2 border-t border-[#FFEAD3]/70 flex items-center justify-between">
                            <span className="font-bold text-[#9E3B3B]">${product.price.toFixed(2)}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product, 'M', 1);
                              }}
                              className="w-8 h-8 rounded-full bg-[#FFEAD3] text-[#9E3B3B] hover:bg-[#9E3B3B] hover:text-white flex items-center justify-center transition"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-12 rounded-2xl border border-[#FFEAD3] text-center">
                    <p className="text-lg font-serif text-[#9E3B3B] mb-2">No matching silhouettes found</p>
                    <p className="text-sm text-[#7A5858] mb-6">Try relaxing your size or price filters to explore our collection.</p>
                    <button 
                      onClick={() => { setSelectedCategory('all'); setSelectedSize('ALL'); setMaxPrice(100); setSearchQuery(''); }}
                      className="btn-comfort px-6 py-2.5 rounded-full text-xs font-semibold"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ABOUT VIEW */}
        {currentView === 'about' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D25353]">About Comfort</span>
              <h1 className="text-4xl sm:text-5xl font-serif text-[#9E3B3B]">Outfits For Every You</h1>
              <p className="text-base sm:text-lg text-[#5C3D3D] leading-relaxed">
                Created with the conviction that no woman should ever have to trade bodily freedom for high fashion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div className="rounded-3xl overflow-hidden shadow-xl border-8 border-white">
                <img 
                  src={ABOUT_STORY_IMG} 
                  alt="Comfort Atelier and Design Team" 
                  className="w-full h-[440px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-5 text-[#5C3D3D] text-base leading-relaxed">
                <h2 className="text-2xl sm:text-3xl font-serif text-[#9E3B3B]">The Comfort Standard</h2>
                <p>
                  Every piece in our catalogue begins with fabric exploration. We source high-grade plant fibers, breathable long-staple cottons, and rich modal knits that rest like silk against sensitive skin.
                </p>
                <p>
                  Our design atelier in Milan and New York crafts silhouettes that flatter effortlessly without binding, pinching, or restrictive boning. From morning school drop-offs to executive boardrooms and twilight dinner dates, Comfort moves with you.
                </p>
                <div className="pt-2 flex gap-8">
                  <div>
                    <span className="block text-3xl font-serif font-bold text-[#9E3B3B]">100%</span>
                    <span className="text-xs text-[#7A5858]">Pure Soft Fibers</span>
                  </div>
                  <div>
                    <span className="block text-3xl font-serif font-bold text-[#9E3B3B]">45k+</span>
                    <span className="text-xs text-[#7A5858]">Confident Women</span>
                  </div>
                  <div>
                    <span className="block text-3xl font-serif font-bold text-[#9E3B3B]">Zero</span>
                    <span className="text-xs text-[#7A5858]">Stiff Seams</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT VIEW */}
        {currentView === 'contact' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center mb-12 space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D25353]">Customer Concierge</span>
              <h1 className="text-4xl font-serif text-[#9E3B3B]">We’re Here For You</h1>
              <p className="text-sm sm:text-base text-[#7A5858]">
                Questions about fabric weights, fit consultations, or order care? Reach out anytime.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#FFEAD3] shadow-sm">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.currentTarget;
                  const nameInput = target.elements[0] as HTMLInputElement;
                  const emailInput = target.elements[1] as HTMLInputElement;
                  const subjectInput = target.elements[2] as HTMLInputElement;
                  const messageInput = target.elements[3] as HTMLTextAreaElement;
                  setInquiries(prev => [
                    {
                      id: Date.now(),
                      name: nameInput?.value || 'Storefront Visitor',
                      email: emailInput?.value || 'visitor@example.com',
                      subject: subjectInput?.value || 'Boutique Stylist Inquiry',
                      message: messageInput?.value || 'Inquiry submitted from contact form.',
                      date: 'Just now',
                      status: 'New'
                    },
                    ...prev
                  ]);
                  showToast('Thank you! Our personal stylist will reply within 24 hours.');
                  target.reset();
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#2B1717] mb-1.5">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Eleanor Vance" 
                      className="w-full px-4 py-3 rounded-xl border border-[#FFEAD3] focus:outline-none focus:ring-2 focus:ring-[#9E3B3B] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2B1717] mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="eleanor@example.com" 
                      className="w-full px-4 py-3 rounded-xl border border-[#FFEAD3] focus:outline-none focus:ring-2 focus:ring-[#9E3B3B] text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B1717] mb-1.5">Subject / Order ID</label>
                  <input 
                    type="text" 
                    placeholder="Sizing consultation for Floral Maxi Dress" 
                    className="w-full px-4 py-3 rounded-xl border border-[#FFEAD3] focus:outline-none focus:ring-2 focus:ring-[#9E3B3B] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B1717] mb-1.5">How Can We Assist You?</label>
                  <textarea 
                    rows={4} 
                    required 
                    placeholder="Tell us what you need help with..."
                    className="w-full px-4 py-3 rounded-xl border border-[#FFEAD3] focus:outline-none focus:ring-2 focus:ring-[#9E3B3B] text-sm resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="btn-comfort w-full py-4 rounded-full text-sm font-semibold shadow-md"
                >
                  Send Message to Stylist
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#7D2828] text-[#FFF8F2] pt-16 pb-10 border-t border-[#9E3B3B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
            
            {/* Col 1: Brand & Tagline */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-2xl p-3 inline-block shadow-md">
                  <img 
                    src={LOGO_IMG} 
                    alt="Comfort - Outfits For Every You" 
                    className="h-14 sm:h-16 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <p className="text-xs font-bold tracking-[0.25em] text-[#FFEAD3] uppercase">
                OUTFITS FOR EVERY YOU
              </p>
              <p className="text-xs text-[#FFF8F2]/75 max-w-sm leading-relaxed">
                Elevated women's fashion crafted with buttery soft textiles, intentional tailoring, and timeless elegance for every chapter of your day.
              </p>
              {/* Socials */}
              <div className="pt-2 flex items-center gap-3">
                {['Facebook', 'Instagram', 'Pinterest', 'TikTok', 'YouTube'].map(net => (
                  <button 
                    key={net}
                    onClick={() => showToast(`Opening Comfort on ${net}`)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D25353] text-[#FFEAD3] flex items-center justify-center text-xs font-bold transition hover:-translate-y-0.5"
                    title={net}
                  >
                    {net[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-sm font-semibold text-[#FFEAD3] mb-4 uppercase tracking-wider">Explore</h4>
              <ul className="space-y-2.5 text-xs text-[#FFF8F2]/80">
                <li><button onClick={() => setCurrentView('home')} className="hover:text-white transition">Home</button></li>
                <li><button onClick={() => setCurrentView('shop')} className="hover:text-white transition">Shop All</button></li>
                <li><button onClick={() => { setCurrentView('shop'); setSortBy('newest'); }} className="hover:text-white transition">New Arrivals</button></li>
                <li><button onClick={() => setCurrentView('shop')} className="hover:text-white transition">Collections</button></li>
                <li><button onClick={() => setCurrentView('about')} className="hover:text-white transition">About Us</button></li>
                <li><button onClick={() => setCurrentView('contact')} className="hover:text-white transition">Contact</button></li>
              </ul>
            </div>

            {/* Col 3: Customer Care */}
            <div>
              <h4 className="text-sm font-semibold text-[#FFEAD3] mb-4 uppercase tracking-wider">Customer Care</h4>
              <ul className="space-y-2.5 text-xs text-[#FFF8F2]/80">
                <li><button onClick={() => setCurrentView('contact')} className="hover:text-white transition">Size & Fit Guide</button></li>
                <li><button onClick={() => setCurrentView('contact')} className="hover:text-white transition">Shipping & Delivery</button></li>
                <li><button onClick={() => setCurrentView('contact')} className="hover:text-white transition">Easy 30-Day Returns</button></li>
                <li><button onClick={() => setCurrentView('contact')} className="hover:text-white transition">Order Tracking</button></li>
                <li><button onClick={() => setCurrentView('contact')} className="hover:text-white transition">FAQs</button></li>
              </ul>
            </div>

            {/* Col 4: Community & Script */}
            <div>
              <h4 className="text-sm font-semibold text-[#FFEAD3] mb-4 uppercase tracking-wider">Community</h4>
              <p className="text-xs text-[#FFF8F2]/75 leading-relaxed mb-4">
                Share your daily Comfort look on Instagram with <strong className="text-[#FFEAD3]">#ComfortEveryYou</strong>.
              </p>
              <div className="font-script text-2xl text-[#FFEAD3]">
                Style ♥ Comfort ♥ You
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Payment Badges */}
          <div className="border-t border-[#9E3B3B]/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF8F2]/60">
            <div>
              © 2025 Comfort. All rights reserved.
            </div>
            <div className="flex items-center gap-3 text-[11px] font-medium text-[#FFEAD3]/90">
              <span className="bg-white/10 px-2.5 py-1 rounded">Visa</span>
              <span className="bg-white/10 px-2.5 py-1 rounded">Mastercard</span>
              <span className="bg-white/10 px-2.5 py-1 rounded">PayPal</span>
              <span className="bg-white/10 px-2.5 py-1 rounded">American Express</span>
            </div>
          </div>
        </div>
      </footer>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative border border-[#FFEAD3] my-8 animate-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#2B1717] flex items-center justify-center shadow-md transition"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-[3/4] bg-[#FAF4EF]">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Details & Buy Form */}
              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D25353]">{selectedProduct.category}</span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#9E3B3B] mt-1 mb-2">{selectedProduct.name}</h2>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 text-xs text-[#E29548] mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#E29548]" />
                      ))}
                    </div>
                    <span className="text-[#2B1717] font-semibold">{selectedProduct.rating}</span>
                    <span className="text-gray-400">({selectedProduct.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl font-bold text-[#9E3B3B]">${selectedProduct.price.toFixed(2)}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">${selectedProduct.originalPrice.toFixed(2)}</span>
                    )}
                    <span className="bg-[#FFEAD3] text-[#9E3B3B] text-[10px] font-bold px-2 py-0.5 rounded-full">In Stock</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#5C3D3D] leading-relaxed mb-6 border-y border-[#FFEAD3] py-4">
                    {selectedProduct.description}
                  </p>

                  {/* Sizes */}
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2 text-xs font-semibold">
                      <span className="text-[#2B1717]">Select Size:</span>
                      <span className="text-[#D25353] cursor-pointer">True to size</span>
                    </div>
                    <div className="flex gap-2">
                      {selectedProduct.sizes.map(s => (
                        <button 
                          key={s}
                          className="px-3.5 py-1.5 rounded-lg border border-[#FFEAD3] hover:border-[#9E3B3B] text-xs font-semibold text-[#2B1717] focus:bg-[#9E3B3B] focus:text-white transition"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="mb-6 text-xs">
                    <span className="font-semibold text-[#2B1717]">Available Shades: </span>
                    <span className="text-[#7A5858]">{selectedProduct.colors.join(', ')}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct, 'M', 1);
                      setSelectedProduct(null);
                    }}
                    className="btn-comfort flex-grow py-3.5 rounded-full text-sm font-semibold shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Bag
                  </button>
                  <button 
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className="p-3.5 rounded-full border border-[#FFEAD3] hover:bg-[#FFEAD3]/50 text-[#D25353] transition"
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(selectedProduct.id) ? 'fill-[#D25353]' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SHOPPING BAG DRAWER */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-[#FFF8F2] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#FFEAD3] animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#FFEAD3] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-[#9E3B3B]">Your Shopping Bag</h3>
                <span className="text-xs text-[#7A5858]">{cartCount} items selected</span>
              </div>
              <button 
                onClick={() => setCartDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-[#FFEAD3] text-[#2B1717] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Alert Banner */}
            <div className="px-6 py-3 bg-[#FFEAD3] text-xs font-semibold text-[#9E3B3B] border-b border-[#EA7B7B]/30 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#D25353] shrink-0" />
              <span>
                {freeShippingDifference === 0 
                  ? '🎉 You have unlocked complimentary standard delivery!' 
                  : `Add $${freeShippingDifference.toFixed(2)} more to unlock Free Shipping!`}
              </span>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cart.length > 0 ? (
                cart.map(item => (
                  <div key={`${item.product.id}_${item.size}`} className="flex gap-4 p-3 bg-white rounded-xl border border-[#FFEAD3] shadow-xs">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-16 h-20 object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-xs text-[#2B1717] line-clamp-1">{item.product.name}</h4>
                          <span className="text-[11px] text-[#7A5858]">Size: {item.size}</span>
                        </div>
                        <span className="font-bold text-xs text-[#9E3B3B]">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-[#FFEAD3] rounded-full px-2 py-0.5 text-xs bg-[#FFF8F2]">
                          <button 
                            onClick={() => updateCartQuantity(item.product.id, item.size, -1)}
                            className="p-0.5 text-[#9E3B3B] hover:text-[#D25353]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-semibold text-xs">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(item.product.id, item.size, 1)}
                            className="p-0.5 text-[#9E3B3B] hover:text-[#D25353]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-gray-400 hover:text-red-500 text-xs"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-[#EA7B7B]/50 mx-auto mb-3" />
                  <p className="font-serif text-lg text-[#9E3B3B] mb-1">Your bag is empty</p>
                  <p className="text-xs text-[#7A5858]">Add your favorite dresses or co-ords to begin.</p>
                </div>
              )}
            </div>

            {/* Drawer Footer & Checkout */}
            <div className="p-6 bg-white border-t border-[#FFEAD3] space-y-3">
              <div className="flex justify-between text-xs text-[#5C3D3D]">
                <span>Subtotal</span>
                <span className="font-semibold">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#5C3D3D]">
                <span>Standard Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#9E3B3B] border-t border-dashed border-[#FFEAD3] pt-2">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <button 
                disabled={cart.length === 0}
                onClick={() => {
                  setCartDrawerOpen(false);
                  setCheckoutSuccess(true);
                  const generatedId = `CF-${Math.floor(100000 + Math.random() * 900000)}`;
                  const newOrder: AdminOrder = {
                    id: generatedId,
                    customerName: 'Boutique Client',
                    customerEmail: 'client@comfort.com',
                    customerPhone: '+1 (555) 782-9011',
                    shippingAddress: '450 Sutter St, Suite 1200, San Francisco, CA 94108',
                    paymentMethod: 'Credit Card (•••• 4242)',
                    date: 'Just now',
                    items: cart.map(i => ({
                      productName: i.product.name,
                      size: i.size,
                      quantity: i.quantity,
                      price: i.product.price,
                      image: i.product.image
                    })),
                    total: cartTotal,
                    status: 'Processing'
                  };
                  setOrders(prev => [newOrder, ...prev]);
                  setCart([]);
                }}
                className="btn-comfort w-full py-3.5 rounded-full text-sm font-semibold shadow-md disabled:opacity-50"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        </div>
      )}

      {/* WISHLIST MODAL */}
      {wishlistModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto border border-[#FFEAD3] shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-[#FFEAD3] mb-6">
              <div>
                <h3 className="font-serif text-2xl text-[#9E3B3B]">Saved Outfits</h3>
                <span className="text-xs text-[#7A5858]">{wishlist.length} silhouettes saved</span>
              </div>
              <button onClick={() => setWishlistModalOpen(false)} className="p-2 rounded-full hover:bg-[#FFEAD3]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {wishlistProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlistProducts.map(p => (
                  <div key={p.id} className="flex gap-3 p-3 rounded-xl border border-[#FFEAD3] bg-[#FFF8F2]">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-16 h-20 object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="font-semibold text-xs text-[#2B1717] line-clamp-1">{p.name}</h4>
                        <span className="font-bold text-xs text-[#9E3B3B]">${p.price.toFixed(2)}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button 
                          onClick={() => {
                            addToCart(p, 'M', 1);
                            toggleWishlist(p.id);
                          }}
                          className="px-3 py-1 bg-[#9E3B3B] text-white rounded-full text-[11px] font-semibold"
                        >
                          Move to Bag
                        </button>
                        <button 
                          onClick={() => toggleWishlist(p.id)}
                          className="text-gray-400 hover:text-red-500 text-xs px-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-[#EA7B7B]/50 mx-auto mb-2" />
                <p className="font-serif text-lg text-[#9E3B3B]">Your Wishlist is Empty</p>
                <p className="text-xs text-[#7A5858]">Save items as you browse to keep track of your favorites.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT SUCCESS MODAL */}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center border border-[#FFEAD3] shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#FFEAD3] text-[#9E3B3B] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-[#9E3B3B] mb-2">Order Confirmed!</h3>
            <p className="text-xs text-[#7A5858] mb-4">
              Thank you for trusting Comfort. Order reference <strong className="text-[#9E3B3B]">#CF-884129</strong> is being gift-wrapped.
            </p>
            <div className="p-3 bg-[#FFF8F2] rounded-xl text-xs text-[#5C3D3D] mb-6 border border-[#FFEAD3]">
              A confirmation email has been dispatched with tracking credentials.
            </div>
            <button 
              onClick={() => setCheckoutSuccess(false)}
              className="btn-comfort w-full py-3 rounded-full text-xs font-semibold"
            >
              Continue Browsing Comfort
            </button>
          </div>
        </div>
      )}



      {/* INTERACTIVE PROPER ADMIN PORTAL */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-xs flex flex-col animate-in fade-in duration-200">
          {!isAdminLoggedIn ? (
            /* ADMIN LOGIN SCREEN */
            <div className="flex-grow flex items-center justify-center p-4 sm:p-6 bg-[#FAF4EF]/90">
              <div className="bg-[#FFF8F2] rounded-3xl max-w-md w-full p-8 border border-[#FFEAD3] shadow-2xl relative animate-in zoom-in-95">
                <button 
                  onClick={() => setIsAdminOpen(false)}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#FFEAD3] text-[#2B1717] transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                  <img 
                    src={LOGO_IMG} 
                    alt="Comfort" 
                    className="h-16 w-auto mx-auto mb-3 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[11px] font-bold tracking-[0.25em] text-[#D25353] uppercase block">
                    Executive Suite
                  </span>
                  <h3 className="font-serif text-2xl text-[#9E3B3B] mt-1 font-bold">Boutique Administration</h3>
                  <p className="text-xs text-[#7A5858] mt-1.5 leading-relaxed">
                    Sign in with administrator credentials to manage products, inventory, customer orders, and store settings.
                  </p>
                </div>

                {adminLoginError && (
                  <div className="mb-5 p-3 rounded-xl bg-[#FFEAD3] border border-[#EA7B7B] text-[#9E3B3B] text-xs flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0 text-[#D25353]" />
                    <span>{adminLoginError}</span>
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2B1717] mb-1.5">Administrator Username</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#9E3B3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        placeholder="e.g. admin"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#FFEAD3] bg-white text-xs text-[#2B1717] focus:outline-none focus:ring-2 focus:ring-[#9E3B3B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2B1717] mb-1.5">Secure Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#9E3B3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type={showAdminPassword ? "text" : "password"}
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#FFEAD3] bg-white text-xs text-[#2B1717] focus:outline-none focus:ring-2 focus:ring-[#9E3B3B]"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowAdminPassword(!showAdminPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#9E3B3B]"
                      >
                        {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="btn-comfort w-full py-3.5 rounded-full text-xs font-semibold shadow-md cursor-pointer mt-2 flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Log In to Operations Portal</span>
                  </button>
                </form>

                <div className="mt-6 pt-5 border-t border-[#FFEAD3] text-center">
                  <button 
                    onClick={() => setIsAdminOpen(false)}
                    className="text-xs text-[#7A5858] hover:text-[#9E3B3B] font-medium"
                  >
                    ← Return to Storefront
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* FULL-SCREEN EXECUTIVE PORTAL */
            <div className="flex-grow flex flex-col h-full bg-[#FAF4EF] overflow-hidden">
              
              {/* TOP COMMAND HEADER */}
              <header className="h-16 px-4 sm:px-6 bg-white border-b border-[#FFEAD3] flex items-center justify-between gap-4 shrink-0 shadow-xs">
                
                {/* Brand & Status */}
                <div className="flex items-center gap-4">
                  <img 
                    src={LOGO_IMG} 
                    alt="Comfort" 
                    className="h-9 w-auto object-contain cursor-pointer"
                    onClick={() => { setIsAdminOpen(false); setCurrentView('home'); }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="hidden sm:block border-l border-[#FFEAD3] pl-3">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-[#9E3B3B]">Executive Portal</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Store Live
                      </span>
                    </div>
                    <span className="text-[10px] text-[#7A5858] tracking-wider uppercase">Comfort Brand Operations</span>
                  </div>
                </div>

                {/* Global Admin Search Bar */}
                <div className="hidden md:flex items-center flex-grow max-w-md mx-4">
                  <div className="relative w-full">
                    <Search className="w-4 h-4 text-[#9E3B3B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      value={adminSearchQuery}
                      onChange={(e) => setAdminSearchQuery(e.target.value)}
                      placeholder="Search orders, outfits, customers, or coupons..."
                      className="w-full pl-9 pr-4 py-2 rounded-full border border-[#FFEAD3] bg-[#FFF8F2] text-xs text-[#2B1717] focus:outline-none focus:ring-2 focus:ring-[#9E3B3B]"
                    />
                    {adminSearchQuery && (
                      <button 
                        onClick={() => setAdminSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  
                  {/* View Live Storefront Button */}
                  <button 
                    onClick={() => { setIsAdminOpen(false); showToast('Viewing customer storefront.'); }}
                    className="btn-outline-comfort px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0"
                    title="Switch to customer storefront"
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">View Storefront</span>
                  </button>

                  {/* Admin User Profile */}
                  <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFEAD3]/40 border border-[#FFEAD3]">
                    <div className="w-6 h-6 rounded-full bg-[#9E3B3B] text-white text-[10px] font-bold flex items-center justify-center">
                      IJ
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-bold text-[#2B1717] leading-none">Iqra Javaid</span>
                      <span className="text-[9px] text-[#7A5858]">Super Administrator</span>
                    </div>
                  </div>

                  {/* Log Out */}
                  <button 
                    onClick={handleAdminLogout}
                    className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#FFEAD3] text-[#9E3B3B] hover:bg-[#EA7B7B] hover:text-white transition text-xs font-semibold flex items-center gap-1.5"
                    title="Log Out of Admin Portal"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Log Out</span>
                  </button>

                  {/* Close Portal Button */}
                  <button 
                    onClick={() => setIsAdminOpen(false)}
                    className="p-2 rounded-full hover:bg-[#FFEAD3] text-[#7A5858] transition"
                    aria-label="Close Admin Portal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </header>

              {/* PORTAL BODY: SIDEBAR + MAIN CONTENT */}
              <div className="flex-grow flex overflow-hidden">
                
                {/* LEFT SIDEBAR NAVIGATION */}
                <aside className="w-64 bg-white border-r border-[#FFEAD3] flex flex-col justify-between shrink-0 overflow-y-auto hidden md:flex">
                  <div className="p-4 space-y-1">
                    <p className="px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#7A5858]">
                      Management Modules
                    </p>

                    <button 
                      onClick={() => setAdminActiveTab('overview')}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        adminActiveTab === 'overview'
                          ? 'bg-[#9E3B3B] text-white shadow-xs'
                          : 'text-[#2B1717] hover:bg-[#FFEAD3]/60 hover:text-[#9E3B3B]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <BarChart3 className="w-4 h-4" />
                        <span>Executive Dashboard</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => setAdminActiveTab('products')}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        adminActiveTab === 'products'
                          ? 'bg-[#9E3B3B] text-white shadow-xs'
                          : 'text-[#2B1717] hover:bg-[#FFEAD3]/60 hover:text-[#9E3B3B]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Package className="w-4 h-4" />
                        <span>Outfits & Catalog</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        adminActiveTab === 'products' ? 'bg-white/20 text-white' : 'bg-[#FFEAD3] text-[#9E3B3B]'
                      }`}>
                        {products.length}
                      </span>
                    </button>

                    <button 
                      onClick={() => setAdminActiveTab('orders')}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        adminActiveTab === 'orders'
                          ? 'bg-[#9E3B3B] text-white shadow-xs'
                          : 'text-[#2B1717] hover:bg-[#FFEAD3]/60 hover:text-[#9E3B3B]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <ListOrdered className="w-4 h-4" />
                        <span>Customer Orders</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        adminActiveTab === 'orders' ? 'bg-white/20 text-white' : 'bg-[#D25353] text-white'
                      }`}>
                        {orders.filter(o => o.status === 'Processing').length} pending
                      </span>
                    </button>

                    <button 
                      onClick={() => setAdminActiveTab('inquiries')}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        adminActiveTab === 'inquiries'
                          ? 'bg-[#9E3B3B] text-white shadow-xs'
                          : 'text-[#2B1717] hover:bg-[#FFEAD3]/60 hover:text-[#9E3B3B]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <MessageSquare className="w-4 h-4" />
                        <span>Stylist Inquiries</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        adminActiveTab === 'inquiries' ? 'bg-white/20 text-white' : 'bg-[#FFEAD3] text-[#9E3B3B]'
                      }`}>
                        {inquiries.filter(i => i.status === 'New').length} new
                      </span>
                    </button>

                    <button 
                      onClick={() => setAdminActiveTab('discounts')}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        adminActiveTab === 'discounts'
                          ? 'bg-[#9E3B3B] text-white shadow-xs'
                          : 'text-[#2B1717] hover:bg-[#FFEAD3]/60 hover:text-[#9E3B3B]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Tag className="w-4 h-4" />
                        <span>Coupons & Promos</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        adminActiveTab === 'discounts' ? 'bg-white/20 text-white' : 'bg-[#FFEAD3] text-[#9E3B3B]'
                      }`}>
                        {promos.length}
                      </span>
                    </button>

                    <button 
                      onClick={() => setAdminActiveTab('subscribers')}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        adminActiveTab === 'subscribers'
                          ? 'bg-[#9E3B3B] text-white shadow-xs'
                          : 'text-[#2B1717] hover:bg-[#FFEAD3]/60 hover:text-[#9E3B3B]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4" />
                        <span>VIP Subscribers</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        adminActiveTab === 'subscribers' ? 'bg-white/20 text-white' : 'bg-[#FFEAD3] text-[#9E3B3B]'
                      }`}>
                        {subscribers.length}
                      </span>
                    </button>

                    <button 
                      onClick={() => setAdminActiveTab('settings')}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        adminActiveTab === 'settings'
                          ? 'bg-[#9E3B3B] text-white shadow-xs'
                          : 'text-[#2B1717] hover:bg-[#FFEAD3]/60 hover:text-[#9E3B3B]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Settings className="w-4 h-4" />
                        <span>Storefront Settings</span>
                      </div>
                    </button>
                  </div>

                  {/* Sidebar Bottom Quick Card */}
                  <div className="p-4 border-t border-[#FFEAD3]">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FFEAD3] to-[#FFF3E6] border border-[#EA7B7B]/30 space-y-2">
                      <div className="flex items-center gap-2 text-[#9E3B3B]">
                        <Sparkles className="w-4 h-4 text-[#D25353]" />
                        <span className="font-serif font-bold text-xs">Comfort Boutique</span>
                      </div>
                      <p className="text-[11px] text-[#7A5858] leading-tight">
                        All updates take effect in real time across the storefront.
                      </p>
                      <button 
                        onClick={() => {
                          setEditingProductId(null);
                          setNewProductForm({
                            name: '',
                            category: 'Dresses',
                            categorySlug: 'dresses',
                            price: 49.99,
                            originalPrice: 69.99,
                            stock: 30,
                            description: '',
                            image: FLORAL_MAXI_IMG,
                            isNew: true,
                          });
                          setShowAddProductModal(true);
                        }}
                        className="btn-comfort w-full py-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>+ Add New Outfit</span>
                      </button>
                    </div>
                  </div>
                </aside>

                {/* MOBILE HORIZONTAL TABS */}
                <div className="md:hidden flex-none w-full bg-white border-b border-[#FFEAD3] overflow-x-auto flex items-center px-4 py-2 gap-2">
                  {[
                    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
                    { id: 'products', label: 'Outfits', icon: Package },
                    { id: 'orders', label: 'Orders', icon: ListOrdered },
                    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
                    { id: 'discounts', label: 'Coupons', icon: Tag },
                    { id: 'subscribers', label: 'Subscribers', icon: Mail },
                    { id: 'settings', label: 'Settings', icon: Settings },
                  ].map(tab => {
                    const IconComp = tab.icon;
                    return (
                      <button 
                        key={tab.id}
                        onClick={() => setAdminActiveTab(tab.id as any)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                          adminActiveTab === tab.id ? 'bg-[#9E3B3B] text-white' : 'bg-[#FFEAD3]/50 text-[#7A5858]'
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* MAIN WORKSPACE CONTENT */}
                <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  
                  {/* TAB 1: EXECUTIVE DASHBOARD */}
                  {adminActiveTab === 'overview' && (
                    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in">
                      
                      {/* Top Welcome Banner */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#9E3B3B] via-[#B84848] to-[#D25353] p-6 rounded-3xl text-white shadow-md">
                        <div>
                          <span className="text-[11px] font-bold tracking-[0.2em] text-[#FFEAD3] uppercase">
                            Operational Dashboard
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-1">
                            Welcome, Iqra Javaid
                          </h2>
                          <p className="text-xs text-[#FFEAD3]/90 mt-1 max-w-xl">
                            Here is what is happening across Comfort today. 3 customer orders await packaging and 1 client styling inquiry is pending.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setAdminActiveTab('orders')}
                            className="px-4 py-2 rounded-full bg-white text-[#9E3B3B] text-xs font-bold hover:bg-[#FFEAD3] transition"
                          >
                            Fulfill Orders ({orders.filter(o => o.status === 'Processing').length})
                          </button>
                        </div>
                      </div>

                      {/* 4 KPI Metrics */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-[#FFEAD3] shadow-xs">
                          <div className="flex items-center justify-between text-[#7A5858] mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
                            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                              <DollarSign className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="flex items-baseline justify-between">
                            <span className="text-2xl font-serif font-bold text-[#9E3B3B]">$14,890.00</span>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">+18.4%</span>
                          </div>
                          <span className="text-[11px] text-gray-400 mt-1 block">vs. previous 30 days</span>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-[#FFEAD3] shadow-xs">
                          <div className="flex items-center justify-between text-[#7A5858] mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
                            <div className="w-8 h-8 rounded-full bg-[#FFEAD3] text-[#D25353] flex items-center justify-center">
                              <ShoppingBag className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="flex items-baseline justify-between">
                            <span className="text-2xl font-serif font-bold text-[#9E3B3B]">{orders.length}</span>
                            <span className="text-xs font-bold text-[#D25353] bg-[#FFEAD3] px-2 py-0.5 rounded-full">
                              {orders.filter(o => o.status === 'Processing').length} To Ship
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400 mt-1 block">Avg. fulfillment: 24 hrs</span>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-[#FFEAD3] shadow-xs">
                          <div className="flex items-center justify-between text-[#7A5858] mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wider">Avg Order Value</span>
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                              <TrendingUp className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="flex items-baseline justify-between">
                            <span className="text-2xl font-serif font-bold text-[#9E3B3B]">$124.08</span>
                            <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">+6.2%</span>
                          </div>
                          <span className="text-[11px] text-gray-400 mt-1 block">Top bundle: Co-ord + Maxi</span>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-[#FFEAD3] shadow-xs">
                          <div className="flex items-center justify-between text-[#7A5858] mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wider">Live Outfits</span>
                            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                              <Package className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="flex items-baseline justify-between">
                            <span className="text-2xl font-serif font-bold text-[#9E3B3B]">{products.length}</span>
                            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                              {products.filter(p => p.stock < 15).length} Low Stock
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400 mt-1 block">Across 7 silhouettes</span>
                        </div>
                      </div>

                      {/* Revenue Visual & Weekly Performance */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Weekly Sales Chart */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#FFEAD3] shadow-xs space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-serif text-lg font-bold text-[#9E3B3B]">Weekly Sales Revenue</h4>
                              <p className="text-xs text-[#7A5858]">Gross revenue captured over the past 7 days</p>
                            </div>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                              Total this week: $18,420
                            </span>
                          </div>

                          {/* CSS Bar Chart */}
                          <div className="h-48 pt-6 flex items-end justify-between gap-3 sm:gap-6 border-b border-[#FFEAD3]">
                            {[
                              { day: 'Mon', amount: '$2,140', height: '55%' },
                              { day: 'Tue', amount: '$2,680', height: '70%' },
                              { day: 'Wed', amount: '$1,920', height: '48%' },
                              { day: 'Thu', amount: '$3,150', height: '82%' },
                              { day: 'Fri', amount: '$3,890', height: '100%' },
                              { day: 'Sat', amount: '$2,740', height: '72%' },
                              { day: 'Sun', amount: '$1,900', height: '45%' },
                            ].map((bar, idx) => (
                              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                                <span className="text-[10px] font-bold text-[#9E3B3B] opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                  {bar.amount}
                                </span>
                                <div 
                                  style={{ height: bar.height }} 
                                  className="w-full bg-gradient-to-t from-[#9E3B3B] to-[#D25353] rounded-t-lg transition-transform group-hover:scale-105"
                                />
                                <span className="text-[11px] font-semibold text-[#7A5858] pb-1">{bar.day}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Urgent Action Center */}
                        <div className="bg-white p-6 rounded-3xl border border-[#FFEAD3] shadow-xs space-y-4">
                          <h4 className="font-serif text-lg font-bold text-[#9E3B3B] flex items-center gap-2">
                            <Bell className="w-4 h-4 text-[#D25353]" />
                            <span>Action Center</span>
                          </h4>
                          <div className="space-y-3 text-xs">
                            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5">
                              <Package className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="font-bold block">3 Orders Awaiting Fulfillment</strong>
                                <span className="text-[11px] text-amber-800">Dispatch with tracking before 5:00 PM for next-day delivery.</span>
                              </div>
                            </div>

                            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-2.5">
                              <MessageSquare className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="font-bold block">1 Client Stylist Inquiry</strong>
                                <span className="text-[11px] text-rose-800">Eleanor Vance asked about Floral Maxi Dress sizing.</span>
                              </div>
                            </div>

                            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2.5">
                              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="font-bold block">VIP Club Growing</strong>
                                <span className="text-[11px] text-emerald-800">{subscribers.length} total subscribers registered for newsletter.</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Recent Orders Overview */}
                      <div className="bg-white p-6 rounded-3xl border border-[#FFEAD3] shadow-xs space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-serif text-lg font-bold text-[#9E3B3B]">Recent Customer Orders</h4>
                            <p className="text-xs text-[#7A5858]">Latest purchases received from the boutique storefront</p>
                          </div>
                          <button 
                            onClick={() => setAdminActiveTab('orders')}
                            className="text-xs font-bold text-[#D25353] hover:underline"
                          >
                            View All Orders →
                          </button>
                        </div>

                        <div className="divide-y divide-[#FFEAD3]">
                          {orders.slice(0, 3).map(ord => (
                            <div key={ord.id} className="py-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#FFEAD3] text-[#9E3B3B] flex items-center justify-center font-mono font-bold text-xs">
                                  #{ord.id.slice(-4)}
                                </div>
                                <div>
                                  <span className="font-bold text-xs text-[#2B1717]">{ord.customerName}</span>
                                  <span className="text-[11px] text-[#7A5858] block">
                                    {ord.items.length} item(s) • {ord.date}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 self-end sm:self-center">
                                <span className="font-serif font-bold text-sm text-[#9E3B3B]">${ord.total.toFixed(2)}</span>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  ord.status === 'Processing' ? 'bg-amber-100 text-amber-800' :
                                  ord.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {ord.status}
                                </span>
                                <button 
                                  onClick={() => setSelectedOrderForDetail(ord)}
                                  className="text-xs font-semibold text-[#D25353] hover:underline"
                                >
                                  Details
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 2: PRODUCTS & INVENTORY */}
                  {adminActiveTab === 'products' && (
                    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in">
                      
                      {/* Products Header Bar */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-[#9E3B3B]">Outfits & Catalogue Management</h3>
                          <p className="text-xs text-[#7A5858]">Manage pricing, stock counts, descriptions, and arrival tags for live outfits.</p>
                        </div>
                        <button 
                          onClick={() => {
                            setEditingProductId(null);
                            setNewProductForm({
                              name: '',
                              category: 'Dresses',
                              categorySlug: 'dresses',
                              price: 49.99,
                              originalPrice: 69.99,
                              stock: 30,
                              description: '',
                              image: FLORAL_MAXI_IMG,
                              isNew: true,
                            });
                            setShowAddProductModal(true);
                          }}
                          className="btn-comfort px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                        >
                          <PlusCircle className="w-4 h-4" />
                          <span>Add New Outfit</span>
                        </button>
                      </div>

                      {/* Filters: Category + Stock */}
                      <div className="bg-white p-4 rounded-2xl border border-[#FFEAD3] shadow-xs flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-[#7A5858] mr-1">Category:</span>
                          <button 
                            onClick={() => setProductCategoryFilter('all')}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                              productCategoryFilter === 'all' ? 'bg-[#9E3B3B] text-white' : 'bg-[#FFEAD3]/60 text-[#2B1717] hover:bg-[#FFEAD3]'
                            }`}
                          >
                            All ({products.length})
                          </button>
                          {CATEGORIES.map(c => (
                            <button 
                              key={c.slug}
                              onClick={() => setProductCategoryFilter(c.slug)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                                productCategoryFilter === c.slug ? 'bg-[#9E3B3B] text-white' : 'bg-[#FFEAD3]/60 text-[#2B1717] hover:bg-[#FFEAD3]'
                              }`}
                            >
                              {c.name} ({products.filter(p => p.categorySlug === c.slug).length})
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#7A5858]">Stock Status:</span>
                          <select 
                            value={productStockFilter}
                            onChange={(e) => setProductStockFilter(e.target.value as any)}
                            className="text-xs bg-[#FFF8F2] border border-[#FFEAD3] rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#9E3B3B]"
                          >
                            <option value="all">All Inventory</option>
                            <option value="in-stock">In Stock (&gt;15)</option>
                            <option value="low-stock">Low Stock (&le;15)</option>
                            <option value="out-of-stock">Out of Stock (0)</option>
                          </select>
                        </div>
                      </div>

                      {/* Products Table */}
                      <div className="bg-white rounded-3xl border border-[#FFEAD3] overflow-hidden shadow-xs">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-[#FAF4EF] text-[#7A5858] uppercase tracking-wider font-semibold border-b border-[#FFEAD3]">
                              <tr>
                                <th className="py-3.5 px-5">Outfit & Silhouette</th>
                                <th className="py-3.5 px-4">Category</th>
                                <th className="py-3.5 px-4">Price ($)</th>
                                <th className="py-3.5 px-4">Stock Level</th>
                                <th className="py-3.5 px-4">Badge</th>
                                <th className="py-3.5 px-4">Rating</th>
                                <th className="py-3.5 px-5 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#FFEAD3]">
                              {products
                                .filter(prod => {
                                  const matchesCat = productCategoryFilter === 'all' || prod.categorySlug === productCategoryFilter;
                                  const matchesSearch = !adminSearchQuery || 
                                    prod.name.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                                    prod.category.toLowerCase().includes(adminSearchQuery.toLowerCase());
                                  const matchesStock = 
                                    productStockFilter === 'all' ||
                                    (productStockFilter === 'in-stock' && prod.stock > 15) ||
                                    (productStockFilter === 'low-stock' && prod.stock <= 15 && prod.stock > 0) ||
                                    (productStockFilter === 'out-of-stock' && prod.stock === 0);
                                  return matchesCat && matchesSearch && matchesStock;
                                })
                                .map(prod => (
                                  <tr key={prod.id} className="hover:bg-[#FFF8F2]/60 transition">
                                    <td className="py-3.5 px-5 flex items-center gap-3">
                                      <img 
                                        src={prod.image} 
                                        alt={prod.name} 
                                        className="w-12 h-14 object-cover rounded-xl border border-[#FFEAD3] shadow-2xs"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div>
                                        <span className="font-bold text-[#2B1717] block text-sm">{prod.name}</span>
                                        <span className="text-[10px] text-gray-400">ID: #{prod.id} • {prod.sizes.join(', ')}</span>
                                      </div>
                                    </td>
                                    <td className="py-3.5 px-4 font-semibold text-[#7A5858]">
                                      {prod.category}
                                    </td>
                                    <td className="py-3.5 px-4">
                                      <div className="flex items-center gap-1 font-bold text-[#9E3B3B]">
                                        <span>$</span>
                                        <input 
                                          type="number" 
                                          step="0.01" 
                                          defaultValue={prod.price}
                                          onBlur={(e) => handleUpdateStockPrice(prod.id, parseFloat(e.target.value) || prod.price)}
                                          className="w-16 px-1.5 py-0.5 border border-transparent hover:border-[#FFEAD3] focus:border-[#9E3B3B] rounded bg-transparent focus:bg-white text-xs font-bold text-[#9E3B3B] outline-none"
                                        />
                                      </div>
                                    </td>
                                    <td className="py-3.5 px-4">
                                      <div className="flex items-center gap-2">
                                        <input 
                                          type="number" 
                                          defaultValue={prod.stock}
                                          onBlur={(e) => handleUpdateStockPrice(prod.id, undefined, parseInt(e.target.value, 10) || prod.stock)}
                                          className="w-14 px-1.5 py-0.5 border border-transparent hover:border-[#FFEAD3] focus:border-[#9E3B3B] rounded bg-transparent focus:bg-white text-xs font-semibold text-[#2B1717] outline-none"
                                        />
                                        <span className={`w-2 h-2 rounded-full ${
                                          prod.stock > 15 ? 'bg-emerald-500' : prod.stock > 0 ? 'bg-amber-500' : 'bg-rose-500'
                                        }`} title={prod.stock > 15 ? 'Sufficient Stock' : 'Low Stock Alert'} />
                                      </div>
                                    </td>
                                    <td className="py-3.5 px-4">
                                      <button 
                                        onClick={() => handleToggleProductNew(prod.id)}
                                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                                          prod.isNew ? 'bg-[#9E3B3B] text-white shadow-2xs' : 'bg-gray-100 text-gray-400 hover:text-gray-700'
                                        }`}
                                        title="Click to toggle New Arrival badge"
                                      >
                                        {prod.isNew ? 'New' : 'Standard'}
                                      </button>
                                    </td>
                                    <td className="py-3.5 px-4 text-[#E29548] font-bold">
                                      ★ {prod.rating} <span className="text-[10px] text-gray-400 font-normal">({prod.reviews})</span>
                                    </td>
                                    <td className="py-3.5 px-5 text-right">
                                      <div className="flex items-center justify-end gap-1.5">
                                        <button 
                                          onClick={() => {
                                            setEditingProductId(prod.id);
                                            setNewProductForm({
                                              name: prod.name,
                                              category: prod.category,
                                              categorySlug: prod.categorySlug,
                                              price: prod.price,
                                              originalPrice: prod.originalPrice || 0,
                                              stock: prod.stock,
                                              description: prod.description,
                                              image: prod.image,
                                              isNew: prod.isNew,
                                            });
                                            setShowAddProductModal(true);
                                          }}
                                          className="p-1.5 rounded-lg hover:bg-[#FFEAD3] text-[#9E3B3B] transition"
                                          title="Edit Outfit Details"
                                        >
                                          <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button 
                                          onClick={() => handleDeleteProduct(prod.id)}
                                          className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition"
                                          title="Delete Outfit"
                                        >
                                          <Trash className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 3: CUSTOMER ORDERS */}
                  {adminActiveTab === 'orders' && (
                    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in">
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-[#9E3B3B]">Customer Orders & Logistics</h3>
                          <p className="text-xs text-[#7A5858]">Process shipments, record tracking IDs, and generate packing slips.</p>
                        </div>
                        
                        {/* Order Status Tabs */}
                        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-[#FFEAD3] shadow-xs">
                          {(['all', 'Processing', 'Shipped', 'Delivered'] as const).map(st => (
                            <button 
                              key={st}
                              onClick={() => setOrderStatusFilter(st)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                                orderStatusFilter === st ? 'bg-[#9E3B3B] text-white' : 'text-[#7A5858] hover:text-[#9E3B3B]'
                              }`}
                            >
                              {st === 'all' ? `All (${orders.length})` : `${st} (${orders.filter(o => o.status === st).length})`}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Orders List */}
                      <div className="space-y-3">
                        {orders
                          .filter(ord => {
                            const matchesStatus = orderStatusFilter === 'all' || ord.status === orderStatusFilter;
                            const matchesSearch = !adminSearchQuery ||
                              ord.id.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                              ord.customerName.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                              ord.customerEmail.toLowerCase().includes(adminSearchQuery.toLowerCase());
                            return matchesStatus && matchesSearch;
                          })
                          .map(order => (
                            <div key={order.id} className="bg-white p-5 rounded-3xl border border-[#FFEAD3] shadow-xs hover:border-[#EA7B7B] transition flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2.5">
                                  <span className="font-mono font-bold text-xs text-[#9E3B3B] bg-[#FFEAD3]/70 px-2.5 py-1 rounded-lg">
                                    #{order.id}
                                  </span>
                                  <span className="font-bold text-sm text-[#2B1717]">{order.customerName}</span>
                                  <span className="text-xs text-[#7A5858]">({order.customerEmail})</span>
                                  <span className="text-[11px] text-gray-400">• {order.date}</span>
                                </div>
                                <div className="text-xs text-[#5C3D3D] space-y-0.5 pt-1">
                                  {order.items.map((it, idx) => (
                                    <span key={idx} className="inline-block mr-3">
                                      • {it.quantity}x <strong>{it.productName}</strong> ({it.size})
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-4 text-[11px] text-[#7A5858] pt-1">
                                  <span>Ship to: {order.shippingAddress}</span>
                                  {order.trackingNumber && (
                                    <span className="font-mono text-[#D25353] font-semibold">
                                      Tracking: {order.trackingNumber}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#FFEAD3] self-end lg:self-center">
                                <div className="text-right mr-2">
                                  <span className="text-xs text-[#7A5858] block">Total Paid</span>
                                  <span className="font-serif font-bold text-lg text-[#9E3B3B]">${order.total.toFixed(2)}</span>
                                </div>

                                <button 
                                  onClick={() => handleUpdateOrderStatus(order.id)}
                                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                                    order.status === 'Processing' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                                    'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  }`}
                                  title="Click to advance status"
                                >
                                  <span>{order.status}</span>
                                  <RefreshCw className="w-3 h-3" />
                                </button>

                                <button 
                                  onClick={() => setSelectedOrderForDetail(order)}
                                  className="btn-outline-comfort px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>Packing Slip</span>
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>

                    </div>
                  )}

                  {/* TAB 4: STYLIST INQUIRIES */}
                  {adminActiveTab === 'inquiries' && (
                    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-[#9E3B3B]">Stylist Concierge & Client Support</h3>
                          <p className="text-xs text-[#7A5858]">Inquiries sent by boutique visitors through the contact styling desk.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {inquiries.map(inq => (
                          <div key={inq.id} className="bg-white p-6 rounded-3xl border border-[#FFEAD3] shadow-xs space-y-3">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-sm text-[#2B1717]">{inq.subject}</h4>
                                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    inq.status === 'New' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                                  }`}>
                                    {inq.status === 'New' ? 'Pending Reply' : 'Replied ✓'}
                                  </span>
                                </div>
                                <p className="text-xs text-[#7A5858] mt-0.5">
                                  From: <strong>{inq.name}</strong> ({inq.email}) • Received: {inq.date}
                                </p>
                              </div>
                              <button 
                                onClick={() => {
                                  setSelectedInquiryForReply(inq);
                                  setInquiryReplyText(inq.reply || `Dear ${inq.name},\n\nThank you for reaching out to Comfort. `);
                                }}
                                className="btn-comfort px-4 py-1.5 rounded-full text-xs font-bold self-start flex items-center gap-1.5 shadow-2xs"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>{inq.reply ? 'View / Update Reply' : 'Reply to Client'}</span>
                              </button>
                            </div>

                            <p className="text-xs text-[#5C3D3D] bg-[#FFF8F2] p-4 rounded-2xl border border-[#FFEAD3]/60 italic leading-relaxed">
                              "{inq.message}"
                            </p>

                            {inq.reply && (
                              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                                <span className="font-bold text-[11px] text-emerald-800 block">
                                  Comfort Stylist Response ({inq.repliedAt}):
                                </span>
                                <p className="leading-relaxed">{inq.reply}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 5: COUPONS & DISCOUNTS */}
                  {adminActiveTab === 'discounts' && (
                    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-[#9E3B3B]">Promotions & Coupon Codes</h3>
                          <p className="text-xs text-[#7A5858]">Configure boutique discounts, influencer codes, and seasonal sales.</p>
                        </div>
                        <button 
                          onClick={() => setShowCreatePromoModal(true)}
                          className="btn-comfort px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                        >
                          <PlusCircle className="w-4 h-4" />
                          <span>Create Promo Code</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {promos.map(pr => (
                          <div key={pr.id} className="bg-white p-5 rounded-3xl border border-[#FFEAD3] shadow-xs flex flex-col justify-between space-y-4">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-mono text-base font-bold text-[#9E3B3B] bg-[#FFEAD3]/60 px-3 py-1 rounded-xl">
                                  {pr.code}
                                </span>
                                <button 
                                  onClick={() => handleTogglePromo(pr.id)}
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    pr.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                                  }`}
                                >
                                  {pr.isActive ? 'Active' : 'Disabled'}
                                </button>
                              </div>
                              <div className="text-xs text-[#2B1717] space-y-1">
                                <span className="font-bold text-lg text-[#D25353] block">
                                  {pr.discountType === 'percentage' ? `${pr.discountValue}% OFF` : `$${pr.discountValue.toFixed(2)} OFF`}
                                </span>
                                <span className="text-[#7A5858] block">Min spend: ${pr.minSpend.toFixed(2)}</span>
                                <span className="text-[11px] text-gray-400 block">Expires: {pr.expiresAt}</span>
                              </div>
                            </div>

                            <div className="pt-3 border-t border-[#FFEAD3] flex justify-between items-center text-xs">
                              <span className="text-[#7A5858] font-semibold">{pr.usageCount} times redeemed</span>
                              <button 
                                onClick={() => handleDeletePromo(pr.id)}
                                className="text-rose-500 hover:text-rose-700 p-1"
                                title="Delete code"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 6: VIP SUBSCRIBERS */}
                  {adminActiveTab === 'subscribers' && (
                    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-[#9E3B3B]">VIP Newsletter Subscribers</h3>
                          <p className="text-xs text-[#7A5858]">Shoppers who joined the Comfort VIP circle for updates and offers.</p>
                        </div>
                        <button 
                          onClick={() => setShowBroadcastModal(true)}
                          className="btn-comfort px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                          <span>Broadcast VIP Email Campaign</span>
                        </button>
                      </div>

                      <div className="bg-white rounded-3xl border border-[#FFEAD3] overflow-hidden shadow-xs">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-[#FAF4EF] text-[#7A5858] uppercase tracking-wider font-semibold border-b border-[#FFEAD3]">
                              <tr>
                                <th className="py-3.5 px-5">Subscriber Email</th>
                                <th className="py-3.5 px-4">Membership Tier</th>
                                <th className="py-3.5 px-4">Joined Date</th>
                                <th className="py-3.5 px-4">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#FFEAD3]">
                              {subscribers.map(sub => (
                                <tr key={sub.id} className="hover:bg-[#FFF8F2]/60">
                                  <td className="py-3.5 px-5 font-semibold text-[#2B1717]">{sub.email}</td>
                                  <td className="py-3.5 px-4 text-[#9E3B3B] font-bold">{sub.tier}</td>
                                  <td className="py-3.5 px-4 text-[#7A5858]">{sub.date}</td>
                                  <td className="py-3.5 px-4">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                      Active Member
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 7: STORE SETTINGS */}
                  {adminActiveTab === 'settings' && (
                    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in">
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-[#9E3B3B]">Storefront Configuration</h3>
                        <p className="text-xs text-[#7A5858]">Changes made here immediately update the customer-facing website.</p>
                      </div>

                      <form onSubmit={handleSaveStoreSettings} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#FFEAD3] shadow-xs space-y-5">
                        
                        <div>
                          <label className="block text-xs font-semibold text-[#2B1717] mb-1.5">
                            Announcement Bar Message (Top of Website)
                          </label>
                          <input 
                            type="text" 
                            value={storeSettings.announcementText}
                            onChange={(e) => setStoreSettings({ ...storeSettings, announcementText: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#FFEAD3] text-xs focus:ring-2 focus:ring-[#9E3B3B] outline-none"
                            placeholder="e.g. Free Shipping on Orders Above $50"
                          />
                          <span className="text-[11px] text-[#7A5858] mt-1 block">
                            Displayed live in the deep burgundy announcement header across desktop and mobile.
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-[#2B1717] mb-1.5">
                              Free Shipping Threshold ($)
                            </label>
                            <input 
                              type="number" 
                              value={storeSettings.freeShippingThreshold}
                              onChange={(e) => setStoreSettings({ ...storeSettings, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
                              className="w-full px-4 py-2.5 rounded-xl border border-[#FFEAD3] text-xs focus:ring-2 focus:ring-[#9E3B3B] outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[#2B1717] mb-1.5">
                              Store Operational Status
                            </label>
                            <select 
                              value={storeSettings.storeStatus}
                              onChange={(e) => setStoreSettings({ ...storeSettings, storeStatus: e.target.value as any })}
                              className="w-full px-4 py-2.5 rounded-xl border border-[#FFEAD3] text-xs focus:ring-2 focus:ring-[#9E3B3B] outline-none bg-white"
                            >
                              <option value="Live">Online & Accepting Orders</option>
                              <option value="Maintenance">Maintenance Mode</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-[#2B1717] mb-1.5">
                              Concierge Support Email
                            </label>
                            <input 
                              type="email" 
                              value={storeSettings.supportEmail}
                              onChange={(e) => setStoreSettings({ ...storeSettings, supportEmail: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-[#FFEAD3] text-xs focus:ring-2 focus:ring-[#9E3B3B] outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#2B1717] mb-1.5">
                              Support Phone Number
                            </label>
                            <input 
                              type="text" 
                              value={storeSettings.supportPhone}
                              onChange={(e) => setStoreSettings({ ...storeSettings, supportPhone: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-[#FFEAD3] text-xs focus:ring-2 focus:ring-[#9E3B3B] outline-none"
                            />
                          </div>
                        </div>

                        <div className="pt-3">
                          <button 
                            type="submit" 
                            className="btn-comfort px-6 py-3 rounded-full text-xs font-bold shadow-md cursor-pointer"
                          >
                            Save Storefront Configuration
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                </main>
              </div>

            </div>
          )}
        </div>
      )}

      {/* ORDER DETAILS & PACKING SLIP MODAL */}
      {selectedOrderForDetail && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#FFEAD3] shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-[#FFEAD3] mb-5">
              <div>
                <span className="text-[10px] font-bold text-[#D25353] uppercase tracking-wider">Order Packing Slip</span>
                <h3 className="font-serif text-xl font-bold text-[#9E3B3B]">Invoice #{selectedOrderForDetail.id}</h3>
              </div>
              <button 
                onClick={() => setSelectedOrderForDetail(null)} 
                className="p-1.5 rounded-full hover:bg-[#FFEAD3]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF4EF] border border-[#FFEAD3]">
                <div>
                  <strong className="block text-[#7A5858] uppercase text-[10px] mb-1">Customer Details</strong>
                  <span className="font-bold text-sm block">{selectedOrderForDetail.customerName}</span>
                  <span className="text-gray-500 block">{selectedOrderForDetail.customerEmail}</span>
                  <span className="text-gray-500 block">{selectedOrderForDetail.customerPhone}</span>
                </div>
                <div>
                  <strong className="block text-[#7A5858] uppercase text-[10px] mb-1">Shipping Destination</strong>
                  <span className="block leading-relaxed">{selectedOrderForDetail.shippingAddress}</span>
                  <span className="block text-[11px] text-gray-500 mt-1">Payment: {selectedOrderForDetail.paymentMethod}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="border border-[#FFEAD3] rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#FAF4EF] text-[#7A5858] font-bold border-b border-[#FFEAD3]">
                    <tr>
                      <th className="py-2.5 px-4">Item</th>
                      <th className="py-2.5 px-3">Size</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-4 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FFEAD3]">
                    {selectedOrderForDetail.items.map((it, i) => (
                      <tr key={i}>
                        <td className="py-2.5 px-4 font-semibold">{it.productName}</td>
                        <td className="py-2.5 px-3">{it.size}</td>
                        <td className="py-2.5 px-3 text-center">{it.quantity}</td>
                        <td className="py-2.5 px-4 text-right font-bold text-[#9E3B3B]">${(it.price * it.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[#FFEAD3]">
                <div>
                  <span className="text-[11px] text-[#7A5858]">Courier Tracking:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input 
                      type="text" 
                      defaultValue={selectedOrderForDetail.trackingNumber || ''}
                      onBlur={(e) => handleUpdateOrderStatus(selectedOrderForDetail.id, selectedOrderForDetail.status, e.target.value)}
                      placeholder="e.g. 1Z9999999999"
                      className="px-2.5 py-1 rounded-lg border border-[#FFEAD3] text-xs font-mono"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#7A5858] block">Total Amount</span>
                  <span className="font-serif font-bold text-xl text-[#9E3B3B]">${selectedOrderForDetail.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button 
                  onClick={() => {
                    window.print();
                  }}
                  className="btn-outline-comfort flex-1 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button 
                  onClick={() => handleUpdateOrderStatus(selectedOrderForDetail.id, 'Shipped')}
                  className="btn-comfort flex-1 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark as Shipped</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INQUIRY REPLY MODAL */}
      {selectedInquiryForReply && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#FFEAD3] shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-[#FFEAD3] mb-4">
              <div>
                <span className="text-[10px] font-bold text-[#D25353] uppercase">Concierge Styling Reply</span>
                <h3 className="font-serif text-lg font-bold text-[#9E3B3B]">Reply to {selectedInquiryForReply.name}</h3>
              </div>
              <button onClick={() => setSelectedInquiryForReply(null)} className="p-1 rounded-full hover:bg-[#FFEAD3]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendInquiryReply} className="space-y-4 text-xs">
              <div className="p-3 bg-[#FAF4EF] rounded-xl border border-[#FFEAD3]">
                <span className="font-bold block text-[#2B1717]">{selectedInquiryForReply.subject}</span>
                <p className="text-[#5C3D3D] italic mt-1">"{selectedInquiryForReply.message}"</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B1717] mb-1">Your Personal Styling Response</label>
                <textarea 
                  rows={4}
                  required
                  value={inquiryReplyText}
                  onChange={(e) => setInquiryReplyText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#FFEAD3] text-xs focus:ring-2 focus:ring-[#9E3B3B] outline-none"
                  placeholder="Type your response to the customer..."
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button type="submit" className="btn-comfort flex-1 py-3 rounded-full text-xs font-bold cursor-pointer">
                  Send Response via Email
                </button>
                <button 
                  type="button" 
                  onClick={() => setSelectedInquiryForReply(null)}
                  className="px-5 py-3 rounded-full border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE PROMO CODE MODAL */}
      {showCreatePromoModal && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#FFEAD3] shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-[#FFEAD3] mb-4">
              <h3 className="font-serif text-lg font-bold text-[#9E3B3B]">Create Promotional Coupon</h3>
              <button onClick={() => setShowCreatePromoModal(false)} className="p-1 rounded-full hover:bg-[#FFEAD3]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePromo} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#2B1717] mb-1">Coupon Code Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. VIP25 or SPRINGELEGANCE"
                  value={newPromoForm.code}
                  onChange={(e) => setNewPromoForm({ ...newPromoForm, code: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#FFEAD3] font-mono uppercase font-bold focus:ring-2 focus:ring-[#9E3B3B] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#2B1717] mb-1">Discount Type</label>
                  <select 
                    value={newPromoForm.discountType}
                    onChange={(e) => setNewPromoForm({ ...newPromoForm, discountType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-[#FFEAD3] bg-white outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Dollar ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#2B1717] mb-1">Discount Value</label>
                  <input 
                    type="number"
                    step="0.01"
                    required
                    value={newPromoForm.discountValue}
                    onChange={(e) => setNewPromoForm({ ...newPromoForm, discountValue: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#FFEAD3] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#2B1717] mb-1">Min Spend ($)</label>
                  <input 
                    type="number"
                    value={newPromoForm.minSpend}
                    onChange={(e) => setNewPromoForm({ ...newPromoForm, minSpend: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#FFEAD3] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#2B1717] mb-1">Expiration Date</label>
                  <input 
                    type="date"
                    value={newPromoForm.expiresAt}
                    onChange={(e) => setNewPromoForm({ ...newPromoForm, expiresAt: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#FFEAD3] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button type="submit" className="btn-comfort flex-1 py-3 rounded-full font-bold cursor-pointer">
                  Activate Promo Code
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowCreatePromoModal(false)}
                  className="px-5 py-3 rounded-full border border-gray-300 font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BROADCAST EMAIL MODAL */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#FFEAD3] shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-[#FFEAD3] mb-4">
              <div>
                <span className="text-[10px] font-bold text-[#D25353] uppercase">VIP Broadcast Campaign</span>
                <h3 className="font-serif text-lg font-bold text-[#9E3B3B]">Email {subscribers.length} Subscribers</h3>
              </div>
              <button onClick={() => setShowBroadcastModal(false)} className="p-1 rounded-full hover:bg-[#FFEAD3]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#2B1717] mb-1">Campaign Subject Line</label>
                <input 
                  type="text"
                  required
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#FFEAD3] focus:ring-2 focus:ring-[#9E3B3B] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2B1717] mb-1">Message Body</label>
                <textarea 
                  rows={4}
                  required
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#FFEAD3] focus:ring-2 focus:ring-[#9E3B3B] outline-none"
                />
              </div>

              <div className="p-3 bg-[#FAF4EF] rounded-xl border border-[#FFEAD3] flex items-center justify-between text-[11px] text-[#7A5858]">
                <span>Recipient Audience:</span>
                <strong className="text-[#9E3B3B]">All {subscribers.length} Registered Comfort VIPs</strong>
              </div>

              <div className="pt-2 flex gap-3">
                <button type="submit" className="btn-comfort flex-1 py-3 rounded-full font-bold flex items-center justify-center gap-2 cursor-pointer">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send VIP Broadcast</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowBroadcastModal(false)}
                  className="px-5 py-3 rounded-full border border-gray-300 font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL (INSIDE ADMIN) */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#FFEAD3] shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-[#FFEAD3] mb-5">
              <h3 className="font-serif text-xl font-bold text-[#9E3B3B]">
                {editingProductId ? 'Edit Boutique Outfit' : 'Add New Boutique Outfit'}
              </h3>
              <button onClick={() => setShowAddProductModal(false)} className="p-1 rounded-full hover:bg-[#FFEAD3]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2B1717] mb-1">Outfit Title</label>
                <input 
                  type="text" 
                  required
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  placeholder="e.g. Velvet Wrap Midi Dress"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#FFEAD3] text-xs focus:ring-2 focus:ring-[#9E3B3B] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2B1717] mb-1">Category</label>
                  <select 
                    value={newProductForm.category}
                    onChange={(e) => {
                      const sel = CATEGORIES.find(c => c.name === e.target.value);
                      setNewProductForm({ 
                        ...newProductForm, 
                        category: e.target.value,
                        categorySlug: sel ? sel.slug : 'dresses'
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#FFEAD3] text-xs focus:ring-2 focus:ring-[#9E3B3B] outline-none bg-white"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.slug} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B1717] mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#FFEAD3] text-xs focus:ring-2 focus:ring-[#9E3B3B] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2B1717] mb-1">Stock Units</label>
                  <input 
                    type="number" 
                    required
                    value={newProductForm.stock}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stock: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#FFEAD3] text-xs focus:ring-2 focus:ring-[#9E3B3B] outline-none"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#2B1717]">
                    <input 
                      type="checkbox"
                      checked={newProductForm.isNew}
                      onChange={(e) => setNewProductForm({ ...newProductForm, isNew: e.target.checked })}
                      className="accent-[#9E3B3B] w-4 h-4 rounded"
                    />
                    <span>Mark as 'New Arrival'</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B1717] mb-1">Fabric & Silhouette Description</label>
                <textarea 
                  rows={3}
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  placeholder="Buttery soft woven modal blend with elegant drape..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#FFEAD3] text-xs focus:ring-2 focus:ring-[#9E3B3B] outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="submit"
                  className="btn-comfort flex-grow py-3 rounded-full text-xs font-semibold cursor-pointer"
                >
                  {editingProductId ? 'Save Product Updates' : 'Add to Catalog'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowAddProductModal(false)}
                  className="px-5 py-3 rounded-full border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
