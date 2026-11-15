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

export function BookCard() {
  return (
    // En JSX, l'attribut HTML « class » s'écrit « className »
    <article className="book-card">
      {/* style attend un objet JS : d'où les doubles accolades */}
      <div className="cover" style={{ background: book.coverColor }} />
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>Publié en {book.year}</p>
      <span className="badge">{book.genre}</span>
    </article>
  );
}

export default function Solution() {
  // Un composant retourne UN seul élément racine : le fragment <>...</> regroupe sans ajouter de balise
  return (
    <>
      <Header />
      <BookCard />
    </>
  );
}
