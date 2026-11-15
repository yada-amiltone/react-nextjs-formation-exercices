'use client' // Ce composant a de l'état et un gestionnaire d'événement : il s'exécute aussi dans le navigateur.

import { useState } from 'react'

type FavoriteButtonProps = {
  // Props reçues d'un Server Component : elles doivent être sérialisables
  // (chaînes, nombres, booléens, objets simples...). Pas de fonctions.
  title: string
  initialFavorite?: boolean
}

export function FavoriteButton({ title, initialFavorite = false }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)

  return (
    <button
      type="button"
      className="btn favorite"
      aria-pressed={isFavorite}
      aria-label={`${isFavorite ? 'Retirer' : 'Ajouter'} « ${title} » des favoris`}
      onClick={() => setIsFavorite((value) => !value)}
    >
      {isFavorite ? '★ Favori' : '☆ Ajouter aux favoris'}
    </button>
  )
}
