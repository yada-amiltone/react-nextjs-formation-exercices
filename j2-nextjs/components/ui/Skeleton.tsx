/** Grille de cartes « fantômes » affichée pendant un chargement. */
export function BookGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul className="grid" aria-busy="true" aria-label="Chargement des livres">
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <div className="skeleton card" />
        </li>
      ))}
    </ul>
  )
}

/** Quelques lignes de texte « fantômes ». */
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div aria-busy="true">
      <div className="skeleton title" />
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="skeleton line" />
      ))}
    </div>
  )
}
