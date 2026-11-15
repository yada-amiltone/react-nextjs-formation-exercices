import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Formation Next.js - Jour 2',
    template: '%s | Formation Next.js',
  },
  description: 'Exercices Next.js (App Router) de la formation React & Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <header className="site-header">
          <div className="inner">
            <Link href="/">📚 Formation Next.js · Jour 2</Link>
            <span>Bibliothèque</span>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  )
}
