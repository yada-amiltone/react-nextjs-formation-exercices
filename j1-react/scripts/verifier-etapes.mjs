#!/usr/bin/env node
// Maintenance (formateur) : vérifie que chaque étape de chaque exercice compile.
// Pour K = 0, 1, 2… : applique l'étape K de tous les exercices (ou leur dernière étape),
// lance le typecheck, puis restaure les copies de travail telles qu'elles étaient.
//   npm run verifier-etapes
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).formation;
const etapesDir = join(root, 'etapes');
const exercicesDir = join(root, cfg.exercices);
const exos = readdirSync(etapesDir).filter((d) => /^\d\d-/.test(d)).sort();
const steps = Object.fromEntries(exos.map((e) => [e, readdirSync(join(etapesDir, e))
  .filter((d) => /^etape-\d+$/.test(d)).map((d) => Number(d.slice(6))).sort((a, b) => a - b)]));
const max = Math.max(...Object.values(steps).map((s) => s.at(-1)));

function apply(exo, k) {
  const cible = join(exercicesDir, exo);
  for (const f of readdirSync(cible)) if (f !== 'README.md') rmSync(join(cible, f), { recursive: true, force: true });
  cpSync(join(etapesDir, exo, `etape-${k}`), cible, { recursive: true });
}

// sauvegarde des copies de travail
const backup = mkdtempSync(join(tmpdir(), 'verifier-etapes-'));
for (const exo of exos) if (existsSync(join(exercicesDir, exo))) cpSync(join(exercicesDir, exo), join(backup, exo), { recursive: true });

let ok = true;
try {
  for (let k = 0; k <= max; k++) {
    for (const exo of exos) apply(exo, Math.min(k, steps[exo].at(-1)));
    try {
      execSync('npx tsc -b --force', { cwd: root, stdio: 'pipe' });
      console.log(`étape ${k} : OK`);
    } catch (e) {
      ok = false;
      console.error(`étape ${k} : ÉCHEC\n${e.stdout?.toString() ?? ''}${e.stderr?.toString() ?? ''}`);
    }
  }
} finally {
  for (const exo of exos) {
    rmSync(join(exercicesDir, exo), { recursive: true, force: true });
    if (existsSync(join(backup, exo))) cpSync(join(backup, exo), join(exercicesDir, exo), { recursive: true });
  }
  rmSync(backup, { recursive: true, force: true });
}
// la dernière étape doit être identique à la solution (au nom du composant près)
for (const exo of exos) {
  const last = readFileSync(join(etapesDir, exo, `etape-${steps[exo].at(-1)}`, 'Exercice.tsx'), 'utf8');
  const sol = join(root, 'src', 'solutions', exo, 'Solution.tsx');
  if (existsSync(sol) && last.replace('function Exercice()', 'function Solution()') !== readFileSync(sol, 'utf8')) {
    ok = false;
    console.error(`${exo} : la dernière étape diffère de src/solutions/${exo}/Solution.tsx`);
  }
  // exercice 00 : le travail se fait dans logique.ts, comparé tel quel à la solution
  const logique = join(etapesDir, exo, `etape-${steps[exo].at(-1)}`, 'logique.ts');
  const solLogique = join(root, 'src', 'solutions', exo, 'logique.ts');
  if (existsSync(logique) && readFileSync(logique, 'utf8') !== readFileSync(solLogique, 'utf8')) {
    ok = false;
    console.error(`${exo} : la dernière étape diffère de src/solutions/${exo}/logique.ts`);
  }
}
console.log(ok ? 'Toutes les étapes compilent.' : 'Des étapes ne compilent pas.');
process.exit(ok ? 0 : 1);
