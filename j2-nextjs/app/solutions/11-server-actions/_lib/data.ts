import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { getBook } from '@/lib/db'

/** Étiquette de cache d'un livre : sert à l'invalider après une mutation. */
export const bookTag = (id: string) => `livre-${id}`

// Fonction de données mise en cache (Cache Components).
// - 'use cache'    : le résultat est mémorisé (clé = arguments, ici `id`).
// - cacheLife      : durée de vie de l'entrée de cache.
// - cacheTag       : étiquette pour invalider l'entrée à la demande.
export async function getBookWithReviews(id: string) {
  'use cache'
  cacheLife('hours')
  cacheTag(bookTag(id))

  return getBook(id)
}
