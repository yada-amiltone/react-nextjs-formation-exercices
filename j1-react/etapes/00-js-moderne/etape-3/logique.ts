import type { Book } from '../../types';

// Étape 1 : décrire un livre
export function describe(book: Book): string {
  const { title, author, year } = book;
  return `${title}, ${author} (${year})`;
}

// Étape 2 : les titres des livres disponibles
export function availableTitles(books: Book[]): string[] {
  return books
    .filter((book) => book.available)
    .map((book) => book.title)
    .sort((a, b) => a.localeCompare(b));
}

// Étape 3 : emprunter un livre sans modifier le tableau reçu
export function borrow(books: Book[], id: string): Book[] {
  return books.map((book) => (book.id === id ? { ...book, available: false } : book));
}
