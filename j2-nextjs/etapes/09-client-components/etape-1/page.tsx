import type { Metadata } from 'next'
import { BookCard } from '@/components/ui/BookCard'
import { getBooks } from '@/lib/db'
import { FavoriteButton } from './_components/FavoriteButton'

export const metadata: Metadata = {
  title: 'Favoris',
}

// Server Component : lit les données, n'envoie aucun JavaScript pour la liste.
export default async function LivresPage() {
  const books = await getBooks()

  return (
    <>
      <h1>Nos livres</h1>
      <ul className="grid">
        {books.map((book) => (
          <li key={book.id}>
            {/* BookCard affiche ses `children` dans la zone d'actions de la carte. */}
            <BookCard book={book}>
              <FavoriteButton title={book.title} />
            </BookCard>
          </li>
        ))}
      </ul>
    </>
  )
}
