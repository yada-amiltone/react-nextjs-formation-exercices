'use client'

import { useActionState } from 'react'
import { addReviewAction, type ReviewFormState } from '../actions'

const initialState: ReviewFormState = { status: 'idle' }

// TODO (étape 3) : afficher sous chaque champ l'erreur state.errors?.author?.[0], etc.
//   et remettre les valeurs saisies avec defaultValue={state.values?.author}.
export function ReviewForm({ bookId }: { bookId: string }) {
  // state   : dernier état renvoyé par l'action (message, erreurs...)
  // action  : à passer à <form action={...}>
  // pending : true pendant l'exécution de l'action sur le serveur
  const [state, action, pending] = useActionState(addReviewAction, initialState)

  return (
    <form action={action} className="stacked">
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

      {state.message && (
        <p className={`alert ${state.status === 'success' ? 'success' : 'error'}`} aria-live="polite">
          {state.message}
        </p>
      )}

      <button type="submit" className="btn" disabled={pending}>
        {pending ? 'Envoi en cours...' : 'Publier mon avis'}
      </button>
    </form>
  )
}
