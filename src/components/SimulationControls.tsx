import React from 'react';
import { SimulationParams } from '../types/climate';

interface SimulationControlsProps {
  params: SimulationParams;
  onParamsChange: (params: SimulationParams) => void;
}

export function SimulationControls({ params, onParamsChange }: SimulationControlsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Simulation Parameters</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Temperature Increase (°C/year)
          </label>
          <input
            type="number"
            step="0.01"
            value={params.temperatureIncrease}
            onChange={(e) => onParamsChange({
              ...params,
              temperatureIncrease: parseFloat(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precipitation Decrease (% per year)
          </label>
          <input
            type="number"
            step="0.01"
            value={params.precipitationDecrease}
            onChange={(e) => onParamsChange({
              ...params,
              precipitationDecrease: parseFloat(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Population Growth (% per year)
          </label>
          <input
            type="number"
            step="0.01"
            value={params.populationGrowth}
            onChange={(e) => onParamsChange({
              ...params,
              populationGrowth: parseFloat(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Simulation Timespan (years)
          </label>
          <input
            type="number"
            value={params.timespan}
            onChange={(e) => onParamsChange({
              ...params,
              timespan: parseInt(e.target.value)
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}