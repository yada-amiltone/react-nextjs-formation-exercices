import { getBook } from '@/lib/db'

type Context = {
  params: Promise<{ id: string }>
}

// GET /solutions/12-route-handlers/api/livres/dune
export async function GET(_request: Request, { params }: Context) {
  const { id } = await params
  const book = await getBook(id)

  if (!book) {
    return Response.json({ error: `Livre introuvable : ${id}` }, { status: 404 })
  }

  return Response.json(book)
}
