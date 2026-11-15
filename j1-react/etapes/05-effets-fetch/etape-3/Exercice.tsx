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


  // Étape 5 (bonus) : mettre le nombre de livres dans le titre de l'onglet avec un second effet :
  //   document.title = `${books.length} livres · Bibliothèque`; Quelles dépendances ?

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

export default function Exercice() {
  return <BookCatalog />;
}
