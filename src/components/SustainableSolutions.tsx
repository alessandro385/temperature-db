import React, { useState } from 'react';
import { ClimateData } from '../types/climate';
import { generatePredictions } from '../utils/predictionModel';
import { generateSustainablePredictions } from '../utils/sustainableModel';
import { SolutionsChart } from './SolutionsChart';
import { SolutionsList } from './SolutionsList';
import { ImpactAnalysis } from './ImpactAnalysis';

export function SustainableSolutions() {
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [timespan, setTimespan] = useState(30);

  const baselinePredictions = generatePredictions(timespan);
  const sustainablePredictions = generateSustainablePredictions(timespan, selectedSolutions);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Soluzioni Sostenibili e Impatto Previsto
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Periodo di Analisi (anni)
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
          Analisi fino al {new Date().getFullYear() + timespan}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SolutionsChart 
            baselinePredictions={baselinePredictions}
            sustainablePredictions={sustainablePredictions}
          />
          <ImpactAnalysis 
            baselinePredictions={baselinePredictions}
            sustainablePredictions={sustainablePredictions}
          />
        </div>
        <div>
          <SolutionsList 
            selectedSolutions={selectedSolutions}
            onSolutionsChange={setSelectedSolutions}
          />
        </div>
      </div>
    </div>
  );
}