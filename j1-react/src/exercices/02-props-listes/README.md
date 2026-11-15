# Exercice 02 · Props, listes et conditions

> Slides : **Jour 1, Module 2 · Props, listes et conditions** · Durée : 40 min · 4 étapes

## Objectif

Rendre la carte réutilisable avec des props, afficher tout le catalogue, gérer les cas particuliers et composer avec children.

## Notions

- Les props : les paramètres d'un composant, typés comme ceux d'une fonction
- `array.map(...)` pour afficher une liste, avec une `key` unique par élément
- Rendu conditionnel : `{condition && <JSX />}` et retour anticipé
- `children` : le contenu placé entre la balise ouvrante et la balise fermante

## Comment travailler

- Fichier à modifier : `Exercice.tsx` (le seul). L'application (`npm run dev`) affiche votre travail sur http://localhost:5173/#/02/exercice.
- Le formateur code chaque étape en partage d'écran, vous faites la même chose chez vous. On passe à l'étape suivante quand tout le monde voit le résultat attendu.
- Les commentaires `// Étape N` dans le fichier rappellent quoi faire et où.

## Étapes

### Étape 1 · Passer le livre en props

- Déclarez `type BookCardProps = { book: Book }` et recevez `({ book }: BookCardProps)`
- Remplacez les valeurs en dur par `book.title`, `book.author`…
- Dans `Exercice`, passez `book={BOOKS[0]}` puis `book={BOOKS[1]}`

**Ce que vous devez voir :** Deux cartes différentes : « L'Étranger » (jaune) puis « Dune » (orange).

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 02 0`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
type BookCardProps = { book: Book };

export function BookCard(
  { book }: BookCardProps
) {
  return (
    <article className="book-card">
      <h3>{book.title}</h3>
      ...

<BookCard book={BOOKS[0]} />
```
</details>

### Étape 2 · Afficher la liste avec map

- Dans `BookList`, retournez un `<ul className="book-list">`
- `books.map(...)` produit un `<li key={book.id}>` par livre, avec sa `<BookCard>`
- Dans `Exercice`, remplacez les deux cartes par `<BookList books={BOOKS} />`

**Ce que vous devez voir :** Les 12 livres du catalogue s'affichent en grille, sans avertissement « key » dans la console.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 02 1`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
<ul className="book-list">
  {books.map((book) => (
    <li key={book.id}>
      <BookCard book={book} />
    </li>
  ))}
</ul>
```
</details>

### Étape 3 · Gérer les cas particuliers

- Dans `BookCard`, ajoutez `{!book.available && <span …>Indisponible</span>}`
- Dans `BookList`, si `books.length === 0`, retournez `<p className="empty">Aucun livre à afficher</p>`
- Dans `Exercice`, ajoutez `<BookList books={[]} />` sous la première liste

**Ce que vous devez voir :** « Indisponible » sur Dune, Astérix et Millénium ; « Aucun livre à afficher » sous la grille.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 02 2`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
{!book.available && (
  <span className="badge badge-warning">
    Indisponible
  </span>
)}

if (books.length === 0) {
  return <p className="empty">…</p>;
}
```
</details>

### Étape 4 · Composer avec children

- `Section` retourne un `<section>` avec `<h2>{title}</h2>` puis `{children}`
- Dans `Exercice`, entourez la grille de `<Section title="Catalogue">` et la liste vide de `<Section title="Nouveautés">`

**Ce que vous devez voir :** Deux titres de section, « Catalogue » au-dessus de la grille et « Nouveautés » au-dessus du message.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 02 3`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
export function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

<Section title="Catalogue">
  <BookList books={BOOKS} />
</Section>
```
</details>

## Vérifier

À l'œil : comparez votre écran avec la vue **Solution** (bouton en haut à droite de l'application, ou http://localhost:5173/#/02/solution). Le code de la solution est dans `src/solutions/02-props-listes/Solution.tsx`.

## Rattraper

| Commande | Effet |
|---|---|
| `npm run reprendre -- 02` | liste les étapes de l'exercice |
| `npm run reprendre -- 02 2` | remplace votre `Exercice.tsx` par l'état « fin de l'étape 2 » |
| `npm run reprendre -- 02 0` | revient au point de départ |
| `npm run reprendre -- 02 4` | exercice terminé (identique à la solution) |

Votre version est d'abord sauvegardée dans `.sauvegardes/` : rien n'est perdu.
