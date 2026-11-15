# Exercice 03 · État et événements

> Slides : **Jour 1, Module 3 · État et événements** · Durée : 30 min · 4 étapes

## Objectif

Rendre les cartes interactives avec useState (j'aime, favori, résumé), puis gérer une liste d'étiquettes sans jamais modifier le tableau en place.

## Notions

- `const [valeur, setValeur] = useState(valeurInitiale)`
- Gestionnaire d'événement : `onClick={() => ...}`
- Mise à jour à partir de la valeur précédente : `setLikes((n) => n + 1)`
- Chaque carte a son propre état
- Immuabilité : `[...prev, item]` et `prev.filter(...)`, jamais `push`

## Comment travailler

- Fichier à modifier : `Exercice.tsx` (le seul). L'application (`npm run dev`) affiche votre travail sur http://localhost:5173/#/03/exercice.
- Le formateur code chaque étape en partage d'écran, vous faites la même chose chez vous. On passe à l'étape suivante quand tout le monde voit le résultat attendu.
- Les commentaires `// Étape N` dans le fichier rappellent quoi faire et où.

## Étapes

### Étape 1 · Compter les « J'aime »

- Déclarez `const [likes, setLikes] = useState(0)` dans `BookCard`
- Affichez `{likes}` dans le bouton et ajoutez `onClick={() => setLikes((n) => n + 1)}`

**Ce que vous devez voir :** Chaque clic incrémente le compteur de SA carte ; les deux autres cartes ne bougent pas.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 03 0`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
const [likes, setLikes] = useState(0);

<button
  type="button"
  onClick={() => setLikes((n) => n + 1)}
>
  👍 J'aime ({likes})
</button>
```
</details>

### Étape 2 · Basculer en favori

- Déclarez un état `isFavorite` (false au départ)
- Le texte du bouton dépend de l'état ; au clic : `setIsFavorite((fav) => !fav)`
- Ajoutez `aria-pressed={isFavorite}` sur le bouton

**Ce que vous devez voir :** Le bouton passe à « Retirer des favoris » et se colore en bleu ; un 2e clic revient en arrière.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 03 1`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
const [isFavorite, setIsFavorite] =
  useState(false);

<button
  type="button"
  aria-pressed={isFavorite}
  onClick={() => setIsFavorite((f) => !f)}
>
  {isFavorite ? 'Retirer des favoris'
              : 'Ajouter aux favoris'}
</button>
```
</details>

### Étape 3 · Replier le résumé

- Déclarez un état `showSummary` (false au départ)
- Affichez `{showSummary && <p>{book.summary}</p>}` sous l'auteur
- Le bouton inverse l'état et change de libellé

**Ce que vous devez voir :** « Voir le résumé » déplie le résumé du livre, « Masquer le résumé » le replie.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 03 2`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
const [showSummary, setShowSummary] =
  useState(false);

{showSummary && <p>{book.summary}</p>}

<button
  type="button"
  onClick={() => setShowSummary((v) => !v)}
>
  {showSummary ? 'Masquer le résumé'
               : 'Voir le résumé'}
</button>
```
</details>

### Étape 4 · Gérer les étiquettes

- Écrivez `addTag` : ignore le texte vide, ajoute avec `[...prev, nouveau]`, vide le champ
- Écrivez `removeTag(id)` avec `prev.filter(...)`
- Branchez-les sur les boutons « Ajouter » et « Supprimer »

**Ce que vous devez voir :** On ajoute « À lire », « Prêté à Paul »… ; chaque « Supprimer » retire la bonne étiquette.

Perdu ? Repartez de la fin de l'étape précédente : `npm run reprendre -- 03 3`

<details>
<summary>L'essentiel du code de l'étape</summary>

```tsx
function addTag() {
  const label = text.trim();
  if (!label) return;
  setTags((prev) => [
    ...prev,
    { id: Date.now(), label },
  ]);
  setText('');
}

function removeTag(id: number) {
  setTags((prev) =>
    prev.filter((t) => t.id !== id));
}
```
</details>

## Vérifier

À l'œil : comparez votre écran avec la vue **Solution** (bouton en haut à droite de l'application, ou http://localhost:5173/#/03/solution). Le code de la solution est dans `src/solutions/03-state-evenements/Solution.tsx`.

## Rattraper

| Commande | Effet |
|---|---|
| `npm run reprendre -- 03` | liste les étapes de l'exercice |
| `npm run reprendre -- 03 2` | remplace votre `Exercice.tsx` par l'état « fin de l'étape 2 » |
| `npm run reprendre -- 03 0` | revient au point de départ |
| `npm run reprendre -- 03 4` | exercice terminé (identique à la solution) |

Votre version est d'abord sauvegardée dans `.sauvegardes/` : rien n'est perdu.
