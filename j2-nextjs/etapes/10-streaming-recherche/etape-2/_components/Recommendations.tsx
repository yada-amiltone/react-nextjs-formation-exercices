import { BookCard } from '@/components/ui/BookCard'
import { getRecommendations } from '@/lib/db'

// Section volontairement lente (2,5 s) : sans <Suspense>, elle bloquerait
// toute la page.
export async function Recommendations() {
  const books = await getRecommendations()

  return (
    <ul className="grid">
      {books.map((book) => (
        <li key={book.id}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  )
}
