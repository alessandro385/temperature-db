import { ClimateData } from '../types/climate';

// Dati storici degli ultimi 30 anni (1990-2020)
export const HISTORICAL_DATA: ClimateData[] = Array.from({ length: 31 }, (_, index) => ({
  temperature: 25 + (index * 0.1) + (Math.sin(index * 0.5) * 0.5),
  precipitation: 800 - (index * 13.3) + (Math.sin(index * 0.5) * 20),
  extremeEvents: 0.1 + (index * 0.003),
  waterLevel: 100 - (index * 0.67) + (Math.sin(index * 0.5) * 2),
  riverFlow: 100 - (index * 1) + (Math.sin(index * 0.5) * 3),
  waterQuality: 90 - (index * 0.67) + (Math.sin(index * 0.5) * 2),
  cropYield: 3 - (index * 0.025) + (Math.sin(index * 0.5) * 0.1),
  irrigatedArea: 30 - (index * 0.5) + (Math.sin(index * 0.5) * 1),
  vegetationCover: 60 - (index * 0.67) + (Math.sin(index * 0.5) * 1),
  desertification: 10 + (index * 0.67) + (Math.sin(index * 0.5) * 0.5),
  soilQuality: 90 - (index * 1) + (Math.sin(index * 0.5) * 2),
  population: 7000000 * (1 + (index * 0.014)),
  waterAccess: 90 - (index * 0.67) + (Math.sin(index * 0.5) * 1),
  waterConsumption: 150 - (index) + (Math.sin(index * 0.5) * 2),
  timestamp: new Date(1990 + index, 0, 1),
}));