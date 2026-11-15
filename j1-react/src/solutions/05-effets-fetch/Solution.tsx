import { useEffect, useState } from 'react';
import { fetchBooks } from '../../api/fakeApi';
import type { Book } from '../../types';

// L'API simulée : fetchBooks() retourne une Promise<Book[]> après 800 ms.
// Ajoutez ?fail=1 dans l'URL (http://localhost:5173/?fail=1#/05/exercice) pour simuler une panne.

// Hook personnalisé : il regroupe l'état et l'effet de chargement.
// N'importe quel composant peut maintenant écrire `const { books } = useBooks()`.
export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Un effet SYNCHRONISE le composant avec un système externe (ici : une API).
  useEffect(() => {
    let ignore = false;

    fetchBooks()
      .then((data) => {
        if (!ignore) setBooks(data);
      })
      .catch((err: unknown) => {
        if (!ignore) setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    // Nettoyage : appelé si le composant disparaît (ou avant de relancer l'effet).
    // En développement, le StrictMode monte/démonte/remonte : le drapeau évite la double mise à jour.
    return () => {
      ignore = true;
    };
  }, []); // [] : aucune dépendance -> l'effet ne s'exécute qu'après le premier affichage

  return { books, loading, error };
}

export function BookCatalog() {
  const { books, loading, error } = useBooks();

  // Effet avec une dépendance -> relancé à chaque fois que books.length change
  useEffect(() => {
    document.title = `${books.length} livres · Bibliothèque`;
  }, [books.length]);

  // Un hook (useState, useEffect…) s'appelle toujours AVANT un return anticipé.
  if (loading) return <p>Chargement des livres…</p>;
  if (error) return <p role="alert">Erreur : {error}</p>;

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

export default function Solution() {
  return <BookCatalog />;
}
