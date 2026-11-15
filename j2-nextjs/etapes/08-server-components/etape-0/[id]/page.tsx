// import type { Metadata } from 'next'
// import Link from 'next/link'
// import { notFound } from 'next/navigation'
// import { getBook } from '@/lib/db'

// Le dossier [id] crée une route dynamique :
//   /exercices/08-server-components/dune  →  params = { id: 'dune' }
// Attention : `params` est une Promise, il faut l'attendre avec `await`.
type Props = {
  params: Promise<{ id: string }>
}

// TODO (étape 4) : exporter `generateMetadata` pour que l'onglet affiche le
// titre du livre :
//   export async function generateMetadata({ params }: Props): Promise<Metadata> { ... }

// TODO (étape 2) : afficher le détail du livre.
//   1. Rendre le composant `async` et récupérer `id` avec `await params`.
//   2. Charger le livre avec `await getBook(id)`.
//   3. Afficher titre, auteur, année, résumé et la liste des avis.
// TODO (étape 3) : si le livre n'existe pas, appeler `notFound()`.
export default function LivrePage(_props: Props) {
  return (
    <>
      <h1>Détail d&apos;un livre</h1>
      <p className="todo">TODO : afficher le livre (voir [id]/page.tsx).</p>
    </>
  )
}
