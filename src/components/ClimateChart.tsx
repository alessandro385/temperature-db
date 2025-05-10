import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ClimateData } from '../types/climate';

interface ClimateChartProps {
  data: ClimateData[];
}

export function ClimateChart({ data }: ClimateChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Real-time Climate Trends</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={(date) => new Date(date).toLocaleTimeString()}
            />
            <YAxis yAxisId="temp" orientation="left" label={{ value: 'Temperature (°C)', angle: -90 }} />
            <YAxis yAxisId="precip" orientation="right" label={{ value: 'Precipitation (mm)', angle: 90 }} />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleString()}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            />
            <Legend />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="temperature"
              stroke="#ff7300"
              name="Temperature"
              dot={false}
            />
            <Line
              yAxisId="precip"
              type="monotone"
              dataKey="precipitation"
              stroke="#387908"
              name="Precipitation"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}