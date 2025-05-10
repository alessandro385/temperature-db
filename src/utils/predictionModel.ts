import { ClimateData } from '../types/climate';
import { HISTORICAL_DATA } from './historicalData';

interface TrendAnalysis {
  slope: number;
  intercept: number;
  r2: number;
}

function calculateLinearRegression(data: number[], years: number[]): TrendAnalysis {
  const n = data.length;
  const sumX = years.reduce((a, b) => a + b, 0);
  const sumY = data.reduce((a, b) => a + b, 0);
  const sumXY = years.reduce((acc, x, i) => acc + x * data[i], 0);
  const sumXX = years.reduce((acc, x) => acc + x * x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Calcolo R²
  const yMean = sumY / n;
  const totalSS = data.reduce((acc, y) => acc + Math.pow(y - yMean, 2), 0);
  const regressionSS = data.reduce((acc, y, i) => {
    const yPred = slope * years[i] + intercept;
    return acc + Math.pow(yPred - yMean, 2);
  }, 0);
  const r2 = regressionSS / totalSS;

  return { slope, intercept, r2 };
}

function analyzeHistoricalTrends(): Record<keyof Omit<ClimateData, 'timestamp'>, TrendAnalysis> {
  const years = HISTORICAL_DATA.map((d, i) => i);
  const trends: any = {};

  Object.keys(HISTORICAL_DATA[0]).forEach((key) => {
    if (key !== 'timestamp') {
      const values = HISTORICAL_DATA.map(d => d[key as keyof ClimateData] as number);
      trends[key] = calculateLinearRegression(values, years);
    }
  });

  return trends;
}

export function generatePredictions(yearsToPredict: number): ClimateData[] {
  const trends = analyzeHistoricalTrends();
  const predictions: ClimateData[] = [];
  const baseYear = new Date().getFullYear();

  for (let year = 0; year <= yearsToPredict; year++) {
    const prediction: any = {
      timestamp: new Date(baseYear + year, 0, 1),
    };

    Object.keys(trends).forEach((key) => {
      const { slope, intercept } = trends[key];
      const baseValue = HISTORICAL_DATA[HISTORICAL_DATA.length - 1][key as keyof ClimateData] as number;
      
      // Aggiungiamo variabilità casuale basata sulla deviazione standard storica
      const randomFactor = 1 + (Math.random() - 0.5) * 0.1;
      
      // Calcolo non lineare per simulare effetti di feedback
      const accelerationFactor = 1 + (year * 0.01);
      prediction[key] = baseValue + (slope * year * accelerationFactor * randomFactor);
    });

    predictions.push(prediction as ClimateData);
  }

  return predictions;
}