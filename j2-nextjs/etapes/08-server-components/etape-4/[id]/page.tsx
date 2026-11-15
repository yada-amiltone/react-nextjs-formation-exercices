import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Stars } from '@/components/ui/Stars'
import { getBook } from '@/lib/db'

// Le dossier [id] crée une route dynamique :
//   /exercices/08-server-components/dune  →  params = { id: 'dune' }
// `params` est une Promise : on l'attend avec `await`.
type Props = {
  params: Promise<{ id: string }>
}

// Métadonnées calculées à partir des données : l'onglet affiche le titre du livre.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const book = await getBook(id)
  return { title: book ? book.title : 'Livre introuvable' }
}

export default async function LivrePage({ params }: Props) {
  const { id } = await params
  const book = await getBook(id)

  if (!book) {
    notFound() // interrompt le rendu et affiche not-found.tsx
  }

  return (
    <article>
      <p>
        <Link href="/exercices/08-server-components">← Tous les livres</Link>
      </p>
      <h1>{book.title}</h1>
      <p className="muted">
        {book.author} · {book.year} · {book.pages} pages · {book.genre}
      </p>
      <p>{book.summary}</p>

      <h2>Avis ({book.reviews.length})</h2>
      {book.reviews.length === 0 ? (
        <p className="muted">Aucun avis pour l&apos;instant.</p>
      ) : (
        <ul className="reviews">
          {book.reviews.map((review) => (
            <li key={review.id} className="card">
              <Stars rating={review.rating} /> <strong>{review.author}</strong>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
