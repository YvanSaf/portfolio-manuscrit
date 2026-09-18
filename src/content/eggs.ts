export type EggId = "cover" | "transfo" | "planches" | "outils" | "certifs" | "footer";

export interface EggEntry {
  id: EggId;
  quote: string | null;
  author: string | null;
  note: string;
}

export const eggs: EggEntry[] = [
  {
    id: "cover",
    quote: "Tout ce que je sais, c'est que je ne sais rien.",
    author: "Platon",
    note: "Plus j'apprends, plus la liste de ce qu'il me reste à apprendre s'allonge. Et ça me va très bien, c'est même tout le principe.",
  },
  {
    id: "transfo",
    quote: "Au-delà de mes limites, plus ultra !",
    author: "All Might, My Hero Academia",
    note: "Ce perso à l'écran a été construit planche par planche, jamais parfait du premier coup. C'est exactement le principe : on encre, on rate, on recommence, mais on avance.",
  },
  {
    id: "planches",
    quote: null,
    author: null,
    note: "Ce portfolio n'est pas fini, il ne le sera jamais vraiment. Je préfère publier une base imparfaite et itérer, plutôt qu'attendre un jour hypothétique où je me sentirai « prêt ». Ce jour n'arrive jamais.",
  },
  {
    id: "outils",
    quote: "C'est follement excitant !",
    author: "Senku Ishigami, Dr. Stone",
    note: "Sa phrase préférée, à peu près toutes les cinq minutes. Je m'y reconnais : apprendre un nouvel outil, même en galérant, ça reste la meilleure partie du travail.",
  },
  {
    id: "certifs",
    quote: null,
    author: null,
    note: "Une certif ne prouve jamais qu'on sait tout, juste qu'on a commencé. La AWS SAA encore en pointillés sur cette planche en est la preuve : mieux vaut avancer dessus que d'attendre d'être infaillible.",
  },
  {
    id: "footer",
    quote: null,
    author: null,
    note: "Ce que je veux garder intact face à une IA qui pense de plus en plus à notre place : la capacité à me questionner moi-même. Merci d'avoir fouillé jusqu'ici, si t'es arrivé là, écris-moi.",
  },
];