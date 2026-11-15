import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API des livres',
}

const API = '/exercices/12-route-handlers/api/livres'

const ENDPOINTS = [
  { href: API, label: 'Tous les livres' },
  { href: `${API}?q=tolkien`, label: 'Recherche « tolkien »' },
  { href: `${API}?genre=Policier`, label: 'Genre Policier' },
  { href: `${API}/dune`, label: 'Détail de Dune' },
  { href: `${API}/livre-inconnu`, label: 'Livre inconnu (404 attendu)' },
]

// Page de test de l'API : chaque lien ouvre la réponse JSON brute.
export default function ApiPage() {
  return (
    <>
      <h1>API JSON de la Bibliothèque</h1>
      <p>
        Les Route Handlers (<code>route.ts</code>) exposent des endpoints HTTP
        classiques, utiles pour une application mobile, un partenaire ou un
        webhook. Pour vos propres pages, préférez les Server Components et les
        Server Actions.
      </p>
      <ul>
        {ENDPOINTS.map((endpoint) => (
          <li key={endpoint.href}>
            {/* <a> et non <Link> : on veut afficher la réponse JSON brute. */}
            <a href={endpoint.href} target="_blank" rel="noreferrer">
              {endpoint.label}
            </a>{' '}
            <code>GET {endpoint.href}</code>
          </li>
        ))}
      </ul>
      <p className="muted">
        En ligne de commande : <code>curl -i http://localhost:3000{API}?q=dune</code>
      </p>
    </>
  )
}
