import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accueil',
}

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
