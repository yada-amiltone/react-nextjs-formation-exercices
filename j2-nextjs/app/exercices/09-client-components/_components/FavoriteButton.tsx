// TODO (étape 2) : rendre ce bouton interactif.
//   1. Ajouter un état `isFavorite` avec useState (valeur initiale : false).
//   2. Au clic, inverser l'état.
//   3. Afficher « ★ Favori » ou « ☆ Ajouter aux favoris » selon l'état,
//      et aria-pressed={isFavorite}.
//   Que se passe-t-il si vous utilisez useState sans la directive 'use client'
//   en haut du fichier ? Essayez, lisez l'erreur, puis corrigez.

type FavoriteButtonProps = {
  title: string
}

export function FavoriteButton({ title }: FavoriteButtonProps) {
  return (
    <button type="button" className="btn favorite" aria-label={`Ajouter « ${title} » aux favoris`}>
      ☆ Ajouter aux favoris
    </button>
  )
}
