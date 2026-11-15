'use client'

import { createContext, use, useState } from 'react'

type FavoritesContextValue = {
  favorites: string[]
  isFavorite: (bookId: string) => boolean
  toggle: (bookId: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

// Un Provider est forcément un Client Component (il a de l'état).
// Il peut pourtant recevoir des Server Components en `children` : ils sont
// rendus sur le serveur puis passés tels quels.
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])

  const value: FavoritesContextValue = {
    favorites,
    isFavorite: (bookId) => favorites.includes(bookId),
    toggle: (bookId) =>
      setFavorites((current) =>
        current.includes(bookId)
          ? current.filter((id) => id !== bookId)
          : [...current, bookId],
      ),
  }

  return <FavoritesContext value={value}>{children}</FavoritesContext>
}

export function useFavorites() {
  const context = use(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites doit être utilisé dans <FavoritesProvider>')
  }
  return context
}
