import { useEffect, useState } from 'react';
import { fetchBooks } from '../../api/fakeApi';
import type { Book } from '../../types';

// L'API simulée : fetchBooks() retourne une Promise<Book[]> après 800 ms.
// Ajoutez ?fail=1 dans l'URL (http://localhost:5173/?fail=1#/05/exercice) pour simuler une panne.

// Étape 4 : le hook personnalisé
//   Déplacer ici les 3 états et le useEffect de BookCatalog, retourner { books, loading, error },
//   puis dans BookCatalog : const { books, loading, error } = useBooks();

export function BookCatalog() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Étape 2 : charger les livres avec useEffect(() => { ... }, [])
  //   fetchBooks().then((data) => setBooks(data)).finally(() => setLoading(false));

  // Étape 3 : afficher l'erreur et nettoyer l'effet
  //   .catch((err) => setError(err.message)) ; si error : return <p role="alert">Erreur : {error}</p>;
  //   Nettoyage : let ignore = false; au début de l'effet, return () => { ignore = true; };
  //   et ne mettre l'état à jour que si !ignore.

  // Étape 5 (bonus) : mettre le nombre de livres dans le titre de l'onglet avec un second effet :
  //   document.title = `${books.length} livres · Bibliothèque`; Quelles dépendances ?

  // Un hook (useState, useEffect…) s'appelle toujours AVANT un return anticipé.
  if (loading) return <p>Chargement des livres…</p>;

  return (
    <ul className="simple-list">
      {books.map((book) => (
        <li key={book.id}>
          {book.title} · {book.author}
        </li>
      ))}
    </ul>
  );
}

export default function Exercice() {
  return <BookCatalog />;
}
