import React from 'react';
import { ClimateData } from '../types/climate';
import { Droplets, Thermometer, Wind, Sprout } from 'lucide-react';

interface MetricsGridProps {
  data: ClimateData;
}

export function MetricsGrid({ data }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <Thermometer className="text-red-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Temperature</h3>
            <p className="text-2xl font-semibold">{data.temperature.toFixed(1)}°C</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <Droplets className="text-blue-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Water Level</h3>
            <p className="text-2xl font-semibold">{data.waterLevel.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <Wind className="text-green-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Precipitation</h3>
            <p className="text-2xl font-semibold">{data.precipitation.toFixed(1)} mm</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <Sprout className="text-emerald-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Crop Yield</h3>
            <p className="text-2xl font-semibold">{data.cropYield.toFixed(2)} t/ha</p>
          </div>
        </div>
      </div>
    </div>
  );
}