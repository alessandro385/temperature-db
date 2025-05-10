import React from 'react';
import { ClimateData } from '../types/climate';
import { HISTORICAL_DATA } from '../utils/historicalData';

interface TrendAnalysisProps {
  historicalData: ClimateData[];
  predictedData: ClimateData[];
}

export function TrendAnalysis({ historicalData, predictedData }: TrendAnalysisProps) {
  function calculateChange(metric: keyof Omit<ClimateData, 'timestamp'>): {
    historical: number;
    predicted: number;
  } {
    const historicalChange = (
      (historicalData[historicalData.length - 1][metric] as number) -
      (historicalData[0][metric] as number)
    ) / (historicalData[0][metric] as number) * 100;

    const predictedChange = (
      (predictedData[predictedData.length - 1][metric] as number) -
      (predictedData[0][metric] as number)
    ) / (predictedData[0][metric] as number) * 100;

    return {
      historical: historicalChange,
      predicted: predictedChange,
    };
  }

  const metrics = [
    { key: 'temperature', label: 'Temperatura', unit: '°C' },
    { key: 'precipitation', label: 'Precipitazioni', unit: 'mm' },
    { key: 'waterLevel', label: 'Livello Acqua', unit: '%' },
    { key: 'cropYield', label: 'Resa Agricola', unit: 't/ha' },
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">Analisi delle Tendenze</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map(({ key, label, unit }) => {
          const changes = calculateChange(key);
          return (
            <div key={key} className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">{label}</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Variazione Storica (1990-2020):</span>
                  <span className={changes.historical < 0 ? 'text-red-600' : 'text-green-600'}>
                    {' '}{changes.historical.toFixed(1)}%
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-medium">Proiezione Futura:</span>
                  <span className={changes.predicted < 0 ? 'text-red-600' : 'text-green-600'}>
                    {' '}{changes.predicted.toFixed(1)}%
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Valore Attuale: {predictedData[0][key].toFixed(1)} {unit}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}