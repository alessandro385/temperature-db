import { ClimateData } from '../types/climate';
import { generatePredictions } from './predictionModel';

interface SolutionImpact {
  temperature: number;
  precipitation: number;
  waterLevel: number;
  cropYield: number;
  population: number;
}

const SOLUTION_IMPACTS: Record<string, SolutionImpact> = {
  'renewable-energy': {
    temperature: -0.05,    // Maggiore impatto sulla riduzione temperatura
    precipitation: 0.01,   
    waterLevel: 0.02,     
    cropYield: 0.02,
    population: 0         // Nessun impatto diretto sulla popolazione
  },
  'water-management': {
    temperature: -0.02,
    precipitation: 0.03,
    waterLevel: 0.04,     // Maggiore impatto sulla conservazione dell'acqua
    cropYield: 0.03,
    population: -0.001    // Leggera riduzione per migrazione verso aree più sostenibili
  },
  'sustainable-agriculture': {
    temperature: -0.03,
    precipitation: 0.02,
    waterLevel: 0.03,
    cropYield: 0.05,      // Maggiore impatto sulla produzione alimentare
    population: 0.002     // Aumento sostenibile della capacità di supporto
  },
  'reforestation': {
    temperature: -0.06,   // Forte impatto sul raffreddamento
    precipitation: 0.04,  // Maggiore effetto sul ciclo dell'acqua
    waterLevel: 0.04,
    cropYield: 0.03,
    population: -0.002    // Riduzione per riconversione aree urbane
  },
  'population-control': {
    temperature: -0.02,
    precipitation: 0.01,
    waterLevel: 0.03,
    cropYield: 0.02,
    population: -0.015    // Significativa riduzione della crescita demografica
  }
};

export function generateSustainablePredictions(
  yearsToPredict: number,
  selectedSolutions: string[]
): ClimateData[] {
  const basePredictions = generatePredictions(yearsToPredict);
  
  if (selectedSolutions.length === 0) return basePredictions;

  return basePredictions.map((prediction, yearIndex) => {
    const cumulativeImpact = selectedSolutions.reduce((acc, solution) => {
      const impact = SOLUTION_IMPACTS[solution];
      // Effetto cumulativo non lineare che aumenta nel tempo
      const timeMultiplier = Math.pow(1.1, yearIndex / 5);
      
      return {
        temperature: acc.temperature + (impact.temperature * timeMultiplier),
        precipitation: acc.precipitation + (impact.precipitation * timeMultiplier),
        waterLevel: acc.waterLevel + (impact.waterLevel * timeMultiplier),
        cropYield: acc.cropYield + (impact.cropYield * timeMultiplier),
        population: acc.population + (impact.population * timeMultiplier)
      };
    }, { temperature: 0, precipitation: 0, waterLevel: 0, cropYield: 0, population: 0 });

    // Applicazione degli impatti con effetti di feedback positivi
    const sustainableScenario = {
      ...prediction,
      temperature: prediction.temperature + cumulativeImpact.temperature,
      precipitation: prediction.precipitation * (1 + cumulativeImpact.precipitation),
      waterLevel: prediction.waterLevel * (1 + cumulativeImpact.waterLevel),
      cropYield: prediction.cropYield * (1 + cumulativeImpact.cropYield),
      population: prediction.population * (1 + cumulativeImpact.population)
    };

    // Aggiunta di effetti sinergici tra le soluzioni
    if (selectedSolutions.length > 1) {
      const synergyBonus = 0.1 * (selectedSolutions.length - 1);
      sustainableScenario.temperature *= (1 - synergyBonus);
      sustainableScenario.cropYield *= (1 + synergyBonus);
      sustainableScenario.waterLevel *= (1 + synergyBonus);
    }

    return sustainableScenario;
  });
}