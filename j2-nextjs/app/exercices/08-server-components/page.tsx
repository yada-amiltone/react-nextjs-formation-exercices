import type { Metadata } from 'next'
// import { BookCard } from '@/components/ui/BookCard'
// import { getBooks } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Livres',
}

// TODO (étape 1) : afficher la liste des livres lue côté serveur.
//   1. Rendre le composant `async`.
//   2. Récupérer les livres avec `await getBooks()`.
//   3. Afficher le nombre de livres, puis une <ul className="grid"> avec un
//      <BookCard book={book} href={...} /> par livre.
//      Lien de chaque carte : `/exercices/08-server-components/${book.id}`.
//   Pas de useEffect, pas de useState : c'est un Server Component.
export default function LivresPage() {
  return (
    <>
      <h1>Nos livres</h1>
      <p className="todo">TODO : afficher les livres (voir page.tsx).</p>
    </>
  )
}
