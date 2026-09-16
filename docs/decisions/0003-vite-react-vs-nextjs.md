# 0003. Vite + React, plutôt que Next.js

## Contexte

Le site est une page unique en scroll continu (pas de routes multiples,
pas d'authentification, pas de données à récupérer côté serveur), fait
pour être hébergé en fichiers statiques sur S3 + CloudFront.

## Décision

Utiliser **Vite + React** en mode SPA statique, plutôt que Next.js.

## Pourquoi pas Next.js (le choix par défaut le plus courant en 2025 pour un projet React) ?

- **Pas de besoin de SSR ou de routing serveur** : une seule page, un
  seul scroll, le principal argument de vente de Next.js (rendu côté
  serveur, routes basées sur le système de fichiers) ne s'applique pas
  ici.
- **Le site est fondamentalement "client-side intensif"** : GSAP,
  ScrollTrigger, canvas, curseur custom, Web Audio, tout ça n'a de sens
  que dans le navigateur. Avec l'App Router de Next.js, ce genre de code
  doit être marqué `'use client'` systématiquement, avec des risques de
  mismatch d'hydratation (le rendu serveur et le rendu client ne
  correspondent pas exactement) qui n'existent tout simplement pas avec
  une SPA Vite pure.
- **Déploiement plus simple** : Vite produit un dossier `dist/` de
  fichiers statiques prêts à synchroniser sur S3. Next.js, utilisé
  pleinement (SSR), demanderait un serveur Node.js qui tourne en
  permanence, donc pas compatible avec de l'hébergement S3 statique
  sans passer par des adaptateurs supplémentaires.

## Conséquences / compromis acceptés

- Pas de SSR : si le SEO devenait critique (peu probable pour un
  portfolio personnel), il faudrait revoir ce choix. Les balises meta/OG
  statiques dans `index.html` suffisent largement pour ce cas d'usage.
- Pas de routing basé fichiers : non nécessaire ici, une seule page.
