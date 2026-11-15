import Link from 'next/link'

type NavLinkProps = {
  href: string
  children: React.ReactNode
}

// TODO (étape 4) : mettre en évidence le lien de la page courante.
//   1. Transformer ce fichier en Client Component avec la directive 'use client'
//      (tout en haut du fichier, avant les imports).
//   2. Récupérer l'URL courante avec le hook `usePathname()` de 'next/navigation'.
//   3. Ajouter la classe CSS "active" (et aria-current="page") quand
//      l'URL courante est égale à `href`.
export function NavLink({ href, children }: NavLinkProps) {
  return <Link href={href}>{children}</Link>
}
