import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ThresholdAlert } from '../types/climate';

interface AlertCardProps {
  alert: ThresholdAlert;
}

export function AlertCard({ alert }: AlertCardProps) {
  return (
    <div
      className={`p-4 rounded-lg flex items-start gap-3 ${
        alert.severity === 'critical' ? 'bg-red-100' : 'bg-yellow-100'
      }`}
    >
      <AlertTriangle className={
        alert.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
      } />
      <div>
        <h3 className="font-semibold">{alert.parameter}</h3>
        <p className="text-sm">{alert.message}</p>
        <p className="text-sm mt-1">
          Current: {alert.value.toFixed(1)} (Threshold: {alert.threshold})
        </p>
      </div>
    </div>
  );
}