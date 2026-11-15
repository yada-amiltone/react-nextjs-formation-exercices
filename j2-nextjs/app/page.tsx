import Link from 'next/link'
import { EXERCISES } from '@/lib/exercises'

export default function Home() {
  return (
    <>
      <h1>Exercices du jour 2 : Next.js</h1>
      <p>
        Chaque exercice se fait <strong>étape par étape</strong>, en même temps
        que le formateur. Les consignes sont dans le fichier{' '}
        <code>README.md</code> du dossier <code>app/exercices/&lt;exercice&gt;/</code>.
      </p>
      <p>
        Perdu ? Repartez de la fin de n&apos;importe quelle étape :{' '}
        <code>npm run reprendre -- 10 2</code> (exercice 10, fin de l&apos;étape 2).
      </p>
      <table className="exercises">
        <thead>
          <tr>
            <th>Exercice</th>
            <th>Objectif</th>
            <th>Liens</th>
          </tr>
        </thead>
        <tbody>
          {EXERCISES.map((exercise) => (
            <tr key={exercise.slug}>
              <td>
                <strong>{exercise.slug.slice(0, 2)}</strong> · {exercise.title}
                <br />
                <span className="muted">{exercise.module}</span>
              </td>
              <td>{exercise.goal}</td>
              <td>
                <Link href={`/exercices/${exercise.slug}`}>Mon exercice</Link>
                {' · '}
                <Link href={`/solutions/${exercise.slug}`}>Solution</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
