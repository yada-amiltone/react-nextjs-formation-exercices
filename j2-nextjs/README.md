# Jour 2 : exercices Next.js

Application d'exercices du jour 2 de la formation React & Next.js.
Fil rouge : une **Bibliothèque** (livres, avis, recherche, favoris).

- Next.js 16.4 (App Router, Turbopack, **Cache Components** activé comme dans
  un projet `create-next-app` récent)
- React 19.3, TypeScript, Zod 4
- CSS simple (`app/globals.css`), pour rester concentré sur Next.js

## Installation

Prérequis : **Node.js 24 ou plus** (`node -v`) et npm.

```bash
cd repo-exercices/j2-nextjs
npm install
npm run dev
```

Ouvrez <http://localhost:3000> : la page d'accueil liste les exercices, avec
pour chacun un lien **Mon exercice** et un lien **Solution**.

## Commandes

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement (rechargement à chaud) |
| `npm run build` | Build de production |
| `npm start` | Lance le build de production (après `npm run build`) |
| `npm run typecheck` | Génère les types des routes puis vérifie TypeScript |
| `npm run lint` | ESLint |
| `npm run reprendre -- 10 2` | Remplace votre exercice 10 par l'état « fin de l'étape 2 » (votre version est sauvegardée) |
| `npm run verifier-etapes` | Formateur : vérifie que chaque étape de chaque exercice compile (`-- --build` pour un build complet) |

## Structure

```
j2-nextjs/
├── app/
│   ├── page.tsx                  accueil : liste des exercices
│   ├── layout.tsx                layout racine (en-tête du site)
│   ├── exercices/                ✏️ VOTRE copie de travail (avec des TODO)
│   │   ├── 07-routing-layouts/   chaque dossier contient un README.md
│   │   ├── 08-server-components/
│   │   ├── 09-client-components/
│   │   ├── 10-streaming-recherche/
│   │   ├── 11-server-actions/
│   │   └── 12-route-handlers/    (montré en démo, à refaire seul)
│   └── solutions/                ✅ solutions complètes, visibles en live
│       └── (mêmes dossiers)
├── etapes/                       état de chaque exercice à la fin de chaque étape
│   └── 10-streaming-recherche/
│       ├── etape-0/              point de départ
│       └── etape-1/ … etape-5/   (la dernière = exercice terminé)
├── scripts/                      reprendre.mjs, verifier-etapes.mjs
├── Dockerfile, compose.yaml      image de production (démo Docker du module 10)
├── components/ui/                composants de présentation partagés (BookCard, Skeleton, Stars)
├── lib/
│   ├── books.ts                  données et types (Book, Review, Genre)
│   ├── db.ts                     « base de données » en mémoire, avec latence simulée
│   └── exercises.ts              liste des exercices (page d'accueil)
├── proxy.ts                      démo du proxy (exercice 12, solution)
└── next.config.ts
```

| Exercice | Module | Notions |
|---|---|---|
| 07 · routing-layouts | 6 | pages, `layout.tsx`, `<Link>`, `usePathname`, `metadata` |
| 08 · server-components | 7 | composant `async`, route `[id]`, `params` asynchrone, `notFound()`, `generateMetadata` |
| 09 · client-components | 7 | `'use client'`, `useState`, props sérialisables, Provider client (bonus) |
| 10 · streaming-recherche | 8 | `loading.tsx`, `<Suspense>`, `error.tsx`, `searchParams`, `<Form>` |
| 11 · server-actions | 9 | `'use server'`, `useActionState`, Zod, `'use cache'`, `cacheTag`, `updateTag` |
| 12 · route-handlers | 10 | `route.ts`, `Response.json`, statut 404, `proxy.ts` |

## Les données

`lib/db.ts` simule une base de données :

- `getBooks({ query?, genre?, fail? })` : ≈ 0,8 s ; `fail: true` lève une erreur.
- `getBook(id)` : ≈ 0,6 s ; renvoie `undefined` si le livre n'existe pas.
- `getRecommendations()` : ≈ 2,5 s (volontairement lent, exercice 10).
- `addReview(bookId, { author, rating, comment })` : ≈ 0,5 s.

Les données vivent en mémoire : elles sont **réinitialisées à chaque
redémarrage** du serveur. `lib/db.ts` importe `server-only` : l'importer
depuis un Client Component provoque une erreur de build, volontairement.

## Suivre et rattraper un exercice

Chaque exercice se fait **étape par étape**, en même temps que le formateur
qui code en partage d'écran. Les étapes sont décrites dans
`app/exercices/NN-.../README.md` : une consigne et « ce que vous devez voir ».

1. Codez dans `app/exercices/NN-.../` et regardez le résultat sur
   `http://localhost:3000/exercices/NN-...`.
2. Vérifiez **à l'œil** : comparez avec la solution en live
   (`http://localhost:3000/solutions/NN-...`), dans deux onglets côte à côte.
3. Perdu, ou absent pendant une étape ? Repartez de la fin de l'étape
   précédente :

   ```bash
   npm run reprendre -- 10      # liste les étapes de l'exercice 10
   npm run reprendre -- 10 2    # votre exercice 10 devient « fin de l'étape 2 »
   npm run reprendre -- 10 0    # retour au point de départ
   ```

   Votre version actuelle est d'abord copiée dans `.sauvegardes/` : rien n'est
   perdu. Rechargez ensuite la page du navigateur (F5).

Les exercices sont **indépendants** : si vous avez manqué l'exercice 09,
commencez le 10 directement.

## Lancer dans Docker (démo du module 10)

`next.config.ts` active `output: 'standalone'` : `next build` produit un serveur Node autonome
dans `.next/standalone`. Le `Dockerfile` (trois étapes : dépendances, build, exécution) et
`compose.yaml` s'en servent.

```bash
docker compose up --build -d    # construit l'image et démarre le conteneur
docker compose ps               # le service passe « healthy » en quelques secondes
docker compose logs -f web      # les logs du serveur
docker compose down             # arrête et supprime le conteneur
```

L'application répond sur http://localhost:3000 (arrêtez `npm run dev` avant, il utilise le même port).
Les données sont en mémoire : elles repartent à zéro à chaque nouveau conteneur.
Sans Docker : `npm run build` puis `node .next/standalone/server.js` lance le même serveur
(copiez d'abord `.next/static` et `public/` à côté, comme le fait le Dockerfile).

## Bon à savoir

- `params` et `searchParams` sont des **Promises** : `const { id } = await params`.
- Avec Cache Components, une donnée lue sans cache doit être affichée sous un
  `<Suspense>` (ou un `loading.tsx`) : sinon Next.js affiche une erreur en
  développement et le build échoue.
- Les tutoriels écrits pour des versions antérieures à Next.js 16 parlent
  parfois de `middleware.ts` (aujourd'hui `proxy.ts`), de `params` synchrones
  ou du dossier `pages/` : ce n'est pas ce que nous utilisons ici.
- Next.js collecte une télémétrie anonyme ; pour la désactiver :
  `npx next telemetry disable`.
