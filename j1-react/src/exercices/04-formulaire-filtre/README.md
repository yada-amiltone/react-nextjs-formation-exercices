# Exercice 04 · Formulaire et filtre

> Slides : **Jour 1, Module 3 · État et événements** · Durée : 30 min · 4 étapes

## Objectif

Filtrer le catalogue avec un formulaire contrôlé : recherche par titre, genre, disponibilité, et un bouton pour tout réinitialiser.

## Notions

- Champ contrôlé : `value={etat}` + `onChange={(e) => setEtat(e.target.value)}`
- Case à cocher : `checked` et `e.target.checked`
- État dérivé : la liste filtrée se calcule pendant le rendu, elle ne se stocke pas

## Comment travailler

- Fichier à modifier : `Exercice.tsx` (le seul). L'application (`npm run dev`) affiche votre travail sur http://localhost:5173/#/04/exercice.
- Le formateur code chaque étape en partage d'écran, vous faites la même chose chez vous. On passe à l'étape suivante quand tout le monde voit le résultat attendu.
- Les commentaires `// Étape N` dans le fichier rappellent quoi faire et où.

## Étapes

### Étape 1 · Rechercher par titre

- Déclarez un état `query` et reliez l'input : `value` + `onChange`
- Calculez `filtered` avec `books.filter(...)` : le titre contient `query`, en minuscules
- Pas de second état « filteredBooks » ni de `useEffect`

**Ce que vous devez voir :** Taper « le » réduit la liste en direct (« 5 résultat(s) ») ; effacer le champ ramène les 12 livres.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 04 0`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
const [query, setQuery] = useState('');

const q = query.trim().toLowerCase();
const filtered = books.filter((book) =>
  book.title.toLowerCase().includes(q));

<input
  type="search"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
```
</details>

### Étape 2 · Filtrer par genre

- Déclarez un état `genre` typé `Genre | ''` ('' = tous les genres)
- Reliez le `<select>` avec `value` et `onChange`
- Ajoutez la condition dans le filtre : `genre === '' || book.genre === genre`

**Ce que vous devez voir :** Choisir « Fantasy » n'affiche plus que Le Seigneur des Anneaux et Le Hobbit ; la recherche se combine avec le genre.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 04 1`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
const [genre, setGenre] =
  useState<Genre | ''>('');

<select
  value={genre}
  onChange={(e) =>
    setGenre(e.target.value as Genre | '')}
>
```
</details>

### Étape 3 · Garder les disponibles

- Déclarez un état booléen `onlyAvailable`
- Case à cocher : `checked={onlyAvailable}` et `e.target.checked` dans `onChange`
- Ajoutez `(!onlyAvailable || book.available)` dans le filtre

**Ce que vous devez voir :** Cocher la case retire Dune, Astérix et Millénium : « 9 résultat(s) ».

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 04 2`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
const [onlyAvailable, setOnlyAvailable] =
  useState(false);

<input
  type="checkbox"
  checked={onlyAvailable}
  onChange={(e) =>
    setOnlyAvailable(e.target.checked)}
/>
```
</details>

### Étape 4 · Tout réinitialiser

- Écrivez une fonction `reset()` qui remet les 3 états à leur valeur de départ
- Branchez-la sur le bouton « Réinitialiser »

**Ce que vous devez voir :** Après une recherche filtrée, « Réinitialiser » vide le champ, remet « Tous », décoche la case : 12 résultats.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 04 3`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
function reset() {
  setQuery('');
  setGenre('');
  setOnlyAvailable(false);
}

<button type="button" onClick={reset}>
  Réinitialiser
</button>
```
</details>

## Vérifier

À l'œil : comparez votre écran avec la vue **Solution** (bouton en haut à droite de l'application, ou http://localhost:5173/#/04/solution). Le code de la solution est dans `src/solutions/04-formulaire-filtre/Solution.tsx`.

## Rattraper

| Commande | Effet |
|---|---|
| `npm run reprendre -- 04` | liste les étapes de l'exercice |
| `npm run reprendre -- 04 2` | remplace votre `Exercice.tsx` par l'état « fin de l'étape 2 » |
| `npm run reprendre -- 04 0` | revient au point de départ |
| `npm run reprendre -- 04 4` | exercice terminé (identique à la solution) |

Votre version est d'abord sauvegardée dans `.sauvegardes/` : rien n'est perdu.
