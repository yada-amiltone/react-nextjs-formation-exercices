// import Form from 'next/form'
// import { GENRES } from '@/lib/books'

type SearchFormProps = {
  defaultQuery: string
  defaultGenre: string
}

// TODO (étape 4) : formulaire de recherche piloté par l'URL.
//   1. Utiliser <Form action="/exercices/10-streaming-recherche"> de 'next/form'
//      (méthode GET : les champs deviennent des paramètres d'URL).
//   2. Un <input name="q" type="search" defaultValue={defaultQuery} />.
//   3. Un <select name="genre" defaultValue={defaultGenre}> avec une option
//      vide « Tous les genres » puis une option par élément de GENRES.
//   4. Un bouton « Rechercher ».
export function SearchForm(_props: SearchFormProps) {
  return <p className="todo">TODO : formulaire de recherche (voir _components/SearchForm.tsx).</p>
}
