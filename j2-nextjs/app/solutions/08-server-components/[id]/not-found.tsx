import Link from 'next/link'

// Affiché quand la page appelle notFound().
export default function LivreIntrouvable() {
  return (
    <div className="alert error">
      <h2>Livre introuvable</h2>
      <p>Ce livre n&apos;existe pas ou a été retiré du catalogue.</p>
      <Link href="/solutions/08-server-components">Retour à la liste</Link>
    </div>
  )
}
