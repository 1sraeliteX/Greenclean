'use client';

import { useState } from 'react';
import { User, CreditCard, Key, HelpCircle, Bell, LogOut, MessageSquare, Info } from 'lucide-react';

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const settingsItems = [
    { 
      icon: <User className="h-5 w-5 text-green-600" />, 
      label: 'Profile', 
      hasChevron: true 
    },
    { 
      icon: <CreditCard className="h-5 w-5 text-green-600" />, 
      label: 'Membership', 
      hasChevron: true 
    },
    { 
      icon: <CreditCard className="h-5 w-5 text-green-600" />, 
      label: 'Payment', 
      hasChevron: true 
    },
    { 
      icon: <Key className="h-5 w-5 text-green-600" />, 
      label: 'Reset Password', 
      hasChevron: true 
    },
    { 
      icon: <MessageSquare className="h-5 w-5 text-green-600" />, 
      label: 'Help and Complaints', 
      hasChevron: true 
    },
    { 
      icon: <Bell className="h-5 w-5 text-green-600" />, 
      label: 'Notifications', 
      hasChevron: false 
    },
    { 
      icon: <Info className="h-5 w-5 text-green-600" />, 
      label: 'FAQs', 
      hasChevron: true 
    },
    { 
      icon: <LogOut className="h-5 w-5 text-red-500" />, 
      label: 'Log out', 
      hasChevron: false,
      isLogout: true
    },
  ];

  return (
    <div className="min-h-screen bg-white p-5 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account</p>
      </div>

      {/* Settings List */}
      <div className="space-y-3">
        {settingsItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-4 rounded-lg ${!item.isLogout ? 'hover:bg-gray-50' : ''} transition-colors`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${item.isLogout ? 'bg-red-50' : 'bg-green-50'}`}>
                {item.icon}
              </div>
              <span className={`text-base font-semibold ${item.isLogout ? 'text-red-500' : 'text-gray-900'}`}>
                {item.label}
              </span>
            </div>
            
            {item.label === 'Notifications' ? (
              <div className="relative inline-block w-12 h-6">
                <input 
                  type="checkbox" 
                  id="notifications" 
                  className="opacity-0 w-0 h-0"
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${notificationsEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${notificationsEnabled ? 'transform translate-x-6' : ''}`}></span>
              </div>
            ) : item.hasChevron ? (
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
