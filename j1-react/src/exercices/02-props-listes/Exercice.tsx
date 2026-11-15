import type { ReactNode } from 'react';
import { BOOKS } from '../../data/books';
import type { Book } from '../../types';

// Étape 1 : rendre la carte réutilisable
//   Aujourd'hui la carte affiche toujours « Dune » en dur.
//   Déclarer type BookCardProps = { book: Book }, recevoir ({ book }: BookCardProps)
//   et remplacer les valeurs en dur par book.title, book.author, book.year, book.genre, book.coverColor.
// Étape 3 : rendu conditionnel
//   Si le livre n'est pas disponible (book.available === false), afficher sous le genre :
//   <span className="badge badge-warning">Indisponible</span>
export function BookCard() {
  return (
    <article className="book-card">
      <div className="cover" style={{ background: '#f4a261' }} />
      <h3>Dune</h3>
      <p>Frank Herbert · 1965</p>
      <span className="badge">Science-fiction</span>
    </article>
  );
}

// Étape 2 : afficher toute une liste
//   Retourner un <ul className="book-list"> avec un <li> par livre (books.map),
//   chaque <li> a une key unique (book.id) et contient une <BookCard book={book} />.
// Étape 3 : liste vide
//   Si books est vide, retourner <p className="empty">Aucun livre à afficher</p>.
export function BookList({ books }: { books: Book[] }) {
  return <p>TODO : afficher {books.length} livres</p>;
}

// Étape 4 : composer avec children
//   Retourner un <section> avec un <h2>{title}</h2> puis le contenu reçu (children).
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section>TODO : section « {title} »</section>;
}

export default function Exercice() {
  return (
    <>
      {/* Étape 1 : passer un livre différent à chaque carte : book={BOOKS[0]} et book={BOOKS[1]} */}
      <BookCard />
      <BookCard />
    </>
  );
}
