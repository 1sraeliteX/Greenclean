'use client';

import { Search, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../src/context/CartContext';

interface TrashCenter {
  id: number;
  name: string;
  address: string;
  phone: string;
}

export default function TrashCentres() {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for trash centers
  const trashCenters: (TrashCenter & { price: number })[] = [
    {
      id: 1,
      name: 'Green Clean - Hilltop',
      address: 'Hilltop, Nsukka, Enugu State',
      phone: '+234 812 345 6789',
      price: 5000, // Price in Naira
    },
    {
      id: 2,
      name: 'Green Clean - Odim',
      address: 'Odim, Nsukka, Enugu State',
      phone: '+234 812 345 6789',
      price: 5000,
    },
    {
      id: 3,
      name: 'Green Clean - Odenigwe',
      address: 'Odenigwe, Nsukka, Enugu State',
      phone: '+234 812 345 6789',
      price: 5000,
    },
    {
      id: 4,
      name: 'Green Clean - UNN',
      address: 'University of Nigeria, Nsukka, Enugu State',
      phone: '+234 812 345 6789',
      price: 5000,
    },
    {
      id: 5,
      name: 'Green Clean - Green House',
      address: 'Green House, Nsukka, Enugu State',
      phone: '+234 812 345 6789',
      price: 5000,
    },
   
  ];

  const filteredCenters = trashCenters.filter(center =>
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-5">
      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-[20px] font-semibold text-[#111827] mb-1">
          Nearby Trash Centres
        </h1>
        <p className="text-[14px] text-[#6B7280]">
          Locate the nearest trash sorting & recycling depot.
        </p>
      </header>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-[10px] bg-[#F5F6F8] rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white shadow-sm"
          placeholder="Search for a location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* List of Centres */}
      <div className="space-y-3">
        {filteredCenters.map((center) => (
          <div key={center.id} className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-[16px] font-semibold text-[#111827] mb-1">
                  {center.name}
                </h3>
                <p className="text-[13px] text-[#6B7280] line-clamp-2">
                  {center.address}
                </p>
              </div>
              <div className="flex flex-col space-y-2 ml-3">
<a 
                  href={`tel:${center.phone}`}
                  className="p-2 rounded-lg bg-gray-100 text-green-600 hover:bg-green-50 transition-colors flex items-center justify-center text-sm"
                  aria-label="Call"
                >
                  <Phone className="h-5 w-5" />
                </a>
                <button 
                  className="p-2 rounded-full bg-gray-100 text-green-600 hover:bg-green-50 transition-colors"
                  aria-label="Message"
                >
                  <MessageSquare className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
