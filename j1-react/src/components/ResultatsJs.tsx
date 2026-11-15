// Affichage de l'exercice 00 (fourni, à ne pas modifier) : il appelle vos fonctions de logique.ts
// et met le résultat obtenu à côté du résultat attendu. Vous n'avez pas besoin de lire ce fichier.
import type { ReactNode } from 'react';
import { BOOKS } from '../data/books';
import type { Book } from '../types';

type Logique = {
  describe: (book: Book) => string;
  availableTitles: (books: Book[]) => string[];
  borrow: (books: Book[], id: string) => Book[];
};

function Ligne({ label, obtenu, attendu }: { label: string; obtenu: string; attendu: string }) {
  const ok = obtenu === attendu;
  return (
    <tr>
      <td>{label}</td>
      <td><code>{obtenu}</code></td>
      <td><code>{attendu}</code></td>
      <td><span className={ok ? 'badge' : 'badge badge-warning'}>{ok ? 'identique' : 'différent'}</span></td>
    </tr>
  );
}

function Etape({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <section className="panel" style={{ marginBottom: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>{titre}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th>Appel</th><th>Obtenu</th><th>Attendu</th><th></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </section>
  );
}

function essayer<T>(f: () => T): T | string {
  try {
    return f();
  } catch (e) {
    return `Erreur : ${(e as Error).message}`;
  }
}

export function ResultatsJs({ describe, availableTitles, borrow }: Logique) {
  const dune = BOOKS.find((b) => b.id === 'b2')!;
  const titres = essayer(() => availableTitles(BOOKS));
  const apres = essayer(() => borrow(BOOKS, 'b1'));
  const etranger = Array.isArray(apres) ? apres.find((b) => b.id === 'b1') : undefined;

  return (
    <>
      <Etape titre="Étape 1 · describe(livre)">
        <Ligne label="describe(Dune)" obtenu={String(essayer(() => describe(dune)))}
          attendu="Dune, Frank Herbert (1965)" />
      </Etape>
      <Etape titre="Étape 2 · availableTitles(BOOKS)">
        <Ligne label="Nombre de titres" obtenu={Array.isArray(titres) ? String(titres.length) : titres} attendu="9" />
        <Ligne label="Premier titre" obtenu={Array.isArray(titres) ? String(titres[0]) : titres} attendu="Blacksad" />
        <Ligne label="Dernier titre" obtenu={Array.isArray(titres) ? String(titres.at(-1)) : titres} attendu="Sapiens" />
      </Etape>
      <Etape titre="Étape 3 · borrow(BOOKS, 'b1')">
        <Ligne label="Un nouveau tableau ?" obtenu={apres === BOOKS ? 'non, le même' : 'oui'} attendu="oui" />
        <Ligne label="L'Étranger disponible, après" obtenu={etranger ? String(etranger.available) : '?'} attendu="false" />
        <Ligne label="L'Étranger disponible, dans BOOKS" obtenu={String(BOOKS[0].available)} attendu="true" />
      </Etape>
    </>
  );
}
