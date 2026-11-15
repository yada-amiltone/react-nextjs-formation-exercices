import { BOOKS } from '../../data/books';

// Le livre à afficher dans la carte (le premier du catalogue : « L'Étranger »).
const book = BOOKS[0];

export function Header() {
  return (
    <header>
      <h1>Ma Bibliothèque</h1>
      {/* Les accolades insèrent n'importe quelle expression JavaScript */}
      <p>{BOOKS.length} livres au catalogue</p>
    </header>
  );
}

// Étape 3 : la carte du livre
//   Retourner un <article className="book-card"> avec : un <h2> (titre), un <p> (auteur),
//   un <p> « Publié en 1942 » (book.year) et un <span className="badge"> (genre).
// Étape 4 : la couverture colorée
//   En haut de la carte : <div className="cover" /> avec un fond de couleur book.coverColor.
export function BookCard() {
  return <p>TODO : carte du livre</p>;
}

export default function Exercice() {
  // Étape 3 : afficher <Header /> puis <BookCard /> dans un fragment <>...</>.
  return <Header />;
}
