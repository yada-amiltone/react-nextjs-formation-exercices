# Formation React & Next.js : exercices

Repo d'exercices de la formation de deux jours (distanciel). Domaine fil rouge : une **bibliothèque** (livres, auteurs, avis, liste de lecture).

| Dossier | Jour | Stack | Lancer |
|---|---|---|---|
| [`j1-react`](j1-react/README.md) | Jour 1 : fondamentaux de React | Vite, React 19, TypeScript | `npm run dev` |
| [`j2-nextjs`](j2-nextjs/README.md) | Jour 2 : Next.js App Router | Next.js 16, React 19, TypeScript, Zod | `npm run dev` |

## Prérequis

- **Node.js 24 ou plus** (`node -v`). Un fichier `.nvmrc` est fourni : `nvm use`.
- Git et un éditeur (VS Code conseillé).

## Installation (à faire avant le jour 1)

```bash
git clone <URL_DU_REPO> formation-react-next
cd formation-react-next/j1-react && npm install
cd ../j2-nextjs && npm install && npm run build
```

Pour vérifier : `npm run dev` dans chaque dossier, puis ouvrez l'adresse affichée dans le terminal.

## Les exercices

| # | Dossier | Notions |
|---|---|---|
| 00 | `j1-react/src/exercices/00-js-moderne` | déstructuration, template literals, `filter` / `map`, spread |
| 01 | `j1-react/src/exercices/01-jsx-composants` | JSX, composants, props typées |
| 02 | `j1-react/src/exercices/02-props-listes` | props, `map` et `key`, rendu conditionnel, `children` |
| 03 | `j1-react/src/exercices/03-state-evenements` | `useState`, événements, mises à jour immuables |
| 04 | `j1-react/src/exercices/04-formulaire-filtre` | formulaires contrôlés, état dérivé |
| 05 | `j1-react/src/exercices/05-effets-fetch` | `useEffect`, loading / error, hook `useBooks` |
| 06 | `j1-react/src/exercices/06-context-liste-lecture` | Context, Provider, hook d'accès |
| 07 | `j2-nextjs/app/exercices/07-routing-layouts` | routage par fichiers, layouts, `Link`, lien actif |
| 08 | `j2-nextjs/app/exercices/08-server-components` | Server Components, route `[id]`, `notFound`, métadonnées |
| 09 | `j2-nextjs/app/exercices/09-client-components` | `'use client'`, frontière serveur / client |
| 10 | `j2-nextjs/app/exercices/10-streaming-recherche` | `loading.tsx`, `Suspense`, `error.tsx`, `searchParams`, `<Form>` |
| 11 | `j2-nextjs/app/exercices/11-server-actions` | Server Actions, `useActionState`, Zod, invalidation du cache |
| 12 | `j2-nextjs/app/exercices/12-route-handlers` | Route Handlers (montré en démo, à refaire seul) |

## Suivre un exercice pas à pas

Chaque exercice est **autonome** et découpé en **étapes** (les mêmes que dans les slides). Le formateur code chaque étape en partage d'écran, vous faites la même chose sur votre poste.

1. Ouvrez le `README.md` de l'exercice : objectif, étapes numérotées, ce que vous devez voir à l'écran après chaque étape.
2. Complétez les `TODO` de l'étape en cours, vérifiez le résultat dans le navigateur.
3. Comparez à l'œil avec la solution :
   - Jour 1 : bouton « Solution » dans l'application (`npm run dev`).
   - Jour 2 : ouvrez `/exercices/NN-...` et `/solutions/NN-...` côte à côte.

## Rattraper une étape

Vous avez décroché, ou votre code ne compile plus ? Repartez de la fin de n'importe quelle étape :

```bash
npm run reprendre -- 03      # liste les étapes de l'exercice 03
npm run reprendre -- 03 2    # votre exercice 03 repart de la fin de l'étape 2
npm run reprendre -- 03 0    # retour au point de départ
```

Votre version en cours est d'abord sauvegardée dans `.sauvegardes/` : rien n'est perdu. Les états de chaque étape sont dans le dossier `etapes/` de chaque application.

Les slides des deux jours accompagnent ce repo : chaque exercice indique le module qui le précède.
