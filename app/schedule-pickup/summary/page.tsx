'use client';

'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle, MapPin, Calendar as CalendarIcon, Clock, Download, Share2, Check, Copy } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Generate a unique pickup code (e.g., GC-AB12CD34)
const generatePickupCode = (seed: string) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const nums = '23456789';
  
  // Create a simple hash from the seed string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use the hash to generate a consistent code
  const random = (max: number) => Math.abs(hash % max);
  
  let result = 'GC-';
  
  // Add 2 letters based on the hash
  for (let i = 0; i < 2; i++) {
    result += chars[random(chars.length)];
  }
  
  // Add 4 numbers based on the hash
  for (let i = 0; i < 4; i++) {
    result += nums[random(nums.length)];
  }
  
  // Add 2 more letters based on the hash
  for (let i = 0; i < 2; i++) {
    result += chars[random(chars.length)];
  }
  
  return result;
};

export default function PickupSummary() {
  const searchParams = useSearchParams();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Get form data from URL search params
  const formData = {
    lodgeName: searchParams.get('lodgeName') || '',
    roomNumber: searchParams.get('roomNumber') || '',
    description: searchParams.get('description') || '',
    trashBags: searchParams.get('trashBags') || '1',
    isScattered: searchParams.get('isScattered') === 'true',
    date: searchParams.get('date') || '',
    time: searchParams.get('time') || '',
    notes: searchParams.get('notes') || '',
    imageCount: searchParams.get('imageCount') || '0'
  };
  
  // Generate a consistent pickup code based on form data
  const pickupCode = generatePickupCode(
    `${formData.lodgeName}-${formData.roomNumber}-${formData.date}-${formData.time}`
  );

  // Handle PDF download
  const handleDownloadPDF = async () => {
    const element = contentRef.current;
    if (!element) return;
    
    // Create a temporary container for the PDF content
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '210mm';
    container.style.padding = '20mm';
    container.style.backgroundColor = '#ffffff';
    container.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    
    // Clone the element to avoid modifying the original
    const elementToPrint = element.cloneNode(true) as HTMLElement;
    
    // Ensure all colors are in RGB format
    const elements = elementToPrint.querySelectorAll('*');
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.color) el.setAttribute('style', `color: ${style.color};`);
      if (style.backgroundColor) el.setAttribute('style', `background-color: ${style.backgroundColor};`);
    });
    
    container.appendChild(elementToPrint);
    document.body.appendChild(container);
    
    try {
      // Apply CSS transform for high resolution
      const originalWidth = container.offsetWidth;
      const originalHeight = container.offsetHeight;
      
      container.style.transform = 'scale(2)';
      container.style.transformOrigin = '0 0';
      container.style.width = `${originalWidth}px`;
      container.style.height = `${originalHeight}px`;
      
      // Use html2canvas to capture the content as an image
      const canvas = await html2canvas(container, {
        useCORS: true,
        logging: false,
        background: '#ffffff',
        allowTaint: true,
        // @ts-ignore - ignoreElements is not in the type definition but works at runtime
        ignoreElements: (element: HTMLElement) => {
          // Ignore any problematic elements
          return false;
        }
      });
      
      // Create PDF with explicit RGB colors
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // Add some margin
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'JPEG', 10, 10, pdfWidth, pdfHeight);
      pdf.save('pickup-summary.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    setShowShareMenu(false);
  };

  const handleDownloadImage = async () => {
    const element = document.getElementById('pickup-summary');
    if (!element) return;

    try {
      // @ts-ignore - scale is a valid option but not in the type definitions
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      const link = document.createElement('a');
      link.download = 'pickup-summary.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
    setShowShareMenu(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowShareMenu(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md print:shadow-none print:p-0">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pickup Scheduled!</h1>
        <p className="text-gray-600">We've received your pickup request. Here are the details:</p>
        
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-lg font-semibold text-green-800 mb-2">Your Pickup Code</h2>
          <div className="text-3xl font-bold text-green-600 tracking-wider mb-3">
            {pickupCode}
          </div>
          <p className="text-sm text-red-600 font-medium mt-2 px-2 py-1 bg-red-50 rounded">
            Please text this code together with your payment receipt to the chat icon in the app
          </p>
        </div>
      </div>

      <div ref={contentRef} id="printable-content" className="space-y-6 bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500">Lodge Name</h3>
            <p className="text-gray-900">{formData.lodgeName}</p>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500">Room Number</h3>
            <p className="text-gray-900">{formData.roomNumber}</p>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500">Waste Description</h3>
            <p className="text-gray-900">{formData.description}</p>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500">
              {formData.isScattered ? 'Scattered Waste' : 'Number of Bags'}
            </h3>
            <p className="text-gray-900">
              {formData.isScattered ? 'Yes' : formData.trashBags}
            </p>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500">Scheduled Date</h3>
            <div className="flex items-center text-gray-900">
              <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
              {new Date(formData.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500">Time Slot</h3>
            <div className="flex items-center text-gray-900">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              {formData.time}
            </div>
          </div>
          
          {formData.notes && (
            <div className="md:col-span-2 space-y-1">
              <h3 className="text-sm font-medium text-gray-500">Special Instructions</h3>
              <p className="text-gray-900">{formData.notes}</p>
            </div>
          )}
          
          {formData.imageCount !== '0' && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500">Images Attached</h3>
              <p className="text-gray-900">{formData.imageCount} image{formData.imageCount !== '1' ? 's' : ''}</p>
            </div>
          )}
        </div>
        
        <div className="pt-6 border-t border-gray-200 print:hidden">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/schedule-pickup"
              className="flex-1 text-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Back to Form
            </Link>
            <div className="relative flex-1" ref={shareMenuRef}>
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
              
              {showShareMenu && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <button
                      onClick={handleDownloadPDF}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download as PDF
                    </button>
                    <button
                      onClick={handleDownloadImage}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download as Image
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      disabled={copied}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy Shareable Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
