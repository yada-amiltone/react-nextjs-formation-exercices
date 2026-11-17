// « Base de données » en mémoire pour la formation.
//
// - Les fonctions sont asynchrones et volontairement lentes (latence simulée),
//   comme un vrai appel réseau ou SQL : c'est ce qui rend visibles
//   loading.tsx, <Suspense> et le streaming.
// - Les données vivent dans `globalThis` : elles survivent au rechargement à
//   chaud (HMR) mais sont réinitialisées à chaque redémarrage du serveur.
// - Ce fichier ne doit être importé que côté serveur (Server Components,
//   Server Actions, Route Handlers).
import 'server-only'
import { BOOKS, type Book, type Genre, type Review } from './books'

type Store = { books: Book[] }

const globalForDb = globalThis as unknown as { __bibliotheque?: Store }

function store(): Store {
  if (!globalForDb.__bibliotheque) {
    // Copie profonde : les données d'origine ne sont jamais modifiées.
    globalForDb.__bibliotheque = { books: structuredClone(BOOKS) }
  }
  return globalForDb.__bibliotheque
}

/** Attend `ms` millisecondes (latence réseau simulée). */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export type GetBooksOptions = {
  /** Recherche (insensible à la casse) dans le titre et l'auteur. */
  query?: string
  /** Filtre par genre exact. */
  genre?: Genre | string
  /** Pour l'exercice 10 : `true` simule une panne de la base. */
  fail?: boolean
  /** Latence simulée en ms (800 par défaut). */
  delay?: number
}

/** Liste des livres, filtrée par `query` et `genre`. */
export async function getBooks({
  query,
  genre,
  fail = false,
  delay = 800,
}: GetBooksOptions = {}): Promise<Book[]> {
  await sleep(delay)
  if (fail) {
    throw new Error('La base de données de la bibliothèque ne répond pas.')
  }
  const q = query?.trim().toLowerCase()
  return store().books.filter((book) => {
    const matchesQuery =
      !q ||
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q)
    const matchesGenre = !genre || book.genre === genre
    return matchesQuery && matchesGenre
  })
}

/** Un livre par son identifiant, ou `undefined` s'il n'existe pas. */
export async function getBook(
  id: string,
  { delay = 600 }: { delay?: number } = {},
): Promise<Book | undefined> {
  await sleep(delay)
  return store().books.find((book) => book.id === id)
}

/** Une sélection de livres « recommandés » (volontairement lente : 2,5 s). */
export async function getRecommendations({
  delay = 2500,
}: { delay?: number } = {}): Promise<Book[]> {
  'use cache'
  await sleep(delay)
  return store()
    .books.filter((book) => book.available)
    .sort((a, b) => b.reviews.length - a.reviews.length)
    .slice(0, 3)
}

export type NewReview = Pick<Review, 'author' | 'rating' | 'comment'>

/** Ajoute un avis à un livre et renvoie l'avis créé. */
export async function addReview(
  bookId: string,
  { author, rating, comment }: NewReview,
): Promise<Review> {
  await sleep(500)
  const book = store().books.find((b) => b.id === bookId)
  if (!book) {
    throw new Error(`Livre introuvable : ${bookId}`)
  }
  const review: Review = {
    id: crypto.randomUUID(),
    author,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  }
  book.reviews.unshift(review)
  return review
}
