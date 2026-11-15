'use client'

import { useFavorites } from './FavoritesProvider'

export function FavoritesCounter() {
  const { favorites } = useFavorites()
  return (
    <p className="alert">
      ★ <strong>{favorites.length}</strong> livre(s) dans vos favoris
    </p>
  )
}
