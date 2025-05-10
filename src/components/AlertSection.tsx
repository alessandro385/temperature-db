import React from 'react';
import { AlertCard } from './AlertCard';
import { ThresholdAlert } from '../types/climate';

interface AlertSectionProps {
  alerts: ThresholdAlert[];
}

export function AlertSection({ alerts }: AlertSectionProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Active Alerts</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {alerts.map((alert, index) => (
          <AlertCard key={index} alert={alert} />
        ))}
      </div>
    </div>
  );
}