import Link from 'next/link'
import type { Book } from '@/lib/books'

type BookCardProps = {
  book: Pick<Book, 'id' | 'title' | 'author' | 'year' | 'genre' | 'available'>
  /** Lien vers la page détail (optionnel). */
  href?: string
  /** Zone d'actions en bas de la carte (ex. bouton favori). */
  children?: React.ReactNode
}

/** Carte d'un livre. Composant de présentation, utilisable côté serveur ou client. */
export function BookCard({ book, href, children }: BookCardProps) {
  return (
    <article className="card">
      <h3>{href ? <Link href={href}>{book.title}</Link> : book.title}</h3>
      <p className="meta">
        {book.author} · {book.year}
      </p>
      <span className="badge">{book.genre}</span>{' '}
      {!book.available && <span className="badge unavailable">Emprunté</span>}
      {children && <div className="actions">{children}</div>}
    </article>
  )
}
