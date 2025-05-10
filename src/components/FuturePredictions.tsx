import React, { useState } from 'react';
import { generatePredictions } from '../utils/predictionModel';
import { HISTORICAL_DATA } from '../utils/historicalData';
import { FutureChart } from './FutureChart';
import { TrendAnalysis } from './TrendAnalysis';
import { Recommendations } from './Recommendations';

export function FuturePredictions() {
  const [timespan, setTimespan] = useState(30);
  const predictions = generatePredictions(timespan);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Analisi Predittiva del Clima - TerraNova
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Periodo di Previsione (anni)
        </label>
        <input
          type="range"
          min="5"
          max="50"
          value={timespan}
          onChange={(e) => setTimespan(parseInt(e.target.value))}
          className="w-full"
        />
        <span className="text-sm text-gray-600">
          Previsione fino al {new Date().getFullYear() + timespan}
        </span>
      </div>

      <FutureChart 
        historicalData={HISTORICAL_DATA}
        predictedData={predictions}
      />

      <TrendAnalysis 
        historicalData={HISTORICAL_DATA}
        predictedData={predictions}
      />

      <Recommendations data={predictions} />
    </div>
  );
}