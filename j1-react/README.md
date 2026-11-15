# Jour 1 · Les fondamentaux de React

Application d'exercices du premier jour : 7 exercices indépendants autour d'une bibliothèque de livres, à faire **pas à pas** avec le formateur.

## Installation

Prérequis : **Node.js 24+** (`node -v`) et Git.

```bash
cd j1-react
npm install
npm run dev
```

Ouvrir http://localhost:5173. La barre de gauche liste les exercices ; le bouton en haut à droite bascule entre **Mon exercice** (votre code) et **Solution**.

## Comment se passe un exercice

1. Le formateur présente l'exercice et ses étapes (3 ou 4 étapes de 5 à 10 minutes, chacune avec un temps maximum).
2. Pour chaque étape, il code en partage d'écran et vous faites la même chose dans `Exercice.tsx` (`logique.ts` pour l'exercice 00).
3. Vous vérifiez **à l'œil** que votre écran montre le résultat attendu (il est écrit dans le README de l'exercice et sur la slide). On passe à l'étape suivante quand tout le monde y est, ou quand le temps de l'étape est écoulé : le formateur montre alors la solution, et ceux qui n'ont pas fini font `npm run reprendre`.

Il n'y a pas de tests automatiques : la vue **Solution** de l'application sert de référence.

## Rattraper une étape ou un exercice

Décroché à l'étape 3 ? Repartez de la fin de l'étape 2 :

```bash
npm run reprendre -- 05 2
```

| Commande | Effet |
|---|---|
| `npm run reprendre` | liste les exercices |
| `npm run reprendre -- 05` | liste les étapes de l'exercice 05 |
| `npm run reprendre -- 05 2` | remplace votre exercice 05 par l'état « fin de l'étape 2 » |
| `npm run reprendre -- 05 0` | revient au point de départ de l'exercice |

Votre version est d'abord sauvegardée dans `.sauvegardes/` : rien n'est perdu. Les exercices sont aussi **indépendants** entre eux : rater le 03 n'empêche pas de faire le 04.

## Organisation du dossier

| Chemin | Contenu |
|---|---|
| `src/exercices/NN-nom/` | **votre copie de travail** : `Exercice.tsx` (le seul fichier à modifier ; `logique.ts` pour l'exercice 00) et `README.md` (objectif, étapes, résultat attendu, code de chaque étape) |
| `src/solutions/NN-nom/Solution.tsx` | la correction commentée, affichée par le bouton **Solution** |
| `etapes/NN-nom/etape-K/` | l'état de l'exercice à la fin de chaque étape (utilisé par `npm run reprendre`) |
| `src/data/books.ts`, `src/types.ts` | les données et les types partagés |
| `src/api/fakeApi.ts` | l'API simulée de l'exercice 05 (`?fail=1` dans l'URL simule une panne) |

## Les exercices

| # | Dossier | Module | Étapes | Durée |
|---|---|---|---|---|
| 00 | `src/exercices/00-js-moderne` | 0 · JavaScript et TypeScript modernes | 3 | 20 min |
| 01 | `src/exercices/01-jsx-composants` | 1 · Penser en composants | 4 | 30 min |
| 02 | `src/exercices/02-props-listes` | 2 · Props, listes et conditions | 4 | 40 min |
| 03 | `src/exercices/03-state-evenements` | 3 · État et événements | 4 | 30 min |
| 04 | `src/exercices/04-formulaire-filtre` | 3 · État et événements | 4 | 30 min |
| 05 | `src/exercices/05-effets-fetch` | 4 · Effets et hooks personnalisés | 4 (+ 1 hors séance) | 30 min |
| 06 | `src/exercices/06-context-liste-lecture` | 5 · Partager l'état avec le Context | 4 | 30 min |

## Commandes

| Commande | Rôle |
|---|---|
| `npm run dev` | lance l'application avec rechargement à chaud |
| `npm run reprendre -- NN K` | repart de la fin de l'étape K de l'exercice NN |
| `npm run typecheck` | vérifie les types TypeScript |
| `npm run build` | build de production |
| `npm run verifier-etapes` | (formateur) vérifie que chaque étape de chaque exercice compile et que la dernière étape correspond à la solution |
