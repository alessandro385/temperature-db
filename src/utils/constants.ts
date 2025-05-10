export const THRESHOLDS = {
  TEMPERATURE: {
    WARNING: 32,
    CRITICAL: 35,
  },
  WATER_LEVEL: {
    WARNING: 40,
    CRITICAL: 30,
  },
  DESERTIFICATION: {
    WARNING: 35,
    CRITICAL: 40,
  },
} as const;

export const INITIAL_SIMULATION_PARAMS = {
  temperatureIncrease: 0.1,
  precipitationDecrease: 0.02,
  populationGrowth: 0.015,
  timespan: 30,
} as const;

export const BASELINE_CLIMATE_DATA = {
  temperature: 28,
  precipitation: 400,
  extremeEvents: 0.2,
  waterLevel: 80,
  riverFlow: 70,
  waterQuality: 70,
  cropYield: 2.25,
  irrigatedArea: 15,
  vegetationCover: 40,
  desertification: 30,
  soilQuality: 60,
  population: 10000000,
  waterAccess: 55,
  waterConsumption: 120,
  timestamp: new Date(),
} as const;