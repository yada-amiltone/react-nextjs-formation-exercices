'use client' // Les error boundaries sont toujours des Client Components.

import { useEffect } from 'react'

type ErrorPageProps = {
  error: unknown
  retry: () => void // relance le rendu du segment (nouvelle requête serveur)
}

export default function RechercheError({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    // En vrai projet : envoyer l'erreur à un outil de suivi (Sentry...).
    console.error(error)
  }, [error])

  // En production, le message d'une erreur levée côté serveur est masqué
  // pour ne pas exposer de détails sensibles : seul `digest` (un identifiant
  // à retrouver dans les logs serveur) est transmis au navigateur.
  const details =
    process.env.NODE_ENV === 'development' && error instanceof Error
      ? error.message
      : `Référence : ${(error as { digest?: string })?.digest ?? 'inconnue'}`

  return (
    <div className="alert error">
      <h2>Oups, la recherche a échoué</h2>
      <p>La bibliothèque est momentanément indisponible.</p>
      <p className="muted">{details}</p>
      <p style={{ display: 'flex', gap: 8 }}>
        <button type="button" className="btn" onClick={() => retry()}>
          Réessayer
        </button>
        {/* <a> et non <Link> : l'error boundary ne se réinitialise que si le
            chemin change. Ici seul ?fail=1 disparaît, on recharge donc la page. */}
        <a className="btn secondary" href="/solutions/10-streaming-recherche">
          Nouvelle recherche
        </a>
      </p>
    </div>
  )
}
