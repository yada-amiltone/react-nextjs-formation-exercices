import type { ReactNode } from 'react';
import { BOOKS } from '../../data/books';
import type { Book } from '../../types';

// Les props sont l'« API » du composant : on les type comme les paramètres d'une fonction.
type BookCardProps = { book: Book };

// Étape 3 : rendu conditionnel
//   Si le livre n'est pas disponible (book.available === false), afficher sous le genre :
//   <span className="badge badge-warning">Indisponible</span>
export function BookCard({ book }: BookCardProps) {
  return (
    <article className="book-card">
      <div className="cover" style={{ background: book.coverColor }} />
      <h3>{book.title}</h3>
      <p>
        {book.author} · {book.year}
      </p>
      <span className="badge">{book.genre}</span>
    </article>
  );
}

// Étape 3 : liste vide
//   Si books est vide, retourner <p className="empty">Aucun livre à afficher</p>.
export function BookList({ books }: { books: Book[] }) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        // La key aide React à suivre chaque élément entre deux rendus : un identifiant stable
        <li key={book.id}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
}

// Étape 4 : composer avec children
//   Retourner un <section> avec un <h2>{title}</h2> puis le contenu reçu (children).
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section>TODO : section « {title} »</section>;
}

export default function Exercice() {
  return (
    <>
      <BookList books={BOOKS} />
      {/* Étape 3 : ajouter une deuxième liste, vide : <BookList books={[]} /> */}
    </>
  );
}
