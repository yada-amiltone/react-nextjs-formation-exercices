'use client'

// import { useActionState } from 'react'
// import { addReviewAction, type ReviewFormState } from '../actions'

// const initialState: ReviewFormState = { status: 'idle' }

// TODO (étape 1) : brancher le formulaire sur la Server Action.
//   1. const [state, action, pending] = useActionState(addReviewAction, initialState)
//   2. <form action={action}> : pas de onSubmit, pas de fetch, pas de preventDefault.
//   3. Désactiver le bouton quand `pending` vaut true ; afficher state.message.
//   4. (étape 3) Afficher sous chaque champ l'erreur state.errors?.author?.[0], etc.
//      et remettre les valeurs saisies avec defaultValue={state.values?.author}.
export function ReviewForm({ bookId }: { bookId: string }) {
  return (
    <form className="stacked">
      <input type="hidden" name="bookId" value={bookId} />

      <label>
        Votre nom
        <input name="author" />
      </label>

      <label>
        Note
        <select name="rating" defaultValue="5">
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {'★'.repeat(n)} ({n}/5)
            </option>
          ))}
        </select>
      </label>

      <label>
        Votre avis
        <textarea name="comment" rows={4} />
      </label>

      <button type="submit" className="btn">
        Publier mon avis
      </button>
    </form>
  )
}
