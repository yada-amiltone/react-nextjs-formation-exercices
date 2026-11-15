import { BookCard } from '@/components/ui/BookCard'
import { getBooks } from '@/lib/db'

type BookResultsProps = {
  query: string
  genre: string
  fail?: boolean
}

// Server Component asynchrone : environ 0,8 s de latence simulée.
export async function BookResults({ query, genre, fail = false }: BookResultsProps) {
  const books = await getBooks({ query, genre, fail })

  if (books.length === 0) {
    return <p className="alert">Aucun livre ne correspond à votre recherche.</p>
  }

  return (
    <>
      <p className="muted">{books.length} résultat(s)</p>
      <ul className="grid">
        {books.map((book) => (
          <li key={book.id}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </>
  )
}
