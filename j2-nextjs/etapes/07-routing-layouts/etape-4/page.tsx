import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accueil',
}

// Cette page correspond à l'URL /exercices/07-routing-layouts
export default function AccueilPage() {
  return (
    <>
      <h1>Bienvenue à la Bibliothèque</h1>
      <p>
        Parcourez notre catalogue, réservez vos prochaines lectures et
        partagez vos avis.
      </p>
    </>
  )
}
