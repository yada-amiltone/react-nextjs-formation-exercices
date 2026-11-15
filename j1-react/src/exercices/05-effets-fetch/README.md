# Exercice 05 · Effets et chargement de données

> Slides : **Jour 1, Module 4 · Effets et hooks personnalisés** · Durée : 30 min · 4 étapes + 1 pour aller plus loin

## Objectif

Charger le catalogue depuis une API simulée (800 ms de latence) avec useEffect, afficher le chargement et l'erreur, puis ranger cette logique dans un hook useBooks().

## Notions

- `useEffect(fonction, dépendances)` : synchroniser le composant avec l'extérieur
- Tableau de dépendances `[]` : une seule fois, après le premier affichage
- Les trois états d'un chargement : en cours, erreur, données
- Nettoyage (`return () => ...`) contre les réponses arrivées trop tard
- Hook personnalisé : une fonction `useXxx` qui regroupe des hooks

## Comment travailler

- Fichier à modifier : `Exercice.tsx` (le seul). L'application (`npm run dev`) affiche votre travail sur http://localhost:5173/#/05/exercice.
- Le formateur code chaque étape en partage d'écran, vous faites la même chose chez vous. On passe à l'étape suivante quand tout le monde voit le résultat attendu.
- Les commentaires `// Étape N` dans le fichier rappellent quoi faire et où.

## Étapes

### Étape 1 · Déclarer les trois états

- Dans `BookCatalog`, remplacez `const books = []` par trois `useState` : `books`, `loading` (true), `error` (null)
- Si `loading` est vrai, retournez `<p>Chargement des livres…</p>`

**Ce que vous devez voir :** « Chargement des livres… » s'affiche… et reste affiché : rien ne charge encore les données.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 05 0`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
const [books, setBooks] =
  useState<Book[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] =
  useState<string | null>(null);

if (loading) {
  return <p>Chargement des livres…</p>;
}
```
</details>

### Étape 2 · Charger avec useEffect

- Ajoutez un `useEffect(() => { ... }, [])` juste après les états
- Dedans : `fetchBooks().then(setBooks).finally(() => setLoading(false))`

**Ce que vous devez voir :** « Chargement… » pendant environ une seconde, puis les 12 livres s'affichent.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 05 1`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
useEffect(() => {
  fetchBooks()
    .then((data) => setBooks(data))
    .finally(() => setLoading(false));
}, []); // [] : une seule fois
```
</details>

### Étape 3 · Erreur et nettoyage

- Ajoutez `.catch(...)` qui range le message dans `error`, et affichez-le avec `role="alert"`
- Ajoutez le drapeau `ignore` et la fonction de nettoyage `return () => { ignore = true; }`
- Testez avec `?fail=1` dans l'URL

**Ce que vous devez voir :** Avec ?fail=1 : « Erreur : Le serveur de la bibliothèque ne répond pas ». Sans : les 12 livres.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 05 2`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
useEffect(() => {
  let ignore = false;
  fetchBooks()
    .then((d) => {
      if (!ignore) setBooks(d);
    })
    .catch((err) => {
      if (!ignore) setError(err.message);
    })
    .finally(() => {
      if (!ignore) setLoading(false);
    });
  return () => { ignore = true; };
}, []);

if (error) {
  return <p role="alert">Erreur : {error}</p>;
}
```
</details>

### Étape 4 · Extraire le hook useBooks

- Créez `function useBooks()` au-dessus de `BookCatalog`
- Déplacez-y les 3 états et l'effet, terminez par `return { books, loading, error }`
- Dans `BookCatalog` : `const { books, loading, error } = useBooks();`

**Ce que vous devez voir :** Rien ne change à l'écran (chargement, puis 12 livres) : c'est le but, le code est juste mieux rangé.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 05 3`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
export function useBooks() {
  const [books, setBooks] =
    useState<Book[]>([]);
  // ... les 2 autres états
  useEffect(() => { /* ... */ }, []);
  return { books, loading, error };
}

export function BookCatalog() {
  const { books, loading, error } =
    useBooks();
  ...
```
</details>

### Étape 5 · Pour aller plus loin : le titre de l'onglet

> Hors séance : cette étape n'est pas faite pendant la formation. Faites-la seul si vous le souhaitez.

- Dans `BookCatalog`, ajoutez un second `useEffect` qui écrit `document.title`
- Choisissez la bonne dépendance : `[books.length]`

**Ce que vous devez voir :** L'onglet du navigateur affiche « 0 livres · Bibliothèque » puis « 12 livres · Bibliothèque ».

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 05 4`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
useEffect(() => {
  document.title =
    `${books.length} livres · Bibliothèque`;
}, [books.length]); // relancé si ça change
```
</details>

## Vérifier

À l'œil : comparez votre écran avec la vue **Solution** (bouton en haut à droite de l'application, ou http://localhost:5173/#/05/solution). Le code de la solution est dans `src/solutions/05-effets-fetch/Solution.tsx`.

## Rattraper

| Commande | Effet |
|---|---|
| `npm run reprendre -- 05` | liste les étapes de l'exercice |
| `npm run reprendre -- 05 2` | remplace votre `Exercice.tsx` par l'état « fin de l'étape 2 » |
| `npm run reprendre -- 05 0` | revient au point de départ |
| `npm run reprendre -- 05 5` | exercice terminé (identique à la solution) |

Votre version est d'abord sauvegardée dans `.sauvegardes/` : rien n'est perdu.
