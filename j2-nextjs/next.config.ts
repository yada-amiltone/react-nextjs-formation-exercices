import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Configuration par défaut d'un projet `create-next-app` en Next.js 16.4 :
  // Cache Components (directive 'use cache', streaming avec <Suspense>)
  // et Partial Prefetching.
  cacheComponents: true,
  partialPrefetching: true,

  // Docker (module 10) : `next build` produit aussi .next/standalone, un serveur Node autonome
  // qui ne contient que les dépendances utiles. Sans effet sur `npm run dev`.
  output: 'standalone',

  // Formation : pas de fichier AGENTS.md généré automatiquement par `next dev`.
  agentRules: false,
  experimental: {
    agentFeedback: false,
  },
}

export default nextConfig
