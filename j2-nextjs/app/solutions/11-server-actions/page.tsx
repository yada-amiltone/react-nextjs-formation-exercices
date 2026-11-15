import type { Metadata } from 'next'
import { BookCard } from '@/components/ui/BookCard'
import { getBooks } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Avis des lecteurs',
}

export default async function LivresPage() {
  const books = await getBooks()

  return (
    <>
      <h1>Donnez votre avis</h1>
      <p className="muted">Choisissez un livre pour lire et publier des avis.</p>
      <ul className="grid">
        {books.map((book) => (
          <li key={book.id}>
            <BookCard book={book} href={`/solutions/11-server-actions/${book.id}`} />
          </li>
        ))}
      </ul>
    </>
  )
}
