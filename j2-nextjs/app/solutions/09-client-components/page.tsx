import type { Metadata } from 'next'
import Link from 'next/link'
import { BookCard } from '@/components/ui/BookCard'
import { getBooks } from '@/lib/db'
import { FavoriteButton } from './_components/FavoriteButton'

export const metadata: Metadata = {
  title: 'Favoris',
}

// Server Component : lit les données, n'envoie aucun JavaScript pour la liste.
// Seul FavoriteButton (Client Component) est hydraté dans le navigateur.
export default async function LivresPage() {
  const books = await getBooks()

  return (
    <>
      <h1>Nos livres</h1>
      <p className="muted">
        Cliquez sur ☆ pour ajouter un livre à vos favoris.{' '}
        <Link href="/solutions/09-client-components/bonus">
          Bonus : compteur de favoris partagé →
        </Link>
      </p>
      <ul className="grid">
        {books.map((book) => (
          <li key={book.id}>
            <BookCard book={book}>
              <FavoriteButton title={book.title} initialFavorite={book.id === 'dune'} />
            </BookCard>
          </li>
        ))}
      </ul>
    </>
  )
}
