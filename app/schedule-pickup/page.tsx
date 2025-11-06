'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, MapPin, Clock, CheckCircle, Camera } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function SchedulePickup() {
  const [formData, setFormData] = useState({
    lodgeName: '',
    roomNumber: '',
    description: '',
    trashBags: 1,
    isScattered: false,
    date: '',
    time: '',
    notes: ''
  });
  
  const availableTimeSlots = [
    '9:00 AM (9:00 AM - 12:00 PM)',
    '12:00 PM (12:00 PM - 3:00 PM)',
    '3:00 PM (3:00 PM - 6:00 PM)'
  ];
  
  const today = new Date().toISOString().split('T')[0];
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prev => [...prev, ...files]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Create URLSearchParams object with form data
    const params = new URLSearchParams({
      ...formData,
      trashBags: formData.trashBags.toString(),
      isScattered: formData.isScattered.toString(),
      imageCount: images.length.toString()
    });
    
    // Navigate to summary page with form data as query params
    router.push(`/schedule-pickup/summary?${params.toString()}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Schedule a Pickup</h1>
      <p className="text-gray-700 mb-8">Request a waste pickup at your convenience</p>
      
      {
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lodge Name */}
          <div>
            <label htmlFor="lodgeName" className="block text-sm font-medium text-gray-700 mb-1">
              Lodge Name
            </label>
            <input
              type="text"
              name="lodgeName"
              id="lodgeName"
              required
              value={formData.lodgeName}
              onChange={handleChange}
              placeholder="Enter lodge name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-gray-800 bg-white"
            />
          </div>

          {/* Room Number */}
          <div>
            <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Room Number
            </label>
            <input
              type="text"
              name="roomNumber"
              id="roomNumber"
              required
              value={formData.roomNumber}
              onChange={handleChange}
              placeholder="Enter your room number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-gray-800 bg-white"
            />
          </div>

          {/* Waste Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Waste Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the type of waste (e.g., paper, plastic, organic)"
              className="shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2 text-gray-800 bg-white"
            />
          </div>

          {/* Number of Bags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Trash Bags
            </label>
            <div className="flex">
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  trashBags: Math.max(1, prev.trashBags - 1)
                }))}
                className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-l-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                aria-label="Decrease number of bags"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.trashBags}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  setFormData(prev => ({
                    ...prev,
                    trashBags: Math.min(100, Math.max(1, value))
                  }));
                }}
                className="w-16 text-center px-2 py-2 border-t border-b border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                aria-label="Number of trash bags"
              />
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  trashBags: Math.min(100, prev.trashBags + 1)
                }))}
                className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-r-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                aria-label="Increase number of bags"
              >
                +
              </button>
            </div>
          </div>

          {/* Scattered Waste Toggle */}
          <div className="flex items-center">
            <input
              id="isScattered"
              name="isScattered"
              type="checkbox"
              checked={formData.isScattered}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded bg-white"
            />
            <label htmlFor="isScattered" className="ml-2 block text-sm text-gray-800 font-medium">
              Check if waste is scattered (not in bags)
            </label>
          </div>

          {/* Preferred Date */}
          <div className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm text-gray-800"
                />
              </div>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  disabled={!formData.date}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white text-gray-800"
                >
                  <option value="">Select a time</option>
                  {availableTimeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              {!formData.date && (
                <p className="mt-1 text-xs text-gray-500">
                  Please select a date first
                </p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
              <div className="space-y-1 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageUpload}
                      multiple
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            {images.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                {images.length} file{images.length !== 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          {/* Special Instructions */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Special Instructions (Optional)
            </label>
            <textarea
              name="notes"
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special instructions for our team?"
              className="shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2 text-gray-800 bg-white"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Schedule Pickup
            </button>
          </div>
        </form>
      }
    </div>
  );
}
