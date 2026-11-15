// import { NavLink } from './_components/NavLink'

const BASE = '/exercices/07-routing-layouts'

// TODO (étape 3) : ajouter une barre de navigation commune à toutes les pages
// de l'exercice, AU-DESSUS de {children} :
//   <nav className="nav"> avec trois liens : Accueil (BASE), Livres
//   (`${BASE}/livres`) et À propos (`${BASE}/a-propos`).
//   Utilisez <Link> de 'next/link' (ou le composant NavLink fourni), jamais <a>.
export default function BibliothequeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <p className="todo">
        TODO : la navigation ira ici (voir layout.tsx). Base des URL : {BASE}
      </p>
      {children}
    </>
  )
}
