import { BOOKS } from "../data/books";
import type { Book } from "../types";

export type FetchOptions = {
  /** latence simulée en ms (800 par défaut) */
  delay?: number;
  /** true = l'appel échoue (pour tester l'affichage d'erreur) */
  fail?: boolean;
  /** pour annuler la requête (cleanup d'un useEffect) */
  signal?: AbortSignal;
};

/** Lit ?fail=1 dans l'URL du navigateur : pratique pour simuler une panne à la main. */
export function shouldFailFromUrl(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.toString().includes("?fail=1");
}

/**
 * API simulée : se comporte comme un `fetch('/api/books').then(r => r.json())`.
 * Retourne une copie des livres après `delay` ms, ou rejette une erreur si `fail` vaut true.
 */
export function fetchBooks({
  delay = 800,
  fail = shouldFailFromUrl(),
  signal,
}: FetchOptions = {}): Promise<Book[]> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (fail)
        reject(
          new Error(
            "Le serveur de la bibliothèque ne répond pas (erreur simulée).",
          ),
        );
      else resolve(BOOKS.map((b) => ({ ...b })));
    }, delay);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Requête annulée", "AbortError"));
    });
  });
}
