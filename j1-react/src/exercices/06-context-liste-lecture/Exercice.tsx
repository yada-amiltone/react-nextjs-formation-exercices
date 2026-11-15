import { createContext, useContext, useState, type ReactNode } from 'react';
import { BOOKS } from '../../data/books';
import type { Book } from '../../types';

// Objectif : l'en-tête, la liste et le panneau partagent la même liste de lecture.
// Plutôt que de faire descendre des props sur plusieurs niveaux (« prop drilling »),
// on place l'état dans un Context, lisible par tous les composants qui sont dessous.

type ReadingListValue = {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
};

// Étape 1 : brancher le contexte (3 morceaux)
//   a. Créer le contexte : export const ReadingListContext = createContext<ReadingListValue | null>(null);
//   b. Dans le Provider : un état ids, les fonctions add / remove / has (mises à jour immuables),
//      et return <ReadingListContext value={{ ids, add, remove, has }}>{children}</ReadingListContext>
//   c. Dans useReadingList : return useContext(ReadingListContext)!;
export function ReadingListProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// Étape 4 : protéger le hook
//   Si le contexte vaut null (composant placé hors du Provider), lever une erreur claire :
//   throw new Error('useReadingList doit être utilisé dans un <ReadingListProvider>');
export function useReadingList(): ReadingListValue {
  return { ids: [], add: () => {}, remove: () => {}, has: () => false };
}

// Étape 2 : afficher le vrai nombre de livres de la liste (via useReadingList()).
export function Header() {
  return (
    <header className="app-header">
      <h1>Bibliothèque</h1>
      <p>Ma liste de lecture (0)</p>
    </header>
  );
}

// Déjà fait : exemple d'utilisation du hook dans un composant.
export function BookList({ books }: { books: Book[] }) {
  const { has, add, remove } = useReadingList();
  return (
    <ul className="simple-list">
      {books.map((book) => (
        <li key={book.id}>
          {book.title}{' '}
          {has(book.id) ? (
            <button type="button" onClick={() => remove(book.id)}>
              Retirer de ma liste
            </button>
          ) : (
            <button type="button" onClick={() => add(book.id)}>
              Ajouter à ma liste
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

// Étape 3 : le panneau « Ma liste »
//   Récupérer ids avec useReadingList(). Liste vide : <p>Votre liste est vide</p>.
//   Sinon : un <ol> avec le titre de chaque livre (BOOKS.find((b) => b.id === id)?.title).
export function ReadingListPanel() {
  return (
    <aside className="panel" aria-label="Ma liste">
      <h2>Ma liste</h2>
      <p>TODO</p>
    </aside>
  );
}

export default function Exercice() {
  return (
    <ReadingListProvider>
      <Header />
      <div className="two-columns">
        <BookList books={BOOKS} />
        <ReadingListPanel />
      </div>
    </ReadingListProvider>
  );
}
