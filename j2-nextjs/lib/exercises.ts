// Liste des exercices du jour 2, utilisée par la page d'accueil.
export const EXERCISES = [
  {
    slug: '07-routing-layouts',
    title: 'Routage et layouts',
    module: 'Module 6',
    goal: 'Créer des pages, un layout partagé et une navigation avec lien actif.',
  },
  {
    slug: '08-server-components',
    title: 'Server Components et données',
    module: 'Module 7',
    goal: 'Lire les livres côté serveur, créer la page détail /[id], gérer le 404.',
  },
  {
    slug: '09-client-components',
    title: 'Client Components',
    module: 'Module 7',
    goal: 'Ajouter un bouton favori interactif dans une page serveur.',
  },
  {
    slug: '10-streaming-recherche',
    title: 'Streaming, erreurs et recherche',
    module: 'Module 8',
    goal: "Squelette de chargement, <Suspense>, error.tsx et recherche par l'URL.",
  },
  {
    slug: '11-server-actions',
    title: 'Server Actions et cache',
    module: 'Module 9',
    goal: 'Ajouter un avis avec une Server Action validée par Zod, puis invalider le cache.',
  },
  {
    slug: '12-route-handlers',
    title: 'Route Handlers (bonus)',
    module: 'Module 10',
    goal: 'Exposer une API JSON /api/livres avec filtres et détail.',
  },
] as const
