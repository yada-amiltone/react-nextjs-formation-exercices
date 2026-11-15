'use server' // Toutes les fonctions exportées de ce fichier sont des Server Actions.

import { refresh } from 'next/cache'
import { addReview } from '@/lib/db'

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
  // TODO (étape 3) : valider les données avec Zod AVANT d'enregistrer.
  const bookId = String(formData.get('bookId') ?? '')
  const author = String(formData.get('author') ?? '')
  const rating = Number(formData.get('rating'))
  const comment = String(formData.get('comment') ?? '')

  await addReview(bookId, { author, rating, comment })

  // Re-rend la page courante avec des données fraîches : le nouvel avis s'affiche.
  refresh()

  return { status: 'success', message: 'Merci, votre avis a été publié !' }
}
