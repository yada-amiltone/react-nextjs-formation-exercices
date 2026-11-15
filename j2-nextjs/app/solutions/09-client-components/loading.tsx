import { BookGridSkeleton } from '@/components/ui/Skeleton'

// Affiché instantanément pendant que les Server Components de ce segment
// attendent leurs données (voir module 8). Next.js entoure la page d'un
// <Suspense fallback={<Loading />}> automatiquement.
export default function Loading() {
  return <BookGridSkeleton />
}
