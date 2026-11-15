import Link from 'next/link'
// import { NavLink } from './_components/NavLink'

const BASE = '/exercices/07-routing-layouts'

// Le layout entoure toutes les pages du dossier (accueil, livres, à propos).
// Il reste affiché quand on navigue d'une page à l'autre : seul `children` change.
// TODO (étape 4) : remplacer Link par NavLink pour mettre en évidence la page courante.
export default function BibliothequeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="nav" aria-label="Navigation de la bibliothèque">
        <Link href={BASE}>Accueil</Link>
        <Link href={`${BASE}/livres`}>Livres</Link>
        <Link href={`${BASE}/a-propos`}>À propos</Link>
      </nav>
      {children}
    </>
  )
}
