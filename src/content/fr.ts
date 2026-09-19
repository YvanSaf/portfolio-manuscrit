export const fr = {
  coverSpread: {
    plateLabel: "PLANCHE 01, COUVERTURE",
    titleBefore: "L'encre",
    titleEm: "s'itère",
    titleAfter: "comme du code",
    role: "Génie logiciel de formation, ingénieur cloud dans l'âme.",
    hint: "scrolle pour tourner la page",
    bio: "Je viens du génie logiciel, mais c'est le cloud qui m'anime aujourd'hui. J'y construis ma carrière, une certification à la fois. Je reste convaincu qu'il vaut mieux avancer avec une base imparfaite que rester figé à attendre d'être « prêt ». Ce portfolio est mon MVP, publié tel quel, pour être itéré, pas peaufiné dans l'ombre jusqu'à un jour qui n'arrive jamais.",
    noteLine1: "premier jet trop sage,",
    noteStrike: "à refaire en plus carré",
    noteLine2: "→ fait.",
  },
  chrome: {
    soundToggleLabel: "Activer le son (désactivé par défaut)",
    sideMarginRight: "Yvan SAF",
  },
  transfo: {
  label: "PLANCHE 02, LE PERSONNAGE PREND VIE",
  caption: "scrolle pour voir le perso prendre vie, trait par trait",
},
planches: {
  title: "Planches récentes",
  counter: "05 cases, encrage en cours",
  annotation: "ce panel respire enfin",
  panels: [
    {
      tag: "case 01 / serverless api",
      title: "Serverless Todo API",
      desc: "API Todo serverless sur Lambda, API Gateway et DynamoDB, en version vulnérable et durcie, avec de vraies attaques comparées entre les deux.",
      url: "https://github.com/YvanSaf/aws-serverless-todo-api",
    },
    {
      tag: "case 02 / lab notebook",
      title: "Tech Labs",
      desc: "Une collection de labs pratiques en cloud, sécurité et réseau, documentés avec les vraies commandes utilisées et les vrais problèmes rencontrés en chemin.",
      url: "https://github.com/YvanSaf/tech-labs",
    },
    {
      tag: "case 03 / infrastructure",
      title: "AWS 3-Tier",
      desc: "Architecture AWS trois tiers, chaque couche isolée, SSM plutôt que SSH.",
      url: "https://github.com/YvanSaf/aws-3tier-architecture",
    },
    {
      tag: "case 04 / ce site",
      title: "Portfolio Manuscrit",
      desc: "Ce site-même : S3 privé, CloudFront, déploiement OIDC sans clé AWS.",
      url: "https://github.com/YvanSaf/portfolio-manuscrit",
    },
  ],
  nextPanel: {
    tag: "case 05 / à venir",
    title: "Prochain projet",
    desc: "Cette case attend son prochain projet.",
  },
  seeAll: {
    tag: "planche complète",
    title: "Voir toutes les planches →",
    desc: "Lien vers les archives, GitHub.",
    url: "https://github.com/YvanSaf",
  },
},
} as const;