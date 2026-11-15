import { NextResponse, type NextRequest } from 'next/server'

// Proxy : s'exécute AVANT le rendu de chaque requête ciblée par `matcher`. Un seul fichier par projet,
// à la racine (au même niveau que app/).
//
// Démo de l'exercice 12 (solution) : on ajoute un en-tête HTTP à toutes les
// réponses de l'API, et on journalise les appels.
// Vérification : curl -i http://localhost:3000/solutions/12-route-handlers/api/livres
export function proxy(request: NextRequest) {
  console.log(`[proxy] ${request.method} ${request.nextUrl.pathname}`)

  const response = NextResponse.next()
  response.headers.set('x-bibliotheque-api', 'formation-nextjs')
  return response
}

export const config = {
  matcher: '/solutions/12-route-handlers/api/:path*',
}
