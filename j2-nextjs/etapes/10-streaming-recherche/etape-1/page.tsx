import type { Metadata } from 'next'
// import { Suspense } from 'react'
// import { BookGridSkeleton } from '@/components/ui/Skeleton'
import { BookResults } from './_components/BookResults'
import { Recommendations } from './_components/Recommendations'
import { SearchForm } from './_components/SearchForm'

export const metadata: Metadata = {
  title: 'Recherche',
}

// TODO (étape 3) : lire la recherche dans l'URL.
//   `searchParams` est une Promise : const { q = '', genre = '' } = await searchParams
//   Puis passer q et genre à <SearchForm> et à <BookResults>.
type Props = {
  searchParams: Promise<{ q?: string; genre?: string; fail?: string }>
}

export default async function RecherchePage(_props: Props) {
  return (
    <>
      <h1>Rechercher un livre</h1>
      <SearchForm defaultQuery="" defaultGenre="" />

      {/* BookResults met environ 0,8 s à répondre. */}
      <BookResults query="" genre="" />

      <h2>Nos recommandations</h2>
      {/*
        TODO (étape 2) : Recommendations met 2,5 s à répondre, et toute la page
        l'attend ! Entourez-le d'un <Suspense fallback={<BookGridSkeleton count={3} />}>
        pour afficher les résultats sans attendre (streaming).
      */}
      <Recommendations />
    </>
  )
}
