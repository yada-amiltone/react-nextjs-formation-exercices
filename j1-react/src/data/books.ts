import type { Book, Genre } from '../types';

export const GENRES: Genre[] = ['Roman', 'Science-fiction', 'Policier', 'Essai', 'Fantasy', 'BD'];

export const BOOKS: Book[] = [
  { id: 'b1', title: "L'Étranger", author: 'Albert Camus', year: 1942, genre: 'Roman', summary: "Meursault, employé algérois indifférent à tout, commet un meurtre sous le soleil.", available: true, rating: 4.4, coverColor: '#e9c46a' },
  { id: 'b2', title: 'Dune', author: 'Frank Herbert', year: 1965, genre: 'Science-fiction', summary: "Sur la planète désertique Arrakis, Paul Atréides affronte complots et prophéties.", available: false, rating: 4.7, coverColor: '#f4a261' },
  { id: 'b3', title: "Le Crime de l'Orient-Express", author: 'Agatha Christie', year: 1934, genre: 'Policier', summary: "Hercule Poirot enquête sur un meurtre dans un train bloqué par la neige.", available: true, rating: 4.5, coverColor: '#264653' },
  { id: 'b4', title: 'Sapiens', author: 'Yuval Noah Harari', year: 2011, genre: 'Essai', summary: "Une brève histoire de l'humanité, de la révolution cognitive à nos jours.", available: true, rating: 4.3, coverColor: '#2a9d8f' },
  { id: 'b5', title: 'Le Seigneur des Anneaux', author: 'J. R. R. Tolkien', year: 1954, genre: 'Fantasy', summary: "Frodon doit détruire l'Anneau unique avant que Sauron ne le retrouve.", available: true, rating: 4.9, coverColor: '#606c38' },
  { id: 'b6', title: 'Astérix le Gaulois', author: 'René Goscinny', year: 1961, genre: 'BD', summary: "Un village d'irréductibles Gaulois résiste encore et toujours à l'envahisseur.", available: false, rating: 4.2, coverColor: '#e63946' },
  { id: 'b7', title: 'Fondation', author: 'Isaac Asimov', year: 1951, genre: 'Science-fiction', summary: "Hari Seldon prédit la chute de l'Empire galactique et prépare la suite.", available: true, rating: 4.6, coverColor: '#457b9d' },
  { id: 'b8', title: 'Madame Bovary', author: 'Gustave Flaubert', year: 1857, genre: 'Roman', summary: "Emma rêve d'une vie romanesque loin de l'ennui de la province normande.", available: true, rating: 3.9, coverColor: '#b5838d' },
  { id: 'b9', title: 'Millénium', author: 'Stieg Larsson', year: 2005, genre: 'Policier', summary: "Un journaliste et une hackeuse enquêtent sur une disparition vieille de 40 ans.", available: false, rating: 4.4, coverColor: '#1d3557' },
  { id: 'b10', title: 'Le Deuxième Sexe', author: 'Simone de Beauvoir', year: 1949, genre: 'Essai', summary: "Une analyse fondatrice de la condition des femmes.", available: true, rating: 4.1, coverColor: '#9d4edd' },
  { id: 'b11', title: 'Le Hobbit', author: 'J. R. R. Tolkien', year: 1937, genre: 'Fantasy', summary: "Bilbon quitte son trou confortable pour une aventure avec treize nains.", available: true, rating: 4.6, coverColor: '#bc6c25' },
  { id: 'b12', title: 'Blacksad', author: 'Juan Díaz Canales', year: 2000, genre: 'BD', summary: "Un détective chat noir enquête dans une Amérique des années 50.", available: true, rating: 4.5, coverColor: '#343a40' },
];
