import React from 'react';
import { motion } from 'framer-motion';

interface ProductStepProps {
  formData: {
    productName: string;
    productDescription: string;
    productUrl: string;
    productImages: string[];
  };
  onChange: (field: string, value: any) => void;
}

export function ProductStep({ formData, onChange }: ProductStepProps) {
  return (
    <div className="space-y-8">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product name
        </label>
        <input
          type="text"
          value={formData.productName}
          onChange={(e) => onChange('productName', e.target.value)}
          placeholder="Enter your product name"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Product Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product description
        </label>
        <textarea
          value={formData.productDescription}
          onChange={(e) => onChange('productDescription', e.target.value)}
          placeholder="Describe your product"
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Product URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product URL
        </label>
        <input
          type="url"
          value={formData.productUrl}
          onChange={(e) => onChange('productUrl', e.target.value)}
          placeholder="https://..."
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Product Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product images
        </label>
        <div className="mt-2 grid grid-cols-4 gap-4">
          {formData.productImages.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  const newImages = [...formData.productImages];
                  newImages.splice(index, 1);
                  onChange('productImages', newImages);
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
          {formData.productImages.length < 4 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 hover:border-indigo-500 hover:text-indigo-500"
              onClick={() => {
                // In a real app, this would open a file picker
                const newImage = `https://picsum.photos/400/400?random=${Date.now()}`;
                onChange('productImages', [...formData.productImages, newImage]);
              }}
            >
              +
            </motion.button>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Add up to 4 product images
        </p>
      </div>
    </div>
  );
}