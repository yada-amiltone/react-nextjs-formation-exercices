'use client' // usePathname est un hook : il ne fonctionne que dans un Client Component.

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLinkProps = {
  href: string
  children: React.ReactNode
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={isActive ? 'active' : undefined}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}
