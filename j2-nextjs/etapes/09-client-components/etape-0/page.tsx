import type { Metadata } from 'next'
import { BookCard } from '@/components/ui/BookCard'
import { getBooks } from '@/lib/db'
// import { FavoriteButton } from './_components/FavoriteButton'

export const metadata: Metadata = {
  title: 'Favoris',
}

// Cette page est un Server Component (fourni, c'est la solution de l'exercice 08).
export default async function LivresPage() {
  const books = await getBooks()

  return (
    <>
      <h1>Nos livres</h1>
      <ul className="grid">
        {books.map((book) => (
          <li key={book.id}>
            {/*
              TODO (étape 1) : placer <FavoriteButton title={book.title} />
              À L'INTÉRIEUR de <BookCard> (BookCard affiche ses `children`
              dans la zone d'actions de la carte).
            */}
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </>
  )
}
