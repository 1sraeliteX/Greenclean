'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { useCart } from '../../src/context/CartContext';

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  seller: string;
  location: string;
  rating?: number;
};

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAllItems, setShowAllItems] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: 'All Items', icon: <Filter className="inline h-3.5 w-3.5 mr-2 text-gray-500" /> },
    { id: 'cleaning-tools', name: 'Cleaning Tools' },
    { id: 'waste-bins', name: 'Waste Bins' },
    { id: 'protective-gear', name: 'Protective Gear' },
    { id: 'cleaning-supplies', name: 'Cleaning Supplies' },
    { id: 'garden-tools', name: 'Garden Tools' },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Heavy-Duty Cleaning Gloves',
      description: 'Durable rubber gloves for heavy-duty cleaning tasks',
      price: '₦2,500',
      image: '/gloves.jpg',
      category: 'cleaning-tools',
      seller: 'CleanPro',
      location: 'Lagos',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Recycling Bin Set',
      description: 'Set of 3 color-coded recycling bins for waste segregation',
      price: '₦15,000',
      image: '/bins.jpg',
      category: 'waste-bins',
      seller: 'EcoSolutions',
      location: 'Abuja',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Safety Goggles',
      description: 'Clear safety goggles for eye protection during cleaning',
      price: '₦3,200',
      image: '/goggles.jpg',
      category: 'protective-gear',
      seller: 'SafeWork',
      location: 'Port Harcourt',
      rating: 4.2
    },
    {
      id: 4,
      name: 'Eco-Friendly Detergent',
      description: '5L concentrated eco-friendly cleaning detergent',
      price: '₦4,500',
      image: '/detergent.jpg',
      category: 'cleaning-supplies',
      seller: 'GreenClean',
      location: 'Ibadan',
      rating: 4.6
    },
    {
      id: 5,
      name: 'Garden Rake',
      description: 'Sturdy metal rake for garden waste collection',
      price: '₦6,800',
      image: '/rake.jpg',
      category: 'garden-tools',
      seller: 'GardenPro',
      location: 'Enugu',
      rating: 4.4
    },
    {
      id: 6,
      name: 'Microfiber Mop',
      description: 'Advanced microfiber mop with wringer bucket',
      price: '₦12,500',
      image: '/mop.jpg',
      category: 'cleaning-tools',
      seller: 'CleanPro',
      location: 'Lagos',
      rating: 4.7
    },
    {
      id: 7,
      name: 'Compost Bin',
      description: 'Outdoor compost bin for organic waste',
      price: '₦18,000',
      image: '/compost-bin.jpg',
      category: 'waste-bins',
      seller: 'EcoSolutions',
      location: 'Abuja',
      rating: 4.9
    },
    {
      id: 8,
      name: 'Disposable Face Masks (50pcs)',
      description: '3-ply disposable face masks for protection',
      price: '₦3,500',
      image: '/masks.jpg',
      category: 'protective-gear',
      seller: 'SafeWork',
      location: 'Port Harcourt',
      rating: 4.3
    }
  ];

  // ✅ Single clean filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // ✅ Show limited products when "showAllItems" is false
  const displayedProducts = showAllItems ? filteredProducts : filteredProducts.slice(0, 8);

  // ✅ Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Cleaning & Waste Management Store</h1>
        <p className="text-gray-800 dark:text-gray-200">
          {selectedCategory === 'all'
            ? 'Browse all our cleaning and waste management products'
            : `Showing ${filteredProducts.length} ${
                filteredProducts.length === 1 ? 'item' : 'items'
              } in ${categories.find((c) => c.id === selectedCategory)?.name || 'this category'}`}
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for items..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dropdown */}
        <div className="relative flex-grow max-w-xs group" ref={dropdownRef}>
          <div
            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm cursor-pointer hover:border-green-300 hover:shadow-md transition-all duration-200"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {categories.find((cat) => cat.id === selectedCategory)?.name || 'Filter by category'}
          </div>
          <Filter 
            className="absolute left-3 top-3 h-4 w-4 text-gray-500 group-hover:text-green-600 transition-colors"
            aria-hidden="true"
          />

          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category.icon || <span className="inline-block w-4" />} {category.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No products found matching your search.
          </div>
        ) : (
          displayedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/300x200/EDF2F7/4A5568?text=${encodeURIComponent(
                      product.name
                    )}`;
                    target.alt = product.name;
                    target.className = 'h-full w-full object-contain p-4';
                  }}
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded whitespace-nowrap">
                    {product.price}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                <div className="mt-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {categories.find((cat) => cat.id === product.category)?.name}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Seller: {product.seller} • {product.location}
                </div>
                <button
                  onClick={() => {
                    // Extract numeric value from price string (e.g., '₦2,500' -> 2500)
                    const price = Number(product.price.replace(/[^0-9]/g, '')) || 0;
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price,
                      quantity: 1,
                      image: product.image,
                    });
                  }}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add to Cart
                  <ShoppingCart className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
