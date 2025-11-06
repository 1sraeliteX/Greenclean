'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, User, ShoppingBag, Home, MapPin, ShoppingCart as CartIcon, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Schedule Pickup', href: '/schedule-pickup', icon: MapPin },
    { name: 'Trash Centers', href: '/trash-centres', icon: MapPin },
    { name: 'Marketplace', href: '/marketplace', icon: CartIcon },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/90'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-green-600">
              Green Clean
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-1.5" />
                  {item.name}
                </Link>
              ))}
              
              <button 
                onClick={toggleCart}
                className="relative text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <ShoppingBag className="h-5 w-5 mr-1.5" />
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <Link 
                href="/profile" 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/profile'
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5 mr-1.5" />
                Profile
              </Link>
            </div>
          </div>

          {/* Mobile cart button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleCart}
              className="relative p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
              aria-label="Cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div 
          ref={menuRef}
          className="md:hidden bg-white border-t border-gray-200"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-200 my-2"></div>
            
            <Link
              href="/profile"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/profile'
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <User className="h-5 w-5 mr-3" />
              Profile
            </Link>
            
            <button
              onClick={() => {
                toggleCart();
                setIsOpen(false);
              }}
              className="relative w-full text-left text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <ShoppingBag className="h-5 w-5 mr-3" />
              Cart
              {totalItems > 0 && (
                <span className="ml-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
