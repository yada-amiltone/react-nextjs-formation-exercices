# Exercice 08 : Server Components et données

**Module 7** · environ 35 min · 4 étapes
Votre version : <http://localhost:3000/exercices/08-server-components>
Solution : <http://localhost:3000/solutions/08-server-components>

## Objectif

Afficher la liste des livres et une page détail par livre, en lisant les
données **directement sur le serveur**, sans `useEffect` ni API intermédiaire.

## Notions

- Un composant est un **Server Component** par défaut : il peut être `async`
  et attendre ses données avec `await`. Son code n'est jamais envoyé au navigateur.
- Route dynamique : le dossier `[id]` capture un segment d'URL.
- `params` est une **Promise** : `const { id } = await params`.
- `notFound()` interrompt le rendu et affiche `not-found.tsx`.
- `generateMetadata` : métadonnées calculées à partir des données.

## Fichiers

```
app/exercices/08-server-components/
├── page.tsx           ← étape 1
├── loading.tsx        ← fourni (squelette affiché pendant le chargement)
└── [id]/
    └── page.tsx       ← étapes 2 à 4 (+ not-found.tsx à créer à l'étape 3)
```

Données : `lib/db.ts` → `getBooks()` (≈ 0,8 s) et `getBook(id)` (≈ 0,6 s).

## Étapes

### Étape 1 : Lister les livres

- Dans `page.tsx`, rendez le composant `async` et appelez `await getBooks()`.
- Affichez un `<BookCard>` par livre, avec
  `href={`/exercices/08-server-components/${book.id}`}`.

**Ce que vous devez voir :** un squelette pendant ~1 s, puis les 12 cartes de livres.

### Étape 2 : Afficher un livre

- Dans `[id]/page.tsx`, rendez le composant `async`, récupérez `id` avec `await params`.
- Chargez le livre avec `await getBook(id)` et affichez titre, auteur, année, résumé et avis.

**Ce que vous devez voir :** cliquer sur « Dune » ouvre sa page avec son résumé et ses avis.

### Étape 3 : Livre introuvable

- Si `getBook` renvoie `undefined`, appelez `notFound()`.
- Créez `[id]/not-found.tsx` : message « Livre introuvable » et lien de retour.

**Ce que vous devez voir :** `/exercices/08-server-components/nimporte-quoi` affiche votre page « Livre introuvable ».

### Étape 4 : Titre de l'onglet

- Exportez `generateMetadata` dans `[id]/page.tsx` : il renvoie `{ title: book.title }`.

**Ce que vous devez voir :** l'onglet affiche « Dune | Formation Next.js » sur la page de Dune.

## Perdu ? Repartez d'une étape

```bash
npm run reprendre -- 08 1   # votre exercice devient « fin de l'étape 1 »
```

Votre version actuelle est sauvegardée dans `.sauvegardes/`. Rechargez la page (F5) ensuite.

## Vérifier

Comparez à l'œil avec la solution. Bonus : dans les DevTools (onglet Sources),
le code de `lib/db.ts` est absent, il ne tourne que sur le serveur.

## Indices

<details>
<summary>Lire le paramètre de l'URL</summary>

```tsx
export default async function LivrePage({ params }: Props) {
  const { id } = await params
  const book = await getBook(id)
  if (!book) notFound()
  // à partir d'ici, TypeScript sait que book est défini
}
```
</details>

<details>
<summary>generateMetadata</summary>

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const book = await getBook(id)
  return { title: book?.title ?? 'Livre introuvable' }
}
```
</details>

## Bon à savoir

Quand la page est affichée en streaming (ici grâce à `loading.tsx`), `notFound()`
renvoie la page « introuvable » avec un statut HTTP 200 et une balise `noindex` :
c'est le comportement normal de Next.js.
