# Exercice 12 (bonus) : Route Handlers

**Module 10** · environ 20 min · 3 étapes · montré en démo pendant la formation, à refaire seul
Votre version : <http://localhost:3000/exercices/12-route-handlers>
Solution : <http://localhost:3000/solutions/12-route-handlers>

## Objectif

Exposer une petite API JSON de la Bibliothèque, pour une application mobile ou un partenaire :

- `GET /exercices/12-route-handlers/api/livres?q=...&genre=...`
- `GET /exercices/12-route-handlers/api/livres/[id]`
- `POST /exercices/12-route-handlers/api/livres/[id]/avis` (étape 3)

## Notions

- `route.ts` : un fichier qui exporte des fonctions nommées d'après les méthodes
  HTTP (`GET`, `POST`, `PUT`, `DELETE`...).
- API Web standard : `Request`, `Response.json(data, { status })`.
- `NextRequest` ajoute `request.nextUrl.searchParams`.
- Le 2ᵉ argument contient `params` (une Promise), comme pour une page.
- Pas de `route.ts` et de `page.tsx` dans le même dossier.

## Fichiers

```
app/exercices/12-route-handlers/
├── page.tsx                    ← fourni : liens pour tester l'API
└── api/livres/
    ├── route.ts                ← étape 1
    └── [id]/
        ├── route.ts            ← étape 2
        └── avis/route.ts       ← étape 3 (à créer)
```

## Étapes

### Étape 1 : API de la liste

- Dans `api/livres/route.ts`, lisez `q` et `genre` avec `request.nextUrl.searchParams`.
- Appelez `getBooks`, renvoyez `{ count, data }` où chaque livre a un champ
  `reviewCount` à la place du tableau `reviews`.

**Ce que vous devez voir :** le lien « Recherche tolkien » de la page renvoie un JSON avec `"count": 2`.

### Étape 2 : API du détail et 404

- Dans `api/livres/[id]/route.ts`, renvoyez le livre, ou
  `Response.json({ error: '...' }, { status: 404 })` s'il n'existe pas.

**Ce que vous devez voir :**
`curl -i http://localhost:3000/exercices/12-route-handlers/api/livres/livre-inconnu` affiche `HTTP/1.1 404`.

### Étape 3 : Avis en POST

- Créez `api/livres/[id]/avis/route.ts` qui exporte `POST`.
- Validez le corps JSON avec Zod, appelez `addReview`, renvoyez le statut **201** (succès) ou **400** (erreurs).

**Ce que vous devez voir :**

```bash
curl -i -X POST -H "content-type: application/json" \
  -d '{"author":"Ada","rating":5,"comment":"Un classique absolu."}' \
  http://localhost:3000/exercices/12-route-handlers/api/livres/dune/avis
```

renvoie `201` et l'avis créé ; avec `"author":"A"`, `400` et la liste des erreurs.

## Perdu ? Repartez d'une étape

```bash
npm run reprendre -- 12 1   # votre exercice devient « fin de l'étape 1 »
```

## Vérifier

Comparez les réponses JSON avec celles de la solution (mêmes liens sur la page de la solution).

## Indices

<details>
<summary>Lire les paramètres de requête</summary>

```ts
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') ?? undefined
  // ...
}
```
</details>

<details>
<summary>Retirer `reviews` de chaque livre</summary>

```ts
const data = books.map(({ reviews, ...book }) => ({ ...book, reviewCount: reviews.length }))
```
</details>

## Le proxy (démonstration du formateur)

Le fichier `proxy.ts`, à la racine du projet (un seul par projet), s'exécute
avant les requêtes de l'API de la **solution** et ajoute un en-tête :

```bash
curl -i http://localhost:3000/solutions/12-route-handlers/api/livres
# x-bibliotheque-api: formation-nextjs
```

Il sert aux redirections, réécritures, en-têtes et contrôles d'accès rapides,
pas au chargement de données.
