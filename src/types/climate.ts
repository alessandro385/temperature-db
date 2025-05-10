export interface ClimateData {
  temperature: number;
  precipitation: number;
  extremeEvents: number;
  waterLevel: number;
  riverFlow: number;
  waterQuality: number;
  cropYield: number;
  irrigatedArea: number;
  vegetationCover: number;
  desertification: number;
  soilQuality: number;
  population: number;
  waterAccess: number;
  waterConsumption: number;
  timestamp: Date;
}

export interface SimulationParams {
  temperatureIncrease: number;
  precipitationDecrease: number;
  populationGrowth: number;
  timespan: number;
}

export interface ThresholdAlert {
  parameter: string;
  value: number;
  threshold: number;
  message: string;
  severity: 'warning' | 'critical';
}