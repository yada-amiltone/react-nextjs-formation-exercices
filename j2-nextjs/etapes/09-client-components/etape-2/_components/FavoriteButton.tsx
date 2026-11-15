'use client' // Ce composant a de l'état et un gestionnaire d'événement : il s'exécute aussi dans le navigateur.

import { useState } from 'react'

// TODO (étape 3) : ajouter une prop `initialFavorite` (booléen) envoyée par la page serveur.

type FavoriteButtonProps = {
  title: string
}

export function FavoriteButton({ title }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)

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
