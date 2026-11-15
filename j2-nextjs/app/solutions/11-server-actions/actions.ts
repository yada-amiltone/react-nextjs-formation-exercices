'use server' // Toutes les fonctions exportées sont des Server Actions.

import { updateTag } from 'next/cache'
import { z } from 'zod'
import { addReview } from '@/lib/db'
import { bookTag } from './_lib/data'

// Ne jamais faire confiance au navigateur : on revalide tout côté serveur.
const ReviewSchema = z.object({
  bookId: z.string().min(1),
  author: z.string().trim().min(2, 'Votre nom doit contenir au moins 2 caractères.'),
  rating: z.coerce
    .number()
    .int()
    .min(1, 'Choisissez une note entre 1 et 5.')
    .max(5, 'Choisissez une note entre 1 et 5.'),
  comment: z
    .string()
    .trim()
    .min(10, 'Votre avis doit contenir au moins 10 caractères.')
    .max(500, 'Votre avis ne doit pas dépasser 500 caractères.'),
})

export type ReviewFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'author' | 'rating' | 'comment', string[]>>
  values?: { author: string; rating: string; comment: string }
}

// Signature imposée par useActionState : (état précédent, FormData) => nouvel état.
export async function addReviewAction(
  _prevState: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  const raw = {
    bookId: String(formData.get('bookId') ?? ''),
    author: String(formData.get('author') ?? ''),
    rating: String(formData.get('rating') ?? ''),
    comment: String(formData.get('comment') ?? ''),
  }

  const result = ReviewSchema.safeParse(raw)
  if (!result.success) {
    return {
      status: 'error',
      message: 'Le formulaire contient des erreurs.',
      errors: z.flattenError(result.error).fieldErrors,
      values: { author: raw.author, rating: raw.rating, comment: raw.comment },
    }
  }

  const { bookId, ...review } = result.data
  await addReview(bookId, review)

  // Invalide le cache du livre : la page est re-rendue avec le nouvel avis
  // dans la réponse même de l'action (« read your own writes »).
  updateTag(bookTag(bookId))

  return { status: 'success', message: 'Merci, votre avis a été publié !' }
}
