import type { Book } from '../../types';

// Étape 1 : décrire un livre
export function describe(book: Book): string {
  const { title, author, year } = book;
  return `${title}, ${author} (${year})`;
}

// Étape 2 : les titres des livres disponibles
//   Garder les livres disponibles (filter), garder leur titre (map), trier par ordre alphabétique (sort).
export function availableTitles(books: Book[]): string[] {
  return [];
}

// Étape 3 : emprunter un livre SANS modifier le tableau reçu
//   Renvoyer un nouveau tableau (map) où le livre `id` est une copie (spread) avec available: false.
export function borrow(books: Book[], id: string): Book[] {
  return books;
}
