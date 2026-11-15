import { BOOKS } from '@/lib/books'

// Fichier app/.../livres/page.tsx  →  URL .../livres
export default function LivresPage() {
  return (
    <>
      <h1>Nos livres</h1>
      <p className="muted">{BOOKS.length} livres au catalogue.</p>
      <ul>
        {BOOKS.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong>, {book.author} ({book.year})
          </li>
        ))}
      </ul>
    </>
  )
}
