import { NavLink } from './_components/NavLink'

const BASE = '/solutions/07-routing-layouts'

// Le layout entoure toutes les pages du dossier (accueil, livres, à propos).
// Il n'est pas re-rendu quand on navigue d'une page à l'autre : la navigation
// reste affichée, seul `children` change.
export default function BibliothequeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="nav" aria-label="Navigation de la bibliothèque">
        <NavLink href={BASE}>Accueil</NavLink>
        <NavLink href={`${BASE}/livres`}>Livres</NavLink>
        <NavLink href={`${BASE}/a-propos`}>À propos</NavLink>
      </nav>
      {children}
    </>
  )
}
