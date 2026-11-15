# Exercice 00 · JavaScript et TypeScript modernes

> Slides : **Jour 1, Module 0 · JavaScript et TypeScript modernes** · Durée : 20 min · 3 étapes

## Objectif

Écrire trois petites fonctions sur le catalogue : déstructuration, méthodes de tableau et copie sans mutation.

## Notions

- Déstructuration et template literals
- `filter`, `map` et `sort` enchaînés
- Spread `{ ...objet }` : copier au lieu de modifier

## Comment travailler

- Fichier à modifier : `logique.ts` (le seul). `Exercice.tsx` est fourni : il appelle vos fonctions et affiche, pour chaque étape, le résultat **obtenu** à côté du résultat **attendu** sur http://localhost:5173/#/00/exercice.
- Pas de JSX ici : uniquement du JavaScript et du TypeScript sur le tableau `BOOKS` (12 livres).
- Le formateur code chaque étape en partage d'écran, vous faites la même chose chez vous. On passe à l'étape suivante quand tout le monde voit « identique ».
- Les commentaires `// Étape N` dans le fichier rappellent quoi faire et où.

## Étapes

### Étape 1 · Décrire un livre

- Dans `describe`, extrayez `title`, `author` et `year` du livre (déstructuration)
- Renvoyez un template literal (entre backticks) qui assemble titre, auteur et année

**Ce que vous devez voir :** La ligne « describe(Dune) » affiche « Dune, Frank Herbert (1965) » et le badge « identique ».

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 00 0`

<details>
<summary>L'essentiel du code de l'étape</summary>

```ts
export function describe(book: Book): string {
  const { title, author, year } = book;
  return `${title}, ${author} (${year})`;
}
```
</details>

### Étape 2 · Les titres disponibles

- Dans `availableTitles`, gardez les livres disponibles avec `filter`
- Ne gardez que leur titre avec `map`, puis triez avec `sort((a, b) => a.localeCompare(b))`

**Ce que vous devez voir :** 9 titres, de « Blacksad » à « Sapiens » : les trois lignes de l'étape 2 sont « identique ».

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 00 1`

<details>
<summary>L'essentiel du code de l'étape</summary>

```ts
return books
  .filter((book) => book.available)
  .map((book) => book.title)
  .sort((a, b) => a.localeCompare(b));
```
</details>

### Étape 3 · Emprunter sans modifier

- Dans `borrow`, renvoyez `books.map(...)` : un nouveau tableau
- Pour le livre `id`, renvoyez une copie `{ ...book, available: false }` ; les autres tels quels

**Ce que vous devez voir :** Nouveau tableau : oui ; L'Étranger vaut false après, mais reste true dans BOOKS.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 00 2`

<details>
<summary>L'essentiel du code de l'étape</summary>

```ts
return books.map((book) =>
  book.id === id
    ? { ...book, available: false }
    : book,
);
```
</details>

## Vérifier

À l'œil : chaque ligne doit afficher le badge « identique ». Comparez aussi avec la vue **Solution** (bouton en haut à droite de l'application, ou http://localhost:5173/#/00/solution). Le code de la solution est dans `src/solutions/00-js-moderne/logique.ts`.

## Rattraper

| Commande | Effet |
|---|---|
| `npm run reprendre -- 00` | liste les étapes de l'exercice |
| `npm run reprendre -- 00 2` | remplace votre `logique.ts` par l'état « fin de l'étape 2 » |
| `npm run reprendre -- 00 0` | revient au point de départ |
| `npm run reprendre -- 00 3` | exercice terminé (identique à la solution) |

Votre version est d'abord sauvegardée dans `.sauvegardes/` : rien n'est perdu.
