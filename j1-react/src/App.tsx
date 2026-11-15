import { useEffect, useState } from 'react';
import { EXERCISES } from './registry';

type View = 'exercice' | 'solution';

/** Lit l'URL : #/03/solution -> { id: '03', view: 'solution' } */
function readHash(): { id: string; view: View } {
  const [, id = '00', view = 'exercice'] = window.location.hash.split('/');
  return { id, view: view === 'solution' ? 'solution' : 'exercice' };
}

export default function App() {
  const [route, setRoute] = useState(readHash);

  // Synchronise l'état avec l'URL (bouton « précédent » du navigateur, lien partagé…)
  useEffect(() => {
    const onHashChange = () => setRoute(readHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const current = EXERCISES.find((e) => e.id === route.id) ?? EXERCISES[0];
  const Component = route.view === 'solution' ? current.Solution : current.Exercice;

  return (
    <div className="layout">
      <nav className="sidebar">
        <p className="sidebar-title">Formation React · Jour 1</p>
        <ol>
          {EXERCISES.map((ex) => (
            <li key={ex.id}>
              <a href={`#/${ex.id}/${route.view}`} aria-current={ex.id === current.id ? 'page' : undefined}>
                <span className="num">{ex.id}</span> {ex.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <main className="content">
        <div className="toolbar">
          <div>
            <p className="eyebrow">
              {current.module} · src/exercices/{current.slug}
            </p>
            <h1 className="ex-title">{current.title}</h1>
          </div>
          <div className="toggle" role="group" aria-label="Version affichée">
            <a href={`#/${current.id}/exercice`} aria-pressed={route.view === 'exercice'}>
              Mon exercice
            </a>
            <a href={`#/${current.id}/solution`} aria-pressed={route.view === 'solution'}>
              Solution
            </a>
          </div>
        </div>
        <div className={`stage stage-${route.view}`}>
          {/* key : force un composant neuf (état réinitialisé) quand on change de vue */}
          <Component key={`${current.id}-${route.view}`} />
        </div>
      </main>
    </div>
  );
}
