import type { Metadata } from 'next'
import { BookCard } from '@/components/ui/BookCard'
import { getBooks } from '@/lib/db'
import { SharedFavoriteButton } from './_components/SharedFavoriteButton'

export const metadata: Metadata = {
  title: 'Favoris partagés',
}

export default async function BonusPage() {
  const books = await getBooks()

  return (
    <>
      <h1>Favoris partagés (bonus)</h1>
      <ul className="grid">
        {books.map((book) => (
          <li key={book.id}>
            <BookCard book={book}>
              <SharedFavoriteButton bookId={book.id} title={book.title} />
            </BookCard>
          </li>
        ))}
      </ul>
    </>
  )
}
