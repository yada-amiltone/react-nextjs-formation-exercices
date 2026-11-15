'use client'

import { useActionState } from 'react'
import { addReviewAction, type ReviewFormState } from '../actions'

const initialState: ReviewFormState = { status: 'idle' }

export function ReviewForm({ bookId }: { bookId: string }) {
  // state   : dernier état renvoyé par l'action (erreurs, message...)
  // action  : à passer à <form action={...}>
  // pending : true pendant l'exécution de l'action sur le serveur
  const [state, action, pending] = useActionState(addReviewAction, initialState)

  return (
    <form action={action} className="stacked">
      <input type="hidden" name="bookId" value={bookId} />

      <label>
        Votre nom
        <input name="author" defaultValue={state.values?.author} />
        {state.errors?.author && <span className="field-error">{state.errors.author[0]}</span>}
      </label>

      <label>
        Note
        <select name="rating" defaultValue={state.values?.rating ?? '5'}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {'★'.repeat(n)} ({n}/5)
            </option>
          ))}
        </select>
        {state.errors?.rating && <span className="field-error">{state.errors.rating[0]}</span>}
      </label>

      <label>
        Votre avis
        <textarea name="comment" rows={4} defaultValue={state.values?.comment} />
        {state.errors?.comment && <span className="field-error">{state.errors.comment[0]}</span>}
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
