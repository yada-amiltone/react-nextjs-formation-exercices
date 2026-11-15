/** Affiche une note de 1 à 5 sous forme d'étoiles. */
export function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" aria-label={`${rating} sur 5`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}
