import React from 'react';
import { ClimateData } from '../types/climate';
import { AlertTriangle, Info } from 'lucide-react';

interface RecommendationsProps {
  data: ClimateData[];
}

export function Recommendations({ data }: RecommendationsProps) {
  const lastDataPoint = data[data.length - 1];
  
  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Raccomandazioni e Misure Preventive</h2>
      
      <div className="space-y-4">
        {lastDataPoint.temperature > 30 && (
          <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
            <AlertTriangle className="text-orange-500" />
            <div>
              <h3 className="font-semibold text-orange-800">Temperature Elevate Previste</h3>
              <p className="text-orange-700">
                • Installare sistemi di raffreddamento efficienti<br />
                • Creare zone d'ombra nelle aree pubbliche<br />
                • Implementare orari di lavoro flessibili durante le ore più calde
              </p>
            </div>
          </div>
        )}
        
        {lastDataPoint.waterLevel < 50 && (
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <Info className="text-blue-500" />
            <div>
              <h3 className="font-semibold text-blue-800">Scarsità d'Acqua Prevista</h3>
              <p className="text-blue-700">
                • Implementare sistemi di raccolta dell'acqua piovana<br />
                • Adottare tecniche di irrigazione efficiente<br />
                • Promuovere il riutilizzo delle acque grigie
              </p>
            </div>
          </div>
        )}
        
        {lastDataPoint.cropYield < 2 && (
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <Info className="text-green-500" />
            <div>
              <h3 className="font-semibold text-green-800">Produzione Agricola a Rischio</h3>
              <p className="text-green-700">
                • Diversificare le colture con varietà resistenti alla siccità<br />
                • Implementare tecniche di agricoltura conservativa<br />
                • Creare banche dei semi locali
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}