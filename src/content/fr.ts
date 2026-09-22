import type { SiteContent } from "./types";

export const fr: SiteContent = {
  coverSpread: {
    plateLabel: "PLANCHE 01, COUVERTURE",
    titleBefore: "J'apprends en construisant, quitte à",
    titleEm: "me tromper",
    titleAfter: "pour mieux recommencer.",
    role: "Software Engineer de formation, aujourd'hui orienté cloud, DevOps et sécurité.",
    hint: "scrolle pour tourner la page",
    bio: "Je viens du génie logiciel. J'ai commencé par apprendre à construire des applications, puis j'ai voulu comprendre ce qui se passe derrière elles : comment elles sont déployées, comment elles communiquent, comment elles évoluent, et surtout comment les rendre plus sûres. C'est ce qui m'a mené vers le cloud, l'automatisation et la sécurité. Je n'ai pas suivi une ligne parfaitement droite pour y arriver. J'apprends en construisant, en testant, en me trompant, puis en recommençant. Certains projets fonctionnent du premier coup, d'autres m'obligent à passer des heures à comprendre pourquoi quelque chose casse, et c'est justement cette partie qui m'intéresse le plus. Ce portfolio rassemble ces expérimentations : projets terminés, labs, architectures, certifications, et tout ce que je suis encore en train d'apprendre. Pas un parcours terminé. Une construction en cours.",
    noteLine1: "première version.",
    noteLine2: "ça fonctionne.",
    noteLine3: "mais je sais déjà ce que je veux améliorer.",
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
  outils: {
    title: "Trousse à outils",
    subtitle: "encres utilisées",
    tools: [
      { label: "Cloud (AWS)", percent: 82 },
      { label: "Python / Django", percent: 80 },
      { label: "JavaScript / React", percent: 72 },
      { label: "Docker / Kubernetes", percent: 70 },
      { label: "Bash & automatisation", percent: 75 },
    ],
  },
  certifs: {
    title: "Tampons de certification",
    subtitle: "preuves encrées",
    pendingLabel: "en cours",
    items: [
      { name: "AWS re/Start", rotation: -5, pending: false, url: "https://www.credly.com/badges/4c2c9b26-6a69-4f15-9d51-b761ca5f4037/public_url" },
      { name: "AWS Cloud Practitioner", rotation: 4, pending: false, url: "https://www.credly.com/badges/1cec39e6-a25c-4f41-9b0e-01249df5d9a2/public_url" },
      { name: "AWS Solutions Architect Associate", rotation: -3, pending: false, url: "https://www.credly.com/badges/30410551-7099-46b4-842e-0422a7be0abf/public_url" },
      { name: "Fortinet NSE 1", rotation: 6, pending: false, url: "https://www.credly.com/badges/35c58be2-e5e1-46f9-924b-c2b4b01c7ba0/public_url" },
      { name: "Fortinet NSE 2", rotation: -6, pending: false, url: "https://www.credly.com/badges/524361c3-8aaa-47eb-af66-c86ac88ca3c5/public_url" },
      { name: "Oracle OCI Foundations Associate", rotation: 3, pending: false, url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=D9FD8748864A2EC86F12BC4C8129477FE3D7A88E8CF4E4B7F627044E08645EBD" },
      { name: "Docker & Kubernetes", rotation: -5, pending: false, url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/072dd8629ec49d20586ab4586270c6c85fa37392" },
      { name: "Terraform Associate 004", rotation: 4, pending: true, url: null },
      { name: "AWS Security Speciality", rotation: -3, pending: true, url: null },
    ],
  },
  footer: {
    titleLines: ["Parlons d'un", "prochain chapitre"],
    links: [
      { label: "linkedin", href: "https://www.linkedin.com/in/yvan-saf-95787b318/", icon: "linkedin" },
      { label: "medium", href: "https://medium.com/@yvansaf694", icon: "medium" },
      { label: "github", href: "https://github.com/YvanSaf", icon: "github" },
      { label: "dev.to", href: "https://dev.to/yvan_saf_ffc94f53623480b1", icon: "devto" },
      { label: "aws builder", href: "https://builder.aws.com/community/@yvansaf", icon: "aws-builder-center" },
    ],
  },
};