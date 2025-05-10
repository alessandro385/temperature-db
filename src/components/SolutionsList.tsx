import React from 'react';
import { Check, Droplets, Leaf, Sun, TreePine, Users } from 'lucide-react';

interface Solution {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  impact: string[];
}

interface SolutionsListProps {
  selectedSolutions: string[];
  onSolutionsChange: (solutions: string[]) => void;
}

const SOLUTIONS: Solution[] = [
  {
    id: 'renewable-energy',
    title: 'Energia Rinnovabile',
    description: 'Transizione completa verso energie pulite',
    icon: Sun,
    impact: [
      'Riduzione drastica emissioni CO2',
      'Miglioramento qualità aria',
      'Indipendenza energetica sostenibile',
    ],
  },
  {
    id: 'water-management',
    title: 'Gestione Idrica Avanzata',
    description: 'Sistemi integrati di conservazione acqua',
    icon: Droplets,
    impact: [
      'Riciclo completo acque reflue',
      'Zero sprechi idrici',
      'Distribuzione ottimizzata',
    ],
  },
  {
    id: 'sustainable-agriculture',
    title: 'Agricoltura Rigenerativa',
    description: 'Pratiche agricole che rigenerano l\'ecosistema',
    icon: Leaf,
    impact: [
      'Aumento fertilità naturale suolo',
      'Produzione alimentare resiliente',
      'Ripristino biodiversità',
    ],
  },
  {
    id: 'reforestation',
    title: 'Riforestazione Massiva',
    description: 'Ripristino ecosistemi su larga scala',
    icon: TreePine,
    impact: [
      'Creazione pozzi di carbonio',
      'Ripristino ciclo dell\'acqua',
      'Habitat per biodiversità',
    ],
  },
  {
    id: 'population-control',
    title: 'Gestione Demografica Sostenibile',
    description: 'Pianificazione demografica consapevole',
    icon: Users,
    impact: [
      'Riduzione pressione risorse',
      'Migliore qualità della vita',
      'Sviluppo sociale equilibrato',
    ],
  },
];

export function SolutionsList({ selectedSolutions, onSolutionsChange }: SolutionsListProps) {
  const toggleSolution = (solutionId: string) => {
    if (selectedSolutions.includes(solutionId)) {
      onSolutionsChange(selectedSolutions.filter(id => id !== solutionId));
    } else {
      onSolutionsChange([...selectedSolutions, solutionId]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Soluzioni Disponibili</h2>
      <div className="space-y-4">
        {SOLUTIONS.map((solution) => {
          const isSelected = selectedSolutions.includes(solution.id);
          const Icon = solution.icon;
          
          return (
            <div
              key={solution.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                isSelected ? 'border-green-500 bg-green-50' : 'hover:border-gray-400'
              }`}
              onClick={() => toggleSolution(solution.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  isSelected ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    isSelected ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{solution.title}</h3>
                    {isSelected && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {solution.description}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {solution.impact.map((impact, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedSolutions.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            {selectedSolutions.length} {selectedSolutions.length === 1 ? 'soluzione selezionata' : 'soluzioni selezionate'}. 
            Gli effetti combinati potrebbero portare a risultati migliori.
          </p>
        </div>
      )}
    </div>
  );
}