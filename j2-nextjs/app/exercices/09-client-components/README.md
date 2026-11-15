# Exercice 09 : Client Components

**Module 7** · environ 30 min · 3 étapes + 1 bonus
Votre version : <http://localhost:3000/exercices/09-client-components>
Solution : <http://localhost:3000/solutions/09-client-components>
(bonus : <http://localhost:3000/solutions/09-client-components/bonus>)

## Objectif

Ajouter un bouton « favori » **interactif** sur chaque carte d'une page
rendue côté serveur, sans transformer toute la page en Client Component.

## Notions

- `'use client'` marque une **frontière** : le fichier et tout ce qu'il
  importe sont aussi envoyés au navigateur.
- Hooks (`useState`...) et événements (`onClick`...) ⇒ Client Component obligatoire.
- Un Server Component peut afficher un Client Component et lui passer des
  props **sérialisables** (chaînes, nombres, booléens, objets simples), jamais de fonctions.
- Placez `'use client'` le plus bas possible dans l'arbre (sur les « feuilles »).

## Fichiers

```
app/exercices/09-client-components/
├── page.tsx                       ← Server Component fourni (étapes 1 et 3)
├── loading.tsx                    ← fourni
└── _components/FavoriteButton.tsx ← étapes 2 et 3
```

## Étapes

### Étape 1 : Placer le bouton

- Dans `page.tsx`, importez `FavoriteButton` et placez-le **à l'intérieur** de la carte :
  `<BookCard book={book}><FavoriteButton title={book.title} /></BookCard>`.

**Ce que vous devez voir :** un bouton « ☆ Ajouter aux favoris » sur chaque carte. Il ne fait encore rien.

### Étape 2 : Bouton interactif

- Dans `FavoriteButton.tsx`, ajoutez un état `isFavorite` avec `useState(false)`
  et inversez-le au clic.
- Essayez d'abord **sans** `'use client'` : lisez l'erreur affichée par Next.js,
  puis ajoutez la directive en première ligne.

**Ce que vous devez voir :** un clic affiche « ★ Favori », un second clic revient à « ☆ Ajouter aux favoris ».

### Étape 3 : Du serveur au client

- Ajoutez au bouton une prop `initialFavorite?: boolean`, utilisée comme valeur initiale de `useState`.
- Dans la page, passez `initialFavorite={book.id === 'dune'}`.
- Expérience : passez aussi `onToggle={() => {}}` depuis la page (TypeScript souligne la prop inconnue : ignorez-le le temps de l'essai). Lisez l'erreur dans le navigateur, puis retirez la prop.

**Ce que vous devez voir :** au chargement, Dune est déjà « ★ Favori ». Avec `onToggle`, Next.js affiche une erreur : une fonction ne traverse pas la frontière serveur → client.

### Étape 4 (bonus) : Compteur partagé

- Créez un dossier `bonus/` avec un `FavoritesProvider` (Context, Client Component)
  placé dans `bonus/layout.tsx`, un `FavoritesCounter` et un bouton qui utilise le contexte.
- Le layout et la page restent des Server Components.

**Ce que vous devez voir :** sur `/exercices/09-client-components/bonus`, le compteur augmente à chaque favori ajouté.

## Perdu ? Repartez d'une étape

```bash
npm run reprendre -- 09 2   # votre exercice devient « fin de l'étape 2 »
```

Votre version actuelle est sauvegardée dans `.sauvegardes/`. Rechargez la page (F5) ensuite.

## Vérifier

Comparez à l'œil avec la solution. `page.tsx` ne contient pas `'use client'` et reste `async`.

## Indices

<details>
<summary>Le bouton complet</summary>

```tsx
'use client'

import { useState } from 'react'

export function FavoriteButton({ title }: { title: string }) {
  const [isFavorite, setIsFavorite] = useState(false)
  return (
    <button
      type="button"
      className="btn favorite"
      aria-pressed={isFavorite}
      onClick={() => setIsFavorite((value) => !value)}
    >
      {isFavorite ? '★ Favori' : '☆ Ajouter aux favoris'}
    </button>
  )
}
```
</details>

<details>
<summary>Bonus : un Provider client dans un layout serveur</summary>

Un Client Component peut recevoir des Server Components en `children` :
`<FavoritesProvider>{children}</FavoritesProvider>` dans `layout.tsx`.
Voir `app/solutions/09-client-components/bonus/`.
</details>

## Bon à savoir

Les favoris sont perdus au rechargement : ils ne vivent que dans la mémoire
du navigateur. Pour les enregistrer, il faudrait une Server Action (exercice 11).
