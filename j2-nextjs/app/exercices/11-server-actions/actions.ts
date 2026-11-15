'use server' // Toutes les fonctions exportées de ce fichier sont des Server Actions.

// import { refresh, updateTag } from 'next/cache'
// import { z } from 'zod'
// import { addReview } from '@/lib/db'
// import { bookTag } from './_lib/data'

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
  // TODO (étape 2) : enregistrer l'avis.
  //   1. Lire bookId, author, rating et comment avec formData.get('...').
  //   2. Appeler await addReview(bookId, { author, rating: Number(rating), comment }).
  //   3. Appeler refresh() (de 'next/cache') pour que la page affiche le nouvel avis.
  //   4. Renvoyer { status: 'success', message: 'Merci, votre avis a été publié !' }.

  // TODO (étape 3) : valider les données avec Zod AVANT d'enregistrer.
  //   - author : au moins 2 caractères ; rating : entier de 1 à 5 (z.coerce.number()) ;
  //     comment : entre 10 et 500 caractères.
  //   - Si la validation échoue, renvoyer { status: 'error', message, errors, values }
  //     avec errors = z.flattenError(result.error).fieldErrors.

  // TODO (étape 5) : une fois le cache activé (étape 4), remplacer refresh()
  //   par updateTag(bookTag(bookId)).

  console.log('addReviewAction appelée avec', Object.fromEntries(formData))
  return { status: 'error', message: 'TODO : action pas encore implémentée (voir actions.ts).' }
}
