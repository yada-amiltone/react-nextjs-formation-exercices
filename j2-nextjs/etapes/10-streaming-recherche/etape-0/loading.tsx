// Ce fichier est affiché pendant que la page attend ses données.
// Next.js l'utilise comme fallback d'un <Suspense> qui entoure page.tsx.
//
// TODO (étape 1) : remplacer ce texte par un vrai squelette :
//   un <h1>, puis <BookGridSkeleton /> (import depuis '@/components/ui/Skeleton').
export default function Loading() {
  return <p>Chargement...</p>
}
