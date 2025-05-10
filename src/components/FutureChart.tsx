import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ClimateData } from '../types/climate';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface FutureChartProps {
  historicalData: ClimateData[];
  predictedData: ClimateData[];
}

export function FutureChart({ historicalData, predictedData }: FutureChartProps) {
  const allData = [...historicalData, ...predictedData];
  const presentYear = new Date().getFullYear();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Tendenze e Proiezioni Climatiche</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={allData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={(date) => format(new Date(date), 'yyyy', { locale: it })}
            />
            <YAxis yAxisId="temp" orientation="left" label={{ value: 'Temperatura (°C)', angle: -90 }} />
            <YAxis yAxisId="water" orientation="right" label={{ value: 'Livello Acqua (%)', angle: 90 }} />
            <Tooltip
              labelFormatter={(value) => format(new Date(value), 'yyyy', { locale: it })}
              formatter={(value: number) => [value.toFixed(1), '']}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const date = new Date(label);
                  const isPrediction = date.getFullYear() >= presentYear;
                  return (
                    <div className="bg-white p-3 border rounded shadow-sm">
                      <p className="text-sm font-medium">
                        {format(date, 'yyyy', { locale: it })}
                        {isPrediction && ' (Previsione)'}
                      </p>
                      {payload.map((entry: any) => (
                        <p key={entry.name} className="text-sm">
                          {entry.name}: {entry.value.toFixed(1)}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="temperature"
              stroke="#ff7300"
              name="Temperatura"
              strokeWidth={2}
            />
            <Line
              yAxisId="water"
              type="monotone"
              dataKey="waterLevel"
              stroke="#0088fe"
              name="Livello Acqua"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>• Dati storici: 1990-2020</p>
        <p>• Le proiezioni sono basate su analisi delle tendenze storiche e modelli predittivi</p>
      </div>
    </div>
  );
}