import { useState } from 'react';
import { BOOKS } from '../../data/books';
import type { Book } from '../../types';

type BookCardProps = { book: Book };

// Chaque carte gère son propre état : deux cartes ont des compteurs indépendants.
export function BookCard({ book }: BookCardProps) {
  // useState retourne [valeur courante, fonction de mise à jour].
  // Appeler la fonction de mise à jour déclenche un nouveau rendu du composant.
  const [likes, setLikes] = useState(0);

  const [isFavorite, setIsFavorite] = useState(false);

  const [showSummary, setShowSummary] = useState(false);

  return (
    <article className="book-card">
      <div className="cover" style={{ background: book.coverColor }} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      {showSummary && <p>{book.summary}</p>}
      <div className="actions">
        {/* Forme fonctionnelle : on calcule le nouvel état à partir du précédent */}
        <button type="button" onClick={() => setLikes((n) => n + 1)}>
          👍 J'aime ({likes})
        </button>
        <button type="button" aria-pressed={isFavorite} onClick={() => setIsFavorite((fav) => !fav)}>
          {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        </button>
        <button type="button" onClick={() => setShowSummary((v) => !v)}>
          {showSummary ? 'Masquer le résumé' : 'Voir le résumé'}
        </button>
      </div>
    </article>
  );
}

type Tag = { id: number; label: string };

// Étape 4 : un état de type tableau, mis à jour sans le modifier
//   Ajouter : setTags((prev) => [...prev, { id: Date.now(), label }]) puis setText('')
//             (ne rien ajouter si le texte est vide). Jamais tags.push !
//   Supprimer : setTags((prev) => prev.filter((t) => t.id !== id))
export function TagEditor() {
  const [text, setText] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  return (
    <div className="tag-editor">
      <label>
        Nouvelle étiquette{' '}
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <button type="button">Ajouter</button>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            {tag.label} <button type="button">Supprimer {tag.label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Exercice() {
  return (
    <>
      <ul className="book-list">
        {BOOKS.slice(0, 3).map((book) => (
          <li key={book.id}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
      <h2>Mes étiquettes</h2>
      <TagEditor />
    </>
  );
}
