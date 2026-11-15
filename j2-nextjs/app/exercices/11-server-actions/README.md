# Exercice 11 : Server Actions et cache

**Module 9** · environ 45 min · 5 étapes (les 4e et 5e en démo)
Votre version : <http://localhost:3000/exercices/11-server-actions>
Solution : <http://localhost:3000/solutions/11-server-actions>

## Objectif

Permettre aux lecteurs de publier un avis : un formulaire qui appelle
directement une fonction serveur, avec validation et état « en cours », puis
mise en cache des données et invalidation après l'écriture.

## Notions

- **Server Action** : fonction `async` d'un fichier `'use server'`, appelée
  depuis un `<form action={...}>`. Pas de route API, pas de `fetch`.
- `useActionState(action, étatInitial)` → `[state, formAction, pending]`.
- Validation côté serveur avec **Zod** (`safeParse`, `z.flattenError`).
- `refresh()` : ré-affiche la page courante avec des données fraîches.
- `'use cache'` + `cacheLife` + `cacheTag` : mettre une fonction de données en cache.
- `updateTag(tag)` : vider ce cache depuis une Server Action.

## Fichiers

```
app/exercices/11-server-actions/
├── page.tsx                     ← fourni (liste des livres)
├── [id]/page.tsx                ← fourni (détail + formulaire)
├── _components/ReviewForm.tsx   ← étapes 1 et 3
├── actions.ts                   ← étapes 2, 3 et 5
└── _lib/data.ts                 ← étape 4
```

Ouvrez un livre, par exemple <http://localhost:3000/exercices/11-server-actions/fondation>.

## Étapes

### Étape 1 : Brancher le formulaire

- Dans `ReviewForm.tsx` : `const [state, action, pending] = useActionState(addReviewAction, initialState)`.
- Passez `action` à `<form action={action}>`, affichez `state.message`, désactivez le bouton pendant `pending`.

**Ce que vous devez voir :** à l'envoi, le message « TODO : action pas encore implémentée » ;
dans le terminal de `npm run dev`, l'appel de `addReviewAction` est journalisé.

### Étape 2 : Enregistrer l'avis

- Dans `actions.ts`, lisez les champs avec `formData.get(...)`, appelez `addReview(...)`,
  renvoyez `{ status: 'success', message: 'Merci...' }`.
- Publiez un avis : il n'apparaît qu'après F5. Ajoutez `refresh()` (de `next/cache`) après `addReview`.

**Ce que vous devez voir :** l'avis apparaît immédiatement en bas de la liste, et le compteur « Avis des lecteurs (n) » augmente.

### Étape 3 : Valider avec Zod

- Dans `actions.ts`, ajoutez un schéma : nom ≥ 2 caractères, note entière de 1 à 5, avis de 10 à 500 caractères.
- En cas d'erreur, renvoyez `errors` et `values` ; dans `ReviewForm`, affichez l'erreur sous chaque champ
  et remettez les valeurs saisies avec `defaultValue`.

**Ce que vous devez voir :** un nom d'une lettre affiche un message sous le champ, et le texte saisi est conservé.

### Étape 4 : Mettre en cache

> Pendant la formation, cette étape est montrée en démo par le formateur. Refaites-la seul quand vous voulez.

- Dans `_lib/data.ts`, ajoutez `'use cache'`, `cacheLife('hours')` et `cacheTag(bookTag(id))`.
- Publiez un avis.

**Ce que vous devez voir :** l'avis **n'apparaît plus**, même avec F5 : `refresh()` ne vide pas le cache.

### Étape 5 : Invalider avec updateTag

> Pendant la formation, cette étape est montrée en démo par le formateur. Refaites-la seul quand vous voulez.

- Dans `actions.ts`, remplacez `refresh()` par `updateTag(bookTag(bookId))`.

**Ce que vous devez voir :** l'avis réapparaît immédiatement après l'envoi.

## Perdu ? Repartez d'une étape

```bash
npm run reprendre -- 11 3   # votre exercice devient « fin de l'étape 3 »
```

Votre version actuelle est sauvegardée dans `.sauvegardes/`. Rechargez la page (F5) ensuite.

## Vérifier

Comparez à l'œil avec la solution : bouton « Envoi en cours... », erreurs sous les
champs, avis visible tout de suite.

## Indices

<details>
<summary>useActionState</summary>

```tsx
const [state, action, pending] = useActionState(addReviewAction, initialState)

return (
  <form action={action}>
    {/* ... */}
    <button disabled={pending}>{pending ? 'Envoi en cours...' : 'Publier mon avis'}</button>
  </form>
)
```
</details>

<details>
<summary>Schéma Zod</summary>

```ts
const ReviewSchema = z.object({
  bookId: z.string().min(1),
  author: z.string().trim().min(2, 'Votre nom doit contenir au moins 2 caractères.'),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().min(10).max(500),
})

const result = ReviewSchema.safeParse(raw)
if (!result.success) {
  return {
    status: 'error',
    message: 'Le formulaire contient des erreurs.',
    errors: z.flattenError(result.error).fieldErrors,
    values: { author: raw.author, rating: raw.rating, comment: raw.comment },
  }
}
```
</details>

<details>
<summary>La fonction mise en cache</summary>

```ts
export async function getBookWithReviews(id: string) {
  'use cache'
  cacheLife('hours')
  cacheTag(bookTag(id))
  return getBook(id)
}
```
</details>

## Quelle fonction pour rafraîchir ?

| API | Où | Effet |
|---|---|---|
| `refresh()` | Server Action | Ré-affiche la page, **sans** vider le cache |
| `updateTag(tag)` | Server Action | Vide tout de suite les entrées de ce tag : l'auteur voit sa modification |
| `revalidateTag(tag, 'max')` | Action ou Route Handler | L'ancienne version reste servie pendant la mise à jour |
| `revalidatePath(path)` | Action ou Route Handler | Invalide toute une route, moins précis qu'un tag |

## Bon à savoir

- La « base de données » est en mémoire : les avis disparaissent au redémarrage de `npm run dev`.
- Une Server Action est un endpoint HTTP public : validez **toujours** les données
  et vérifiez les droits de l'utilisateur dans l'action.
