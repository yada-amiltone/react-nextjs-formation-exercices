# Exercice 10 : streaming, erreurs et recherche

**Module 8** · environ 45 min · 5 étapes (la 5e en démo)
Votre version : <http://localhost:3000/exercices/10-streaming-recherche>
Solution : <http://localhost:3000/solutions/10-streaming-recherche>

## Objectif

Rendre la page de recherche agréable même quand les données sont lentes ou
en erreur : squelette de chargement, affichage progressif (streaming),
recherche partageable via l'URL et page d'erreur avec « Réessayer ».

## Notions

- `loading.tsx` : affiché pendant que la page attend ses données.
- `<Suspense fallback={...}>` : affiche une partie de la page sans attendre
  une autre partie plus lente. Le HTML est envoyé **en flux** (streaming).
- `searchParams` (une Promise) : l'URL comme état de la page (`?q=dune&genre=...`).
- `<Form>` de `next/form` : formulaire de recherche qui met à jour l'URL.
- `error.tsx` : affiché en cas d'erreur ; Client Component, reçoit `error` et `retry`.

## Fichiers

```
app/exercices/10-streaming-recherche/
├── loading.tsx               ← étape 1
├── page.tsx                  ← étapes 2, 3 et 5
├── error.tsx                 ← étape 5 (à créer)
└── _components/
    ├── BookResults.tsx       ← fourni (≈ 0,8 s)
    ├── Recommendations.tsx   ← fourni (≈ 2,5 s, volontairement lent)
    └── SearchForm.tsx        ← étape 4
```

## Étapes

### Étape 1 : Squelette de chargement

- Dans `loading.tsx`, remplacez « Chargement... » par un `<h1>` et `<BookGridSkeleton />`
  (`import { BookGridSkeleton } from '@/components/ui/Skeleton'`).

**Ce que vous devez voir :** en rechargeant, des cartes grises animées pendant ~2,5 s, puis toute la page d'un coup.

### Étape 2 : Streamer avec Suspense

- Dans `page.tsx`, entourez `<Recommendations />` d'un
  `<Suspense fallback={<BookGridSkeleton count={3} />}>`.
- Faites de même pour `<BookResults />` avec `<BookGridSkeleton />`.

**Ce que vous devez voir :** les résultats apparaissent après ~0,8 s, les recommandations arrivent ensuite, seules.

### Étape 3 : Recherche dans l'URL

- Recevez `searchParams` dans la page et lisez `const { q = '', genre = '' } = await searchParams`.
- Passez `q` et `genre` à `<BookResults>` et à `<SearchForm>`.
- Ajoutez `key={`${q}|${genre}`}` sur le `<Suspense>` des résultats.

**Ce que vous devez voir :** en tapant `?q=tolkien` à la main dans l'URL, 2 résultats.

### Étape 4 : Formulaire de recherche

- Dans `SearchForm.tsx`, utilisez `<Form action="/exercices/10-streaming-recherche">` de `next/form`,
  avec un champ `q`, une liste `genre` et un bouton « Rechercher ».

**Ce que vous devez voir :** chercher « tolkien » met à jour l'URL ; le bouton « Précédent » du navigateur
revient à la recherche d'avant ; l'URL copiée dans un autre onglet donne les mêmes résultats.

### Étape 5 : Page d'erreur

> Pendant la formation, cette étape est montrée en démo par le formateur. Refaites-la seul quand vous voulez.

- Lisez aussi `fail` dans `searchParams` et passez `fail={fail === '1'}` à `<BookResults>`.
- Créez `error.tsx` : `'use client'`, props `error` et `retry`, un bouton « Réessayer ».

**Ce que vous devez voir :** `?fail=1` affiche votre message d'erreur ; l'en-tête du site reste affiché.

## Perdu ? Repartez d'une étape

```bash
npm run reprendre -- 10 3   # votre exercice devient « fin de l'étape 3 »
```

Votre version actuelle est sauvegardée dans `.sauvegardes/`. Rechargez la page (F5) ensuite.

## Vérifier

Comparez à l'œil avec la solution : `?q=tolkien` donne 2 résultats, `?genre=Policier` aussi.

## Indices

<details>
<summary>Le formulaire</summary>

```tsx
import Form from 'next/form'

<Form action="/exercices/10-streaming-recherche" className="inline">
  <input name="q" type="search" defaultValue={defaultQuery} />
  <select name="genre" defaultValue={defaultGenre}>
    <option value="">Tous les genres</option>
    {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
  </select>
  <button className="btn">Rechercher</button>
</Form>
```
</details>

<details>
<summary>error.tsx minimal</summary>

```tsx
'use client'

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <div className="alert error">
      <h2>Oups, la recherche a échoué</h2>
      <button className="btn" onClick={() => retry()}>Réessayer</button>
    </div>
  )
}
```
</details>

## Bon à savoir

- En production (`npm run build && npm start`), le message d'une erreur serveur
  est masqué : seul `error.digest` arrive au navigateur, pour ne pas exposer de détails sensibles.
- La page d'erreur disparaît quand le **chemin** de l'URL change. Un `<Link>` vers la
  même page sans `?fail=1` ne suffit pas : utilisez `retry()`, ou un `<a>` qui recharge la page.
