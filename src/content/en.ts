import type { SiteContent } from "./types";

export const en: SiteContent = {
  coverSpread: {
    plateLabel: "PAGE 01, COVER",
    titleBefore: "I learn by building, even if it means",
    titleEm: "getting it wrong",
    titleAfter: "before I get it right.",
    role: "Software Engineer by training, now focused on cloud, DevOps and security.",
    hint: "scroll to turn the page",
    bio: "I come from software engineering. I started by learning to build applications, then wanted to understand what happens behind them: how they get deployed, how they communicate, how they evolve, and especially how to make them more secure. That's what led me toward cloud, automation and security. I didn't follow a perfectly straight line to get here. I learn by building, testing, getting things wrong, then starting over. Some projects work on the first try, others take hours to figure out why something breaks, and that part is exactly what interests me most. This portfolio brings together these experiments: finished projects, labs, architectures, certifications, and everything I'm still learning. Not a finished journey. A work in progress.",
    noteLine1: "first draft.",
    noteLine2: "it works.",
    noteLine3: "but I already know what I want to improve.",
  },
  chrome: {
    soundToggleLabel: "Turn sound on (off by default)",
    sideMarginRight: "Yvan SAF",
  },
  transfo: {
    label: "PAGE 02, THE CHARACTER COMES TO LIFE",
    caption: "scroll to watch the character come to life, line by line",
  },
  planches: {
    title: "Recent pages",
    counter: "05 panels, inking in progress",
    annotation: "this panel finally breathes",
    panels: [
      {
        tag: "panel 01 / serverless api",
        title: "Serverless Todo API",
        desc: "Serverless Todo API on Lambda, API Gateway and DynamoDB, deployed in a vulnerable and a hardened version, with real attacks compared between the two.",
        url: "https://github.com/YvanSaf/aws-serverless-todo-api",
      },
      {
        tag: "panel 02 / lab notebook",
        title: "Tech Labs",
        desc: "A collection of hands-on labs in cloud, security and networking, documented with the real commands used and the real problems hit along the way.",
        url: "https://github.com/YvanSaf/tech-labs",
      },
      {
        tag: "panel 03 / infrastructure",
        title: "AWS 3-Tier",
        desc: "Three-tier AWS architecture, each layer isolated, SSM instead of SSH.",
        url: "https://github.com/YvanSaf/aws-3tier-architecture",
      },
      {
        tag: "panel 04 / this site",
        title: "Portfolio Manuscrit",
        desc: "This very site: private S3, CloudFront, OIDC deployment with no AWS key.",
        url: "https://github.com/YvanSaf/portfolio-manuscrit",
      },
    ],
    nextPanel: {
      tag: "panel 05 / coming soon",
      title: "Next project",
      desc: "This panel is waiting for its next project.",
    },
    seeAll: {
      tag: "full page",
      title: "See all pages →",
      desc: "Link to the archives, GitHub.",
      url: "https://github.com/YvanSaf",
    },
  },
  outils: {
    title: "Toolkit",
    subtitle: "inks used",
    tools: [
      { label: "Cloud (AWS)", percent: 82 },
      { label: "Python / Django", percent: 80 },
      { label: "JavaScript / React", percent: 72 },
      { label: "Docker / Kubernetes", percent: 70 },
      { label: "Bash & automation", percent: 75 },
    ],
  },
  certifs: {
    title: "Certification stamps",
    subtitle: "inked proof",
    pendingLabel: "in progress",
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
    titleLines: ["Let's talk about", "the next chapter"],
    links: [
      { label: "linkedin", href: "https://www.linkedin.com/in/yvan-saf-95787b318/", icon: "linkedin" },
      { label: "medium", href: "https://medium.com/@yvansaf694", icon: "medium" },
      { label: "github", href: "https://github.com/YvanSaf", icon: "github" },
      { label: "dev.to", href: "https://dev.to/yvan_saf_ffc94f53623480b1", icon: "devto" },
      { label: "aws builder", href: "https://builder.aws.com/community/@yvansaf", icon: "aws-builder-center" },
    ],
  },
};