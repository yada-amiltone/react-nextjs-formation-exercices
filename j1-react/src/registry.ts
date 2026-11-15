import type { ComponentType } from 'react';
import Ex00 from './exercices/00-js-moderne/Exercice';
import Sol00 from './solutions/00-js-moderne/Solution';
import Ex01 from './exercices/01-jsx-composants/Exercice';
import Sol01 from './solutions/01-jsx-composants/Solution';
import Ex02 from './exercices/02-props-listes/Exercice';
import Sol02 from './solutions/02-props-listes/Solution';
import Ex03 from './exercices/03-state-evenements/Exercice';
import Sol03 from './solutions/03-state-evenements/Solution';
import Ex04 from './exercices/04-formulaire-filtre/Exercice';
import Sol04 from './solutions/04-formulaire-filtre/Solution';
import Ex05 from './exercices/05-effets-fetch/Exercice';
import Sol05 from './solutions/05-effets-fetch/Solution';
import Ex06 from './exercices/06-context-liste-lecture/Exercice';
import Sol06 from './solutions/06-context-liste-lecture/Solution';

export type ExerciseEntry = {
  id: string;
  slug: string;
  title: string;
  module: string;
  Exercice: ComponentType;
  Solution: ComponentType;
};

export const EXERCISES: ExerciseEntry[] = [
  { id: '00', slug: '00-js-moderne', title: 'JavaScript et TypeScript modernes', module: 'Module 0', Exercice: Ex00, Solution: Sol00 },
  { id: '01', slug: '01-jsx-composants', title: 'JSX et composants', module: 'Module 1', Exercice: Ex01, Solution: Sol01 },
  { id: '02', slug: '02-props-listes', title: 'Props, listes et conditions', module: 'Module 2', Exercice: Ex02, Solution: Sol02 },
  { id: '03', slug: '03-state-evenements', title: 'État et événements', module: 'Module 3', Exercice: Ex03, Solution: Sol03 },
  { id: '04', slug: '04-formulaire-filtre', title: 'Formulaire et filtre', module: 'Module 3', Exercice: Ex04, Solution: Sol04 },
  { id: '05', slug: '05-effets-fetch', title: 'Effets et chargement de données', module: 'Module 4', Exercice: Ex05, Solution: Sol05 },
  { id: '06', slug: '06-context-liste-lecture', title: 'Context : liste de lecture', module: 'Module 5', Exercice: Ex06, Solution: Sol06 },
];
