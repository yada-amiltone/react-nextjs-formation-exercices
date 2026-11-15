# Exercice 06 · Context : liste de lecture

> Slides : **Jour 1, Module 5 · Partager l'état avec le Context** · Durée : 30 min · 4 étapes

## Objectif

Partager une liste de lecture entre l'en-tête, la liste des livres et le panneau « Ma liste », sans faire descendre des props à travers tous les composants.

## Notions

- `createContext` : créer un « canal » de données
- Le Provider : `<MonContexte value={...}>` fournit la valeur à tous les descendants
- `useContext(MonContexte)` : lire la valeur depuis n'importe quel descendant
- Un hook d'accès (`useReadingList`) avec une erreur claire hors du Provider

## Comment travailler

- Fichier à modifier : `Exercice.tsx` (le seul). L'application (`npm run dev`) affiche votre travail sur http://localhost:5173/#/06/exercice.
- Le formateur code chaque étape en partage d'écran, vous faites la même chose chez vous. On passe à l'étape suivante quand tout le monde voit le résultat attendu.
- Les commentaires `// Étape N` dans le fichier rappellent quoi faire et où.

## Étapes

### Étape 1 · Brancher le contexte

- Créez `ReadingListContext` avec `createContext<ReadingListValue | null>(null)`
- Dans le Provider : l'état `ids`, les fonctions `add`, `remove`, `has`, et `<ReadingListContext value={...}>`
- Dans `useReadingList` : `return useContext(ReadingListContext)!`

**Ce que vous devez voir :** Cliquer « Ajouter à ma liste » transforme le bouton en « Retirer de ma liste » (et inversement).

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 06 0`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
export const ReadingListContext =
  createContext<ReadingListValue | null>(
    null);

// dans ReadingListProvider
const [ids, setIds] = useState<string[]>([]);
const add = (id: string) =>
  setIds((prev) => [...prev, id]);
const remove = (id: string) =>
  setIds((prev) =>
    prev.filter((x) => x !== id));
const has = (id: string) => ids.includes(id);
const value = { ids, add, remove, has };
return (
  <ReadingListContext value={value}>
    {children}
  </ReadingListContext>
);
```
</details>

### Étape 2 · Compteur dans l'en-tête

- Dans `Header`, récupérez `ids` avec `useReadingList()`
- Affichez `ids.length` à la place du 0

**Ce que vous devez voir :** Le compteur « Ma liste de lecture (N) » suit chaque ajout et chaque retrait, sans aucune prop.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 06 1`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
export function Header() {
  const { ids } = useReadingList();
  return (
    <header className="app-header">
      <h1>Bibliothèque</h1>
      <p>Ma liste de lecture ({ids.length})</p>
    </header>
  );
}
```
</details>

### Étape 3 · Remplir le panneau

- Dans `ReadingListPanel`, récupérez `ids`
- Liste vide : « Votre liste est vide » ; sinon un `<ol>` avec le titre de chaque livre

**Ce que vous devez voir :** Le panneau de droite liste les titres ajoutés, dans l'ordre d'ajout.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 06 2`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
const { ids } = useReadingList();

{ids.length === 0 ? (
  <p>Votre liste est vide</p>
) : (
  <ol>
    {ids.map((id) => (
      <li key={id}>
        {BOOKS.find((b) => b.id === id)?.title}
      </li>
    ))}
  </ol>
)}
```
</details>

### Étape 4 · Protéger le hook

- Dans `useReadingList`, si le contexte vaut `null`, levez une erreur explicite
- Testez : déplacez `<Header />` au-dessus du `<ReadingListProvider>`, regardez la console, puis remettez-le

**Ce que vous devez voir :** Header hors du Provider : page blanche et, dans la console, « useReadingList doit être utilisé dans un <ReadingListProvider> ».

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 06 3`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
export function useReadingList() {
  const value = useContext(ReadingListContext);
  if (value === null) {
    throw new Error(
      'useReadingList doit être utilisé ' +
      'dans un <ReadingListProvider>');
  }
  return value;
}
```
</details>

## Vérifier

À l'œil : comparez votre écran avec la vue **Solution** (bouton en haut à droite de l'application, ou http://localhost:5173/#/06/solution). Le code de la solution est dans `src/solutions/06-context-liste-lecture/Solution.tsx`.

## Rattraper

| Commande | Effet |
|---|---|
| `npm run reprendre -- 06` | liste les étapes de l'exercice |
| `npm run reprendre -- 06 2` | remplace votre `Exercice.tsx` par l'état « fin de l'étape 2 » |
| `npm run reprendre -- 06 0` | revient au point de départ |
| `npm run reprendre -- 06 4` | exercice terminé (identique à la solution) |

Votre version est d'abord sauvegardée dans `.sauvegardes/` : rien n'est perdu.
