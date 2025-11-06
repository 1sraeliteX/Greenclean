'use client';

import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';

export default function WasteForm() {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      location: selectedLocation,
      ...formData,
      images: images.map(img => img.name)
    });
    // Here you would typically send this data to your backend
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Waste Management Report</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Dropdown */}
        <div className="space-y-2">
          <Label htmlFor="location">Select Location</Label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location.toLowerCase()}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Lodge/House/Hostel Name */}
        <div className="space-y-2">
          <Label htmlFor="lodgeHouseHostel">Lodge/House/Hostel Name</Label>
          <Input
            id="lodgeHouseHostel"
            name="lodgeHouseHostel"
            value={formData.lodgeHouseHostel}
            onChange={handleInputChange}
            placeholder="Enter name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Room Number */}
          <div className="space-y-2">
            <Label htmlFor="roomNo">Room Number</Label>
            <Input
              id="roomNo"
              name="roomNo"
              value={formData.roomNo}
              onChange={handleInputChange}
              placeholder="Room no."
            />
          </div>

          {/* Block Number */}
          <div className="space-y-2">
            <Label htmlFor="blockNo">Block Number</Label>
            <Input
              id="blockNo"
              name="blockNo"
              value={formData.blockNo}
              onChange={handleInputChange}
              placeholder="Block no."
            />
          </div>
        </div>

        {/* Street Number */}
        <div className="space-y-2">
          <Label htmlFor="streetNo">Street Number</Label>
          <Input
            id="streetNo"
            name="streetNo"
            value={formData.streetNo}
            onChange={handleInputChange}
            placeholder="Street no."
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Clear Description of Your Location</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide a clear description of your location"
            rows={3}
            required
          />
        </div>

        {/* Landmark */}
        <div className="space-y-2">
          <Label htmlFor="landmark">Popular Building or Landmark</Label>
          <Input
            id="landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleInputChange}
            placeholder="e.g., Near Main Gate, Opposite Library"
          />
        </div>

        {/* Waste Type */}
        <div className="space-y-2">
          <Label>Waste Type</Label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="wasteType"
                value="bag"
                checked={formData.wasteType === 'bag'}
                onChange={() => setFormData(prev => ({ ...prev, wasteType: 'bag' }))}
                className="h-4 w-4 text-blue-600"
              />
              <span>Bag</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="wasteType"
                value="scattered"
                checked={formData.wasteType === 'scattered'}
                onChange={() => setFormData(prev => ({ ...prev, wasteType: 'scattered' }))}
                className="h-4 w-4 text-blue-600"
              />
              <span>Scattered</span>
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <Label>Upload Images</Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
            <div className="space-y-1 text-center">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                >
                  <span>Upload photos</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          
          {/* Preview uploaded images */}
          {images.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</h4>
              <div className="flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative w-20 h-20 border rounded-md overflow-hidden">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            <Upload className="mr-2 h-4 w-4" />
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
}
