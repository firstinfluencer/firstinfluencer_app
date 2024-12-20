import React from 'react';
import { MapPin } from 'lucide-react';

interface AudienceDemographicsProps {
  locations: Array<{ city: string; percentage: string }>;
  gender: { male: number; female: number };
}

export function AudienceDemographics({ locations, gender }: AudienceDemographicsProps) {
  return (
    <>
      {/* Location Demographics */}
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-4">AUDIENCE DEMOGRAPHY</h4>
        <div className="space-y-3">
          {locations.map(({ city, percentage }) => (
            <div key={city} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{city}</span>
              </div>
              <span className="text-gray-900 font-medium">{percentage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gender Split */}
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-4">GENDER SPLIT</h4>
        <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-blue-500"
            style={{ width: `${gender.male}%` }}
          />
          <div 
            className="absolute right-0 top-0 h-full bg-pink-500"
            style={{ width: `${gender.female}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-blue-600">{gender.male}% Male</span>
          <span className="text-pink-600">{gender.female}% Female</span>
        </div>
      </div>
    </>
  );
}