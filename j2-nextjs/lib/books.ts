// Données de démonstration de la Bibliothèque (identiques pour tous les exercices).

export type Genre =
  | 'Roman'
  | 'Science-fiction'
  | 'Fantasy'
  | 'Policier'
  | 'Essai'
  | 'Jeunesse'

export const GENRES: Genre[] = [
  'Roman',
  'Science-fiction',
  'Fantasy',
  'Policier',
  'Essai',
  'Jeunesse',
]

export type Review = {
  id: string
  author: string
  rating: number // de 1 à 5
  comment: string
  createdAt: string // date ISO
}

export type Book = {
  id: string // slug utilisé dans l'URL : /livres/dune
  title: string
  author: string
  year: number
  genre: Genre
  pages: number
  available: boolean
  summary: string
  reviews: Review[]
}

export const BOOKS: Book[] = [
  {
    id: 'le-petit-prince',
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
    genre: 'Jeunesse',
    pages: 96,
    available: true,
    summary:
      "Un aviateur en panne dans le désert rencontre un petit garçon venu d'une autre planète.",
    reviews: [
      { id: 'r1', author: 'Camille', rating: 5, comment: 'Un classique à relire à tout âge.', createdAt: '2026-09-02T10:00:00.000Z' },
      { id: 'r2', author: 'Hugo', rating: 4, comment: "Plus profond qu'il n'y paraît.", createdAt: '2026-09-15T14:30:00.000Z' },
    ],
  },
  {
    id: '1984',
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    genre: 'Science-fiction',
    pages: 376,
    available: false,
    summary:
      'Winston Smith travaille au ministère de la Vérité dans un État qui surveille chaque pensée.',
    reviews: [
      { id: 'r3', author: 'Nora', rating: 5, comment: 'Glaçant et toujours actuel.', createdAt: '2026-08-21T09:00:00.000Z' },
    ],
  },
  {
    id: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    year: 1965,
    genre: 'Science-fiction',
    pages: 832,
    available: true,
    summary:
      "Sur la planète désertique Arrakis, Paul Atréides affronte les intrigues autour de l'Épice.",
    reviews: [
      { id: 'r4', author: 'Lucas', rating: 5, comment: "Un monde d'une richesse incroyable.", createdAt: '2026-07-11T18:00:00.000Z' },
      { id: 'r5', author: 'Inès', rating: 3, comment: 'Un début un peu lent, puis captivant.', createdAt: '2026-10-01T08:15:00.000Z' },
    ],
  },
  {
    id: 'fondation',
    title: 'Fondation',
    author: 'Isaac Asimov',
    year: 1951,
    genre: 'Science-fiction',
    pages: 416,
    available: true,
    summary:
      "Le mathématicien Hari Seldon prédit la chute de l'Empire galactique et prépare la suite.",
    reviews: [],
  },
  {
    id: 'l-etranger',
    title: "L'Étranger",
    author: 'Albert Camus',
    year: 1942,
    genre: 'Roman',
    pages: 184,
    available: true,
    summary:
      'Meursault, employé de bureau à Alger, assiste aux événements de sa vie avec indifférence.',
    reviews: [
      { id: 'r6', author: 'Yanis', rating: 4, comment: 'Court, sec et marquant.', createdAt: '2026-06-30T12:00:00.000Z' },
    ],
  },
  {
    id: 'les-miserables',
    title: 'Les Misérables',
    author: 'Victor Hugo',
    year: 1862,
    genre: 'Roman',
    pages: 1900,
    available: false,
    summary:
      'Le destin de Jean Valjean, ancien forçat, dans la France du XIXe siècle.',
    reviews: [
      { id: 'r7', author: 'Emma', rating: 5, comment: 'Monumental, chaque personnage est inoubliable.', createdAt: '2026-05-04T16:45:00.000Z' },
    ],
  },
  {
    id: 'madame-bovary',
    title: 'Madame Bovary',
    author: 'Gustave Flaubert',
    year: 1857,
    genre: 'Roman',
    pages: 480,
    available: true,
    summary:
      "Emma Bovary rêve d'une vie romanesque loin de l'ennui de la province normande.",
    reviews: [],
  },
  {
    id: 'le-seigneur-des-anneaux',
    title: 'Le Seigneur des anneaux',
    author: 'J. R. R. Tolkien',
    year: 1954,
    genre: 'Fantasy',
    pages: 1216,
    available: true,
    summary:
      "Frodon doit détruire l'Anneau unique avant que Sauron ne le retrouve.",
    reviews: [
      { id: 'r8', author: 'Léa', rating: 5, comment: "L'œuvre fondatrice de la fantasy.", createdAt: '2026-04-18T11:20:00.000Z' },
    ],
  },
  {
    id: 'bilbo-le-hobbit',
    title: 'Bilbo le Hobbit',
    author: 'J. R. R. Tolkien',
    year: 1937,
    genre: 'Fantasy',
    pages: 400,
    available: false,
    summary:
      'Bilbon Sacquet quitte son confortable terrier pour aider des nains à reprendre leur trésor.',
    reviews: [],
  },
  {
    id: 'le-meurtre-de-roger-ackroyd',
    title: 'Le Meurtre de Roger Ackroyd',
    author: 'Agatha Christie',
    year: 1926,
    genre: 'Policier',
    pages: 320,
    available: true,
    summary:
      "Hercule Poirot enquête sur la mort d'un riche industriel dans un paisible village anglais.",
    reviews: [
      { id: 'r9', author: 'Paul', rating: 4, comment: "Une fin que je n'avais pas vue venir.", createdAt: '2026-03-09T20:00:00.000Z' },
    ],
  },
  {
    id: 'le-chien-des-baskerville',
    title: 'Le Chien des Baskerville',
    author: 'Arthur Conan Doyle',
    year: 1902,
    genre: 'Policier',
    pages: 256,
    available: true,
    summary:
      'Sherlock Holmes et le docteur Watson affrontent une légende de chien maudit dans la lande.',
    reviews: [],
  },
  {
    id: 'sapiens',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    year: 2011,
    genre: 'Essai',
    pages: 512,
    available: true,
    summary:
      "Une brève histoire de l'humanité, de la révolution cognitive à nos jours.",
    reviews: [
      { id: 'r10', author: 'Sarah', rating: 3, comment: 'Stimulant, même si parfois rapide.', createdAt: '2026-02-14T13:00:00.000Z' },
    ],
  },
]
