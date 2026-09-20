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
    note: "Plus j'apprends, plus je me rends compte qu'il me reste encore énormément à apprendre. Au début, ça peut sembler frustrant. Moi, j'ai fini par trouver ça plutôt motivant.",
  },

  {
    id: "transfo",
    quote: "Au-delà des limites, et plus ultra !",
    author: "All Might, My Hero Academia",
    note: "J'aime bien cette idée de toujours essayer d'aller un peu plus loin. Je ne réussis pas tout du premier coup, loin de là. Je teste, je me trompe, je recommence et, petit à petit, ça finit par marcher.",
  },

  {
    id: "planches",
    quote: null,
    author: null,
    note: "Ce portfolio est encore en construction. Comme pas mal de choses que je fais d'ailleurs. Je pourrais attendre qu'il soit parfait avant de le montrer, mais je préfère le faire évoluer au fur et à mesure.",
  },

  {
    id: "outils",
    quote: "C'est follement excitant !",
    author: "Senku Ishigami, Dr. Stone",
    note: "Je comprends un peu trop bien Senku sur ce coup-là. Quand je découvre un nouvel outil et que je commence enfin à comprendre comment il fonctionne, je peux facilement y passer beaucoup trop de temps.",
  },

  {
    id: "certifs",
    quote: null,
    author: null,
    note: "Pour moi, une certification représente surtout une étape. Elle ne veut pas dire que je maîtrise un sujet de A à Z. La Terraform Associate 004 que je prépare encore en est un bon exemple. Je suis encore en train d'apprendre, et c'est justement le but.",
  },

  {
    id: "footer",
    quote: null,
    author: null,
    note: "Avec l'IA qui prend de plus en plus de place dans notre façon de travailler, j'essaie surtout de ne pas perdre l'habitude de réfléchir par moi-même, de poser des questions et de comprendre ce que je fais. Si tu es arrivé jusqu'ici, merci. Et si tu veux discuter, écris-moi.",
  },
];
