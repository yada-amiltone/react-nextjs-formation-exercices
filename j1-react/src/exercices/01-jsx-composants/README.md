# Exercice 01 · JSX et composants

> Slides : **Jour 1, Module 1 · Penser en composants** · Durée : 30 min · 4 étapes

## Objectif

Écrire vos premiers composants React : l'en-tête de l'application et la carte d'un livre.

## Notions

- Un composant = une fonction dont le nom commence par une majuscule et qui retourne du JSX
- Une expression JavaScript s'insère dans le JSX entre accolades : `{...}`
- `className` au lieu de `class`, `style` qui attend un objet
- Un seul élément racine par composant : le fragment `<>...</>`

## Comment travailler

- Fichier à modifier : `Exercice.tsx` (le seul). L'application (`npm run dev`) affiche votre travail sur http://localhost:5173/#/01/exercice.
- Le formateur code chaque étape en partage d'écran, vous faites la même chose chez vous. On passe à l'étape suivante quand tout le monde voit le résultat attendu.
- Les commentaires `// Étape N` dans le fichier rappellent quoi faire et où.

## Étapes

### Étape 1 · Écrire l'en-tête

- Dans `Header`, retournez un `<header>` qui contient un `<h1>Ma Bibliothèque</h1>`
- Enregistrez : la page se met à jour toute seule

**Ce que vous devez voir :** Le titre « Ma Bibliothèque » s'affiche à la place de « TODO : en-tête ».

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 01 0`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
export function Header() {
  return (
    <header>
      <h1>Ma Bibliothèque</h1>
    </header>
  );
}
```
</details>

### Étape 2 · Insérer une expression JS

- Sous le `<h1>`, ajoutez un `<p>` « livres au catalogue »
- Le nombre vient de `{BOOKS.length}` : les accolades insèrent du JavaScript

**Ce que vous devez voir :** « 12 livres au catalogue » s'affiche sous le titre.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 01 1`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
<header>
  <h1>Ma Bibliothèque</h1>
  <p>{BOOKS.length} livres au catalogue</p>
</header>
```
</details>

### Étape 3 · Créer la carte du livre

- Dans `BookCard`, retournez un `<article className="book-card">` avec titre, auteur, « Publié en … » et genre
- Dans `Exercice`, affichez `<Header />` puis `<BookCard />` dans un fragment `<>...</>`

**Ce que vous devez voir :** La carte de « L'Étranger » (Albert Camus, publié en 1942, Roman) apparaît sous l'en-tête.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 01 2`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
<article className="book-card">
  <h2>{book.title}</h2>
  <p>{book.author}</p>
  <p>Publié en {book.year}</p>
  <span className="badge">{book.genre}</span>
</article>
```
</details>

### Étape 4 · Colorer la couverture

- En haut de la carte, ajoutez `<div className="cover" />`
- Donnez-lui un fond : `style={{ background: book.coverColor }}`

**Ce que vous devez voir :** Un bandeau jaune (la couleur de « L'Étranger ») s'affiche en haut de la carte.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 01 3`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
<div
  className="cover"
  style={{ background: book.coverColor }}
/>
```
</details>

## Vérifier

À l'œil : comparez votre écran avec la vue **Solution** (bouton en haut à droite de l'application, ou http://localhost:5173/#/01/solution). Le code de la solution est dans `src/solutions/01-jsx-composants/Solution.tsx`.

## Rattraper

| Commande | Effet |
|---|---|
| `npm run reprendre -- 01` | liste les étapes de l'exercice |
| `npm run reprendre -- 01 2` | remplace votre `Exercice.tsx` par l'état « fin de l'étape 2 » |
| `npm run reprendre -- 01 0` | revient au point de départ |
| `npm run reprendre -- 01 4` | exercice terminé (identique à la solution) |

Votre version est d'abord sauvegardée dans `.sauvegardes/` : rien n'est perdu.
