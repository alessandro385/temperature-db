import React, { useState, useEffect } from 'react';
import { ClimateData } from '../types/climate';
import { generateRealtimeData, checkThresholds } from '../utils/simulation';
import { AlertSection } from './AlertSection';
import { MetricsGrid } from './MetricsGrid';
import { ClimateChart } from './ClimateChart';
import { BASELINE_CLIMATE_DATA } from '../utils/constants';

export function Dashboard() {
  const [currentData, setCurrentData] = useState<ClimateData>(BASELINE_CLIMATE_DATA);
  const [historicalData, setHistoricalData] = useState<ClimateData[]>([BASELINE_CLIMATE_DATA]);
  const currentAlerts = checkThresholds(currentData);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData((prevData) => {
        const newData = generateRealtimeData(prevData);
        setHistoricalData((prev) => [...prev.slice(-50), newData]); // Keep last 50 data points
        return newData;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">TerraNova Climate Dashboard</h1>
        <AlertSection alerts={currentAlerts} />
        <MetricsGrid data={currentData} />
        <div className="grid gap-8">
          <ClimateChart data={historicalData} />
        </div>
      </div>
    </div>
  );
}