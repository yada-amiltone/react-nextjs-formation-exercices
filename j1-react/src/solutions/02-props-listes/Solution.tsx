import type { ReactNode } from 'react';
import { BOOKS } from '../../data/books';
import type { Book } from '../../types';

// Les props sont l'« API » du composant : on les type comme les paramètres d'une fonction.
type BookCardProps = { book: Book };

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="book-card">
      <div className="cover" style={{ background: book.coverColor }} />
      <h3>{book.title}</h3>
      <p>
        {book.author} · {book.year}
      </p>
      <span className="badge">{book.genre}</span>
      {/* Rendu conditionnel : si la condition est fausse, rien n'est affiché */}
      {!book.available && <span className="badge badge-warning">Indisponible</span>}
    </article>
  );
}

export function BookList({ books }: { books: Book[] }) {
  // Retour anticipé : un composant peut retourner un JSX différent selon les données
  if (books.length === 0) {
    return <p className="empty">Aucun livre à afficher</p>;
  }

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

// children = ce qui est écrit entre <Section> et </Section> par le parent
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function Solution() {
  return (
    <>
      <Section title="Catalogue">
        <BookList books={BOOKS} />
      </Section>
      <Section title="Nouveautés">
        <BookList books={[]} />
      </Section>
    </>
  );
}
