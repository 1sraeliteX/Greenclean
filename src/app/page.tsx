'use client';

import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    lodgeHouseHostel: '',
    roomNo: '',
    blockNo: '',
    streetNo: '',
    description: '',
    landmark: '',
    wasteType: 'bag',
  });

  const locations = [
    'Hilltop',
    'Greenhouse',
    'Odenigwe',
    'Inside School',
    'Odim',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      location: selectedLocation,
      ...formData,
      images: images.map(img => img.name)
    });
    // Here you would typically send this data to your backend
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Waste Management System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Report waste collection points in your area to help keep our community clean
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Dropdown */}
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Select Location
              </label>
              <select
                id="location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a location</option>
                {locations.map((location) => (
                  <option key={location} value={location.toLowerCase()}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Lodge/House/Hostel Name */}
            <div className="space-y-2">
              <label htmlFor="lodgeHouseHostel" className="block text-sm font-medium text-gray-700">
                Lodge/House/Hostel Name
              </label>
              <input
                type="text"
                id="lodgeHouseHostel"
                name="lodgeHouseHostel"
                value={formData.lodgeHouseHostel}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter name"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Room Number */}
              <div className="space-y-2">
                <label htmlFor="roomNo" className="block text-sm font-medium text-gray-700">
                  Room Number
                </label>
                <input
                  type="text"
                  id="roomNo"
                  name="roomNo"
                  value={formData.roomNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Room no."
                />
              </div>

              {/* Block Number */}
              <div className="space-y-2">
                <label htmlFor="blockNo" className="block text-sm font-medium text-gray-700">
                  Block Number
                </label>
                <input
                  type="text"
                  id="blockNo"
                  name="blockNo"
                  value={formData.blockNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Block no."
                />
              </div>
            </div>

            {/* Street Number */}
            <div className="space-y-2">
              <label htmlFor="streetNo" className="block text-sm font-medium text-gray-700">
                Street Number
              </label>
              <input
                type="text"
                id="streetNo"
                name="streetNo"
                value={formData.streetNo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Street no."
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Clear Description of Your Location
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide a clear description of your location"
                rows={3}
                required
              />
            </div>

            {/* Landmark */}
            <div className="space-y-2">
              <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">
                Popular Building or Landmark
              </label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Near Main Gate, Opposite Library"
              />
            </div>

            {/* Waste Type */}
            <div className="space-y-2">
              <p className="block text-sm font-medium text-gray-700">Waste Type</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="wasteType"
                    value="bag"
                    checked={formData.wasteType === 'bag'}
                    onChange={() => setFormData(prev => ({ ...prev, wasteType: 'bag' }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Bag</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="wasteType"
                    value="scattered"
                    checked={formData.wasteType === 'scattered'}
                    onChange={() => setFormData(prev => ({ ...prev, wasteType: 'scattered' }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Scattered</span>
                </label>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Upload Images
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                <div className="space-y-1 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
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
                <div className="mt-2 text-sm text-gray-600">
                  {images.length} file{images.length !== 1 ? 's' : ''} selected
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your reports help us maintain a cleaner environment for everyone.</p>
        </div>
      </div>
    </main>
  );
}
