import { BOOKS } from '../../data/books';

// Le livre à afficher dans la carte (le premier du catalogue : « L'Étranger »).
const book = BOOKS[0];

// Étape 1 : l'en-tête
//   Retourner un <header> qui contient un <h1> « Ma Bibliothèque ».
// Étape 2 : une expression JavaScript dans le JSX
//   Sous le titre, ajouter un <p> « 12 livres au catalogue » où 12 vient de BOOKS.length.
export function Header() {
  return <p>TODO : en-tête</p>;
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
