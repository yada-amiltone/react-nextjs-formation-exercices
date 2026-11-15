import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookGridSkeleton } from '@/components/ui/Skeleton'
import { BookResults } from './_components/BookResults'
import { Recommendations } from './_components/Recommendations'
import { SearchForm } from './_components/SearchForm'

export const metadata: Metadata = {
  title: 'Recherche',
}

// searchParams est une Promise (comme params) : l'URL devient l'état de la page.
// /solutions/10-streaming-recherche?q=dune&genre=Science-fiction
type Props = {
  searchParams: Promise<{ q?: string; genre?: string; fail?: string }>
}

export default async function RecherchePage({ searchParams }: Props) {
  const { q = '', genre = '', fail } = await searchParams

  return (
    <>
      <h1>Rechercher un livre</h1>
      <SearchForm defaultQuery={q} defaultGenre={genre} />

      {/* `key` change à chaque recherche : le squelette réapparaît
          pendant le chargement des nouveaux résultats. */}
      <Suspense key={`${q}|${genre}`} fallback={<BookGridSkeleton />}>
        <BookResults query={q} genre={genre} fail={fail === '1'} />
      </Suspense>

      <h2>Nos recommandations</h2>
      {/* Boundary séparée : les résultats s'affichent sans attendre
          cette section lente (streaming). */}
      <Suspense fallback={<BookGridSkeleton count={3} />}>
        <Recommendations />
      </Suspense>
    </>
  )
}
