import { z } from 'zod'
import { addReview, getBook } from '@/lib/db'

type Context = {
  params: Promise<{ id: string }>
}

const ReviewSchema = z.object({
  author: z.string().trim().min(2),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(10).max(500),
})

// POST /exercices/12-route-handlers/api/livres/dune/avis
// Corps JSON : { "author": "Ada", "rating": 5, "comment": "Un classique absolu." }
export async function POST(request: Request, { params }: Context) {
  const { id } = await params
  if (!(await getBook(id))) {
    return Response.json({ error: `Livre introuvable : ${id}` }, { status: 404 })
  }

  const body: unknown = await request.json().catch(() => null)
  const result = ReviewSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ errors: z.flattenError(result.error).fieldErrors }, { status: 400 })
  }

  const review = await addReview(id, result.data)
  return Response.json(review, { status: 201 })
}
