// import type { NextRequest } from 'next/server'
// import { getBooks } from '@/lib/db'

// TODO (étape 1) : GET /exercices/12-route-handlers/api/livres
//   1. Lire les paramètres `q` et `genre` : request.nextUrl.searchParams.get('q').
//      (Changer le type du paramètre en NextRequest pour avoir `nextUrl`.)
//   2. Appeler getBooks({ query, genre }).
//   3. Renvoyer Response.json({ count, data }), où data contient les livres
//      SANS leurs avis, mais avec un champ reviewCount.
export async function GET(_request: Request) {
  return Response.json(
    { error: 'TODO : endpoint pas encore implémenté (voir api/livres/route.ts)' },
    { status: 501 },
  )
}
