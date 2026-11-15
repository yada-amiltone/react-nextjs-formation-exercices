import { BookGridSkeleton } from '@/components/ui/Skeleton'

// Squelette de toute la page, affiché immédiatement à la navigation.
export default function Loading() {
  return (
    <>
      <h1>Rechercher un livre</h1>
      <div className="skeleton line" style={{ height: 38, maxWidth: 520 }} />
      <BookGridSkeleton />
    </>
  )
}
