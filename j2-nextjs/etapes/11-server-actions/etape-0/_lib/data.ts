import 'server-only'
// import { cacheLife, cacheTag } from 'next/cache'
import { getBook } from '@/lib/db'

/** Étiquette de cache d'un livre : sert à l'invalider après une mutation. */
export const bookTag = (id: string) => `livre-${id}`

// TODO (étape 4) : mettre cette fonction en cache.
//   1. Ajouter la directive 'use cache' en première ligne du corps de la fonction.
//   2. Appeler cacheLife('hours') puis cacheTag(bookTag(id)).
//   3. Publier un avis : il n'apparaît plus, même après F5. Pourquoi ?
//      Corrigez dans actions.ts (étape 5).
export async function getBookWithReviews(id: string) {
  return getBook(id)
}
