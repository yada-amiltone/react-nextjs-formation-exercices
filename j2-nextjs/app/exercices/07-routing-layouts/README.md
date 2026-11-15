# Exercice 07 : routage et layouts

**Module 6** · environ 40 min · 4 étapes
Votre version : <http://localhost:3000/exercices/07-routing-layouts>
Solution : <http://localhost:3000/solutions/07-routing-layouts>

## Objectif

Construire la structure de la Bibliothèque : trois pages (Accueil, Livres,
À propos) et une barre de navigation partagée grâce à un **layout**, avec le
lien de la page courante mis en évidence.

## Notions

- Routage par fichiers : un dossier = un segment d'URL, `page.tsx` = la page.
- `layout.tsx` : une interface partagée qui entoure les pages enfants et reste
  affichée pendant la navigation.
- `<Link>` de `next/link` : navigation sans rechargement complet.
- `metadata` : titre de l'onglet, page par page.
- `usePathname()` : un hook, donc uniquement dans un Client Component (`'use client'`).

## Fichiers

```
app/exercices/07-routing-layouts/
├── page.tsx                ← page d'accueil (fournie)
├── layout.tsx              ← étapes 3 et 4
└── _components/NavLink.tsx ← étape 4
```

Le préfixe `_` rend un dossier **privé** : `_components` n'est pas une route.

## Étapes

Le formateur code chaque étape en partage d'écran. Vous faites la même chose
chez vous, puis on passe à la suivante.

### Étape 1 : Créer la page Livres

- Créez `livres/page.tsx` qui exporte **par défaut** un composant.
- Affichez un titre « Nos livres » et la liste des titres et auteurs
  (`import { BOOKS } from '@/lib/books'`).

**Ce que vous devez voir :** `/exercices/07-routing-layouts/livres` affiche la liste des 12 livres.

### Étape 2 : Page À propos et titres

- Créez `a-propos/page.tsx` avec un court texte de présentation.
- Ajoutez dans `livres/page.tsx` et `a-propos/page.tsx` : `export const metadata = { title: '…' }`.

**Ce que vous devez voir :** l'onglet du navigateur affiche « À propos | Formation Next.js ».

### Étape 3 : Navigation dans le layout

- Dans `layout.tsx`, remplacez le bloc TODO par une `<nav className="nav">`
  contenant trois `<Link>` : Accueil, Livres, À propos.

**Ce que vous devez voir :** la navigation est présente sur les trois pages ;
cliquer sur un lien change la page sans recharger tout le site (l'en-tête ne clignote pas).

### Étape 4 : Souligner le lien actif

- Complétez `_components/NavLink.tsx` : `'use client'` en première ligne,
  `usePathname()`, classe `active` si l'URL courante vaut `href`.
- Dans le layout, remplacez `Link` par `NavLink`.

**Ce que vous devez voir :** le lien de la page courante est surligné en bleu.

## Perdu ? Repartez d'une étape

```bash
npm run reprendre -- 07 2   # votre exercice devient « fin de l'étape 2 »
npm run reprendre -- 07 0   # retour au point de départ
```

Votre version actuelle est sauvegardée dans `.sauvegardes/` avant d'être remplacée.
Rechargez la page du navigateur (F5) après la commande.

## Vérifier

Comparez à l'œil votre page avec la solution, dans deux onglets côte à côte.

## Indices

<details>
<summary>À quoi ressemble une page ?</summary>

```tsx
export default function LivresPage() {
  return <h1>Nos livres</h1>
}
```

Le nom de la fonction est libre : c'est l'export par défaut qui compte.
</details>

<details>
<summary>Erreur « usePathname only works in Client Components »</summary>

Le fichier qui appelle un hook doit commencer par `'use client'`. Le layout,
lui, reste un Server Component : il importe simplement `NavLink`.
</details>

## Pour aller plus loin

- Ajoutez une page `livres/nouveautes/page.tsx` et faites en sorte que
  « Livres » reste actif sur ses sous-pages (`pathname.startsWith(href)`).
- Créez un **groupe de routes** `(marketing)/a-propos` : le dossier entre
  parenthèses n'apparaît pas dans l'URL.
