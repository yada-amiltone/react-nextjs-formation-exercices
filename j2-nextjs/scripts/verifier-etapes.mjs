#!/usr/bin/env node
// Maintenance (formateur) : vérifie que chaque étape de chaque exercice compile.
//   npm run verifier-etapes            typecheck + lint de chaque étape
//   npm run verifier-etapes -- --build ajoute un `next build` par étape (plus long)
// Les exercices étant indépendants, l'étape K de tous les exercices est vérifiée
// en une seule passe (un exercice qui a moins d'étapes reste sur sa dernière).
// La copie de travail (app/exercices) est sauvegardée puis restaurée à la fin.
import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const cfg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).formation
const exercicesDir = join(root, cfg.exercices)
const etapesDir = join(root, 'etapes')
const build = process.argv.includes('--build')

const exos = readdirSync(etapesDir).filter((d) => /^\d\d-/.test(d)).sort()
const steps = Object.fromEntries(exos.map((e) => [e, readdirSync(join(etapesDir, e))
  .filter((d) => /^etape-\d+$/.test(d)).map((d) => Number(d.slice(6))).sort((a, b) => a - b)]))
const maxStep = Math.max(...Object.values(steps).map((s) => s.at(-1)))

const backup = mkdtempSync(join(tmpdir(), 'exercices-'))
cpSync(exercicesDir, backup, { recursive: true })

function apply(exo, k) {
  const cible = join(exercicesDir, exo)
  for (const f of readdirSync(cible)) if (f !== 'README.md') rmSync(join(cible, f), { recursive: true, force: true })
  cpSync(join(etapesDir, exo, `etape-${k}`), cible, { recursive: true })
}

const run = (cmd) => execSync(cmd, { cwd: root, stdio: 'pipe', encoding: 'utf8' })
const failures = []
try {
  for (let k = 0; k <= maxStep; k++) {
    const applied = exos.map((e) => {
      const s = steps[e].includes(k) ? k : steps[e].at(-1)
      apply(e, s)
      return `${e.slice(0, 2)}:${s}`
    })
    const before = failures.length
    const label = `étape ${k} (${applied.join(' ')})`
    const cmds = ['npx next typegen', 'npx tsc --noEmit', 'npx eslint app/exercices --max-warnings=0']
    if (build) cmds.push('npx next build')
    for (const cmd of cmds) {
      try {
        run(cmd)
      } catch (err) {
        failures.push(`${label} : ${cmd}\n${(err.stdout ?? '') + (err.stderr ?? '')}`)
      }
    }
    console.log(`${failures.length > before ? '✗' : '✓'} ${label}`)
  }
} finally {
  rmSync(exercicesDir, { recursive: true, force: true })
  cpSync(backup, exercicesDir, { recursive: true })
  rmSync(backup, { recursive: true, force: true })
}

if (failures.length) {
  console.error('\n' + failures.join('\n\n'))
  process.exit(1)
}
console.log('Toutes les étapes compilent.')
