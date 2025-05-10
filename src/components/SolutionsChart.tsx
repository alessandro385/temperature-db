import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ClimateData } from '../types/climate';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface SolutionsChartProps {
  baselinePredictions: ClimateData[];
  sustainablePredictions: ClimateData[];
}

export function SolutionsChart({ baselinePredictions, sustainablePredictions }: SolutionsChartProps) {
  const combinedData = baselinePredictions.map((baseline, index) => ({
    year: baseline.timestamp,
    baselineTemp: baseline.temperature,
    sustainableTemp: sustainablePredictions[index].temperature,
    baselineWater: baseline.waterLevel,
    sustainableWater: sustainablePredictions[index].waterLevel,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Confronto Scenari</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tickFormatter={(date) => format(new Date(date), 'yyyy', { locale: it })}
            />
            <YAxis yAxisId="temp" orientation="left" label={{ value: 'Temperatura (°C)', angle: -90 }} />
            <YAxis yAxisId="water" orientation="right" label={{ value: 'Livello Acqua (%)', angle: 90 }} />
            <Tooltip
              labelFormatter={(value) => format(new Date(value), 'yyyy', { locale: it })}
              formatter={(value: number) => [value.toFixed(1), '']}
            />
            <Legend />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="baselineTemp"
              stroke="#ff7300"
              name="Temperatura (Scenario Attuale)"
              strokeWidth={2}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="sustainableTemp"
              stroke="#52c41a"
              name="Temperatura (Con Interventi)"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Line
              yAxisId="water"
              type="monotone"
              dataKey="baselineWater"
              stroke="#0088fe"
              name="Livello Acqua (Scenario Attuale)"
              strokeWidth={2}
            />
            <Line
              yAxisId="water"
              type="monotone"
              dataKey="sustainableWater"
              stroke="#722ed1"
              name="Livello Acqua (Con Interventi)"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}