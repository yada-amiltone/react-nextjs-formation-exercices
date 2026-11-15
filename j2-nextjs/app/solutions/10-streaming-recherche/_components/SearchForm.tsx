import Form from 'next/form'
import { GENRES } from '@/lib/books'

type SearchFormProps = {
  defaultQuery: string
  defaultGenre: string
}

// <Form> de next/form : un <form> HTML en GET, enrichi par Next.js.
// À l'envoi, les champs deviennent des paramètres d'URL (?q=dune&genre=...)
// et Next.js fait une navigation côté client (pas de rechargement complet).
export function SearchForm({ defaultQuery, defaultGenre }: SearchFormProps) {
  return (
    <Form action="/solutions/10-streaming-recherche" className="inline" role="search">
      <input
        name="q"
        type="search"
        placeholder="Titre ou auteur"
        aria-label="Titre ou auteur"
        defaultValue={defaultQuery}
      />
      <select name="genre" aria-label="Genre" defaultValue={defaultGenre}>
        <option value="">Tous les genres</option>
        {GENRES.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <button type="submit" className="btn">
        Rechercher
      </button>
    </Form>
  )
}
