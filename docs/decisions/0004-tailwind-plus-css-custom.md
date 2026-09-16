# 0004. Tailwind CSS pour l'essentiel, CSS pur pour les animations sur-mesure

## Contexte

Le site combine une mise en page classique (espacement, typographie,
couleurs, grilles) avec des animations très spécifiques : rotation 3D de
la couverture façon page qui se tourne, tomoe rotatif, curseur custom en
canvas, effet d'encre au survol.

## Décision

**Tailwind CSS** pour l'ensemble de la mise en page et du design system
(couleurs kraft/encre/rouge en thème custom, espacement, typographie),
et un **fichier CSS séparé** (`animations.css`) pour les keyframes et
effets impossibles à exprimer proprement en utilitaires.

## Pourquoi pas l'un des deux exclusivement ?

- **Tout en Tailwind** aurait forcé à écrire des valeurs arbitraires
  (`[transform:rotateY(-150deg)]`) partout pour les animations les plus
  complexes, au-delà d'un certain niveau de complexité, les utilitaires
  perdent leur intérêt (lisibilité, autocomplétion) face à un vrai bloc
  `@keyframes`.
- **Tout en CSS pur** aurait fait perdre la vitesse d'itération de
  Tailwind sur tout ce qui est mise en page basique (90 % du travail
  visuel du site), pour un gain de contrôle qui n'était nécessaire que
  sur une poignée d'éléments.

## Conséquences / compromis acceptés

- Deux systèmes à maintenir en parallèle plutôt qu'un seul, nécessite
  une convention claire : tout ce qui est *layout* passe par des classes
  Tailwind directement dans le JSX, tout ce qui est *animation
  chorégraphiée* passe par des classes ciblées définies dans
  `animations.css`, jamais l'inverse.
- Le thème Tailwind (`tailwind.config.ts`) reprend les tokens exacts du
  site (couleurs, polices) pour que les deux systèmes restent
  visuellement cohérents entre eux.
