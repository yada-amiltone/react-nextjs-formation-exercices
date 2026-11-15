import { useState } from 'react';
import { BOOKS, GENRES } from '../../data/books';
import type { Book, Genre } from '../../types';

type BookSearchProps = { books: Book[] };

export function BookSearch({ books }: BookSearchProps) {
  // Composant contrôlé : React est la « source de vérité » de la valeur des champs.
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState<Genre | ''>('');
  // Étape 3 : disponibles uniquement
  //   État booléen onlyAvailable relié à la case : checked={onlyAvailable} et e.target.checked.
  // Étape 4 : bouton « Réinitialiser » qui remet les 3 états à leur valeur initiale.

  // État dérivé : recalculé à chaque rendu à partir de l'état existant.
  // Pas de useState ni de useEffect : impossible d'être désynchronisé.
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = books.filter(
    (book) =>
      book.title.toLowerCase().includes(normalizedQuery) &&
      (genre === '' || book.genre === genre),
  );

  return (
    <div>
      <form className="filters" onSubmit={(e) => e.preventDefault()}>
        <label>
          Rechercher un titre{' '}
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <label>
          Genre{' '}
          <select value={genre} onChange={(e) => setGenre(e.target.value as Genre | '')}>
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
