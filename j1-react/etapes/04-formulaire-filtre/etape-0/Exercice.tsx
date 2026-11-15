import { useState } from 'react';
import { BOOKS, GENRES } from '../../data/books';
import type { Book, Genre } from '../../types';

type BookSearchProps = { books: Book[] };

export function BookSearch({ books }: BookSearchProps) {
  // Étape 1 : recherche par titre
  //   État query ('' au départ) relié à l'input : value={query} et onChange={(e) => setQuery(e.target.value)}.
  //   Puis calculer filtered avec books.filter(...) : le titre contient query (toLowerCase()).
  //   Pas d'état « filteredBooks » ni de useEffect : ce qui se calcule ne se stocke pas.
  // Étape 2 : filtre par genre
  //   État genre ('' = tous) relié au <select>, et une condition de plus dans le filtre.
  // Étape 3 : disponibles uniquement
  //   État booléen onlyAvailable relié à la case : checked={onlyAvailable} et e.target.checked.
  // Étape 4 : bouton « Réinitialiser » qui remet les 3 états à leur valeur initiale.
  const filtered = books;

  return (
    <div>
      <form className="filters" onSubmit={(e) => e.preventDefault()}>
        <label>
          Rechercher un titre <input type="search" />
        </label>
        <label>
          Genre{' '}
          <select>
            <option value="">Tous</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <label>
          <input type="checkbox" /> Disponibles uniquement
        </label>
        <button type="button">Réinitialiser</button>
      </form>

      <p role="status">{filtered.length} résultat(s)</p>
      <ul className="simple-list">
        {filtered.map((book) => (
          <li key={book.id}>
            {book.title} · <em>{book.genre}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Exercice() {
  return <BookSearch books={BOOKS} />;
}
