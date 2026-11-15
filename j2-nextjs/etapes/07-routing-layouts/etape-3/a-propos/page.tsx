import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos',
}

// Fichier app/.../a-propos/page.tsx  →  URL .../a-propos
export default function AProposPage() {
  return (
    <>
      <h1>À propos</h1>
      <p>
        La Bibliothèque est l&apos;application fil rouge de la formation React
        &amp; Next.js. Ouverte du lundi au samedi, de 9h à 19h.
      </p>
    </>
  )
}
