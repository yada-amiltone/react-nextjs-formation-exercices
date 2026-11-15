import { FavoritesCounter } from './_components/FavoritesCounter'
import { FavoritesProvider } from './_components/FavoritesProvider'

// Layout serveur qui place un Provider client autour des pages.
export default function BonusLayout({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <FavoritesCounter />
      {children}
    </FavoritesProvider>
  )
}
