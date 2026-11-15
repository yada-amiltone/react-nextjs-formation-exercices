import type { NextRequest } from 'next/server'
import { getBooks } from '@/lib/db'

// GET /solutions/12-route-handlers/api/livres?q=...&genre=...
// Le nom de la fonction exportée = la méthode HTTP gérée (GET, POST, PUT, DELETE...).
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const books = await getBooks({
    query: searchParams.get('q') ?? undefined,
    genre: searchParams.get('genre') ?? undefined,
  })

  // On n'expose pas le détail des avis dans la liste : seulement leur nombre.
  const data = books.map(({ reviews, ...book }) => ({
    ...book,
    reviewCount: reviews.length,
  }))

  return Response.json({ count: data.length, data })
}
