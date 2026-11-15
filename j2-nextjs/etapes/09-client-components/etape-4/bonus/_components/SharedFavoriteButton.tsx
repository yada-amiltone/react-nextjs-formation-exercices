'use client'

import { useFavorites } from './FavoritesProvider'

export function SharedFavoriteButton({ bookId, title }: { bookId: string; title: string }) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(bookId)

  return (
    <button
      type="button"
      className="btn favorite"
      aria-pressed={active}
      aria-label={`${active ? 'Retirer' : 'Ajouter'} « ${title} » des favoris`}
      onClick={() => toggle(bookId)}
    >
      {active ? '★ Favori' : '☆ Ajouter aux favoris'}
    </button>
  )
}
