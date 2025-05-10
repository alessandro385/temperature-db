import { ClimateData, SimulationParams, ThresholdAlert } from '../types/climate';
import { BASELINE_CLIMATE_DATA, THRESHOLDS } from './constants';

function generateRandomVariation(baseValue: number, volatility: number): number {
  const randomFactor = 1 + (Math.random() - 0.5) * volatility;
  return baseValue * randomFactor;
}

export function generateRealtimeData(previousData: ClimateData): ClimateData {
  const volatility = 0.02; // 2% variation

  return {
    temperature: generateRandomVariation(previousData.temperature, volatility),
    precipitation: generateRandomVariation(previousData.precipitation, volatility),
    extremeEvents: generateRandomVariation(previousData.extremeEvents, volatility),
    waterLevel: generateRandomVariation(previousData.waterLevel, volatility),
    riverFlow: generateRandomVariation(previousData.riverFlow, volatility),
    waterQuality: generateRandomVariation(previousData.waterQuality, volatility),
    cropYield: generateRandomVariation(previousData.cropYield, volatility),
    irrigatedArea: generateRandomVariation(previousData.irrigatedArea, volatility),
    vegetationCover: generateRandomVariation(previousData.vegetationCover, volatility),
    desertification: generateRandomVariation(previousData.desertification, volatility),
    soilQuality: generateRandomVariation(previousData.soilQuality, volatility),
    population: previousData.population * (1 + 0.00001), // Very small daily growth
    waterAccess: generateRandomVariation(previousData.waterAccess, volatility),
    waterConsumption: generateRandomVariation(previousData.waterConsumption, volatility),
    timestamp: new Date(),
  };
}

export function simulateFutureData(params: SimulationParams): ClimateData[] {
  const data: ClimateData[] = [];
  let currentData = { ...BASELINE_CLIMATE_DATA };
  
  for (let year = 0; year <= params.timespan; year++) {
    currentData = {
      ...currentData,
      temperature: currentData.temperature + params.temperatureIncrease,
      precipitation: currentData.precipitation * (1 - params.precipitationDecrease),
      population: currentData.population * (1 + params.populationGrowth),
      waterLevel: currentData.waterLevel * (1 - params.precipitationDecrease * 0.5),
      cropYield: currentData.cropYield * (1 - (params.temperatureIncrease * 0.1)),
      timestamp: new Date(new Date().getFullYear() + year, 0, 1),
    };
    
    data.push(currentData);
  }
  
  return data;
}

export function checkThresholds(data: ClimateData): ThresholdAlert[] {
  const alerts: ThresholdAlert[] = [];

  if (data.temperature >= THRESHOLDS.TEMPERATURE.CRITICAL) {
    alerts.push({
      parameter: 'Temperatura',
      value: data.temperature,
      threshold: THRESHOLDS.TEMPERATURE.CRITICAL,
      message: 'Livelli di temperatura critici raggiunti!',
      severity: 'critical',
    });
  } else if (data.temperature >= THRESHOLDS.TEMPERATURE.WARNING) {
    alerts.push({
      parameter: 'Temperatura',
      value: data.temperature,
      threshold: THRESHOLDS.TEMPERATURE.WARNING,
      message: 'Avviso: temperatura elevata',
      severity: 'warning',
    });
  }

  if (data.waterLevel <= THRESHOLDS.WATER_LEVEL.CRITICAL) {
    alerts.push({
      parameter: 'Livello Acqua',
      value: data.waterLevel,
      threshold: THRESHOLDS.WATER_LEVEL.CRITICAL,
      message: 'Livelli idrici critici!',
      severity: 'critical',
    });
  } else if (data.waterLevel <= THRESHOLDS.WATER_LEVEL.WARNING) {
    alerts.push({
      parameter: 'Livello Acqua',
      value: data.waterLevel,
      threshold: THRESHOLDS.WATER_LEVEL.WARNING,
      message: 'Avviso: livello acqua basso',
      severity: 'warning',
    });
  }

  return alerts;
}