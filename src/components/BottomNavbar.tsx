'use client';

import Link from 'next/link';
import { Home, MapPin, ShoppingCart, User } from 'lucide-react';

export default function BottomNavbar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around items-center py-2">
        <Link href="/" className="flex flex-col items-center text-gray-700 hover:text-green-600 p-2">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/trash-centres" className="flex flex-col items-center text-gray-700 hover:text-green-600 p-2">
          <MapPin className="h-6 w-6" />
          <span className="text-xs mt-1">Trash Centers</span>
        </Link>
        <Link href="/marketplace" className="flex flex-col items-center text-gray-700 hover:text-green-600 p-2">
          <ShoppingCart className="h-6 w-6" />
          <span className="text-xs mt-1">Marketplace</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-gray-700 hover:text-green-600 p-2">
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
}
