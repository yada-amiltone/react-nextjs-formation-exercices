export type Genre = 'Roman' | 'Science-fiction' | 'Policier' | 'Essai' | 'Fantasy' | 'BD';

export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: Genre;
  summary: string;
  /** false = le livre est actuellement emprunté */
  available: boolean;
  /** note sur 5 */
  rating: number;
  /** couleur de la couverture (CSS) */
  coverColor: string;
};
