import React from 'react';
import { ClimateData } from '../types/climate';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface ImpactAnalysisProps {
  baselinePredictions: ClimateData[];
  sustainablePredictions: ClimateData[];
}

export function ImpactAnalysis({
  baselinePredictions,
  sustainablePredictions,
}: ImpactAnalysisProps) {
  const lastBaseline = baselinePredictions[baselinePredictions.length - 1];
  const lastSustainable = sustainablePredictions[sustainablePredictions.length - 1];

  const calculateDifference = (sustainable: number, baseline: number) => {
    const diff = ((sustainable - baseline) / baseline) * 100;
    return {
      value: Math.abs(diff),
      isPositive: diff > 0,
    };
  };

  const metrics = [
    {
      label: 'Temperatura',
      baseline: lastBaseline.temperature,
      sustainable: lastSustainable.temperature,
      unit: '°C',
      positiveIsGood: false,
    },
    {
      label: 'Precipitazioni',
      baseline: lastBaseline.precipitation,
      sustainable: lastSustainable.precipitation,
      unit: 'mm',
      positiveIsGood: true,
    },
    {
      label: 'Livello Acqua',
      baseline: lastBaseline.waterLevel,
      sustainable: lastSustainable.waterLevel,
      unit: '%',
      positiveIsGood: true,
    },
    {
      label: 'Resa Agricola',
      baseline: lastBaseline.cropYield,
      sustainable: lastSustainable.cropYield,
      unit: 't/ha',
      positiveIsGood: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Analisi dell'Impatto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const diff = calculateDifference(metric.sustainable, metric.baseline);
          const isGood = diff.isPositive === metric.positiveIsGood;
          
          return (
            <div key={metric.label} className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">{metric.label}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Scenario Attuale</p>
                  <p className="text-lg font-semibold">
                    {metric.baseline.toFixed(1)} {metric.unit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Con Interventi</p>
                  <p className="text-lg font-semibold">
                    {metric.sustainable.toFixed(1)} {metric.unit}
                  </p>
                </div>
              </div>
              <div className={`mt-2 flex items-center gap-1 ${
                isGood ? 'text-green-600' : 'text-red-600'
              }`}>
                {diff.isPositive ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {diff.value.toFixed(1)}% {isGood ? 'miglioramento' : 'peggioramento'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}