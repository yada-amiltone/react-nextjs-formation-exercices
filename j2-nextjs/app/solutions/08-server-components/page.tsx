import type { Metadata } from 'next'
import { BookCard } from '@/components/ui/BookCard'
import { getBooks } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Livres',
}

// Un Server Component peut être `async` : il attend ses données directement,
// sans useEffect ni useState. Ce code ne part jamais dans le navigateur.
export default async function LivresPage() {
  const books = await getBooks()

  return (
    <>
      <h1>Nos livres</h1>
      <p className="muted">{books.length} livres au catalogue.</p>
      <ul className="grid">
        {books.map((book) => (
          <li key={book.id}>
            <BookCard book={book} href={`/solutions/08-server-components/${book.id}`} />
          </li>
        ))}
      </ul>
    </>
  )
}
