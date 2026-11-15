import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Stars } from '@/components/ui/Stars'
import { ReviewForm } from '../_components/ReviewForm'
import { getBookWithReviews } from '../_lib/data'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const book = await getBookWithReviews(id)
  return { title: book ? `Avis : ${book.title}` : 'Livre introuvable' }
}

export default async function LivreAvisPage({ params }: Props) {
  const { id } = await params
  const book = await getBookWithReviews(id)

  if (!book) {
    notFound()
  }

  return (
    <article>
      <p>
        <Link href="/solutions/11-server-actions">← Tous les livres</Link>
      </p>
      <h1>{book.title}</h1>
      <p className="muted">
        {book.author} · {book.year}
      </p>

      <h2>Publier un avis</h2>
      <ReviewForm bookId={book.id} />

      <h2>Avis des lecteurs ({book.reviews.length})</h2>
      {book.reviews.length === 0 ? (
        <p className="muted">Soyez le premier à donner votre avis.</p>
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
