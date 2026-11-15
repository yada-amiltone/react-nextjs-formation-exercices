#!/usr/bin/env node
// Repartir de la fin d'une étape d'un exercice.
//   npm run reprendre -- 03        liste les étapes de l'exercice 03
//   npm run reprendre -- 03 2      remplace votre exercice 03 par l'état « fin de l'étape 2 »
//   npm run reprendre -- 03 0      revient au point de départ
// Votre travail actuel est d'abord sauvegardé dans .sauvegardes/ (jamais perdu).
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
// "formation": { "exercices": "src/exercices" } dans package.json : dossier de travail des stagiaires
const cfg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).formation;
const etapesDir = join(root, "etapes");
const exercicesDir = join(root, cfg.exercices);
const GARDER = new Set(["README.md"]);

const [num, etape] = process.argv.slice(2);
const exos = readdirSync(etapesDir).filter((d) => /^\d\d-/.test(d)).sort();
if (!num) {
  console.log("Usage : npm run reprendre -- <numéro d'exercice> [étape]\nExercices :\n" + exos.map((e) => "  " + e).join("\n"));
  process.exit(0);
}
const exo = exos.find((e) => e.startsWith(num.padStart(2, "0") + "-"));
if (!exo) {
  console.error(`Exercice « ${num} » introuvable. Exercices : ${exos.join(", ")}`);
  process.exit(1);
}
const steps = readdirSync(join(etapesDir, exo)).filter((d) => /^etape-\d+$/.test(d))
  .map((d) => Number(d.slice(6))).sort((a, b) => a - b);
if (etape === undefined) {
  console.log(`${exo} : étapes ${steps.join(", ")} (0 = point de départ, ${steps.at(-1)} = exercice terminé).`);
  console.log(`Exemple : npm run reprendre -- ${num} ${steps[1] ?? 0}`);
  process.exit(0);
}
const k = Number(etape);
if (!steps.includes(k)) {
  console.error(`Étape « ${etape} » introuvable pour ${exo}. Étapes : ${steps.join(", ")}`);
  process.exit(1);
}

const cible = join(exercicesDir, exo);
if (existsSync(cible)) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 23);
  const backup = join(root, ".sauvegardes", exo, stamp);
  mkdirSync(backup, { recursive: true });
  cpSync(cible, backup, { recursive: true });
  for (const f of readdirSync(cible)) if (!GARDER.has(f)) rmSync(join(cible, f), { recursive: true, force: true });
  console.log(`Votre version actuelle est sauvegardée dans ${join(".sauvegardes", exo, stamp)}`);
}
cpSync(join(etapesDir, exo, `etape-${k}`), cible, { recursive: true });
console.log(`${exo} : vous repartez de la fin de l'étape ${k}${k === 0 ? " (point de départ)" : ""}.`);
