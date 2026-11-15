// import { getBook } from '@/lib/db'

// Comme pour une page, `params` est une Promise.
type Context = {
  params: Promise<{ id: string }>
}

// TODO (étape 2) : GET /exercices/12-route-handlers/api/livres/[id]
//   1. Récupérer `id` avec await params.
//   2. Charger le livre avec getBook(id).
//   3. S'il n'existe pas : Response.json({ error: '...' }, { status: 404 }).
//   4. Sinon : Response.json(book).
export async function GET(_request: Request, _context: Context) {
  return Response.json(
    { error: 'TODO : endpoint pas encore implémenté (voir api/livres/[id]/route.ts)' },
    { status: 501 },
  )
}
