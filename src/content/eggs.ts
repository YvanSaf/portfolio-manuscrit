export type EggId = "cover" | "transfo" | "planches" | "outils" | "certifs" | "footer";
export type Lang = "fr" | "en";

export interface EggEntry {
  id: EggId;
  quote: string | null;
  author: string | null;
  note: string;
}

const eggsFr: EggEntry[] = [
  {
    id: "cover",
    quote: "Tout ce que je sais, c'est que je ne sais rien.",
    author: "Platon",
    note: "Plus j'apprends, plus je me rends compte qu'il me reste encore énormément à apprendre. Au début, ça peut sembler frustrant. Moi, j'ai fini par trouver ça plutôt motivant.",
  },
  {
    id: "transfo",
    quote: "Au-delà de mes limites, plus ultra !",
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
    note: "Pour moi, une certification représente surtout une étape. Elle ne veut pas dire que je maîtrise un sujet de A à Z. Le Terraform Associate que je prépare encore en est un bon exemple. Je suis encore en train d'apprendre, et c'est justement le but.",
  },
  {
    id: "footer",
    quote: null,
    author: null,
    note: "Avec l'IA qui prend de plus en plus de place dans notre façon de travailler, j'essaie surtout de ne pas perdre l'habitude de réfléchir par moi-même, de poser des questions et de comprendre ce que je fais. Si tu es arrivé jusqu'ici, merci. Et si tu veux discuter, écris-moi.",
  },
];

const eggsEn: EggEntry[] = [
  {
    id: "cover",
    quote: "All I know is that I know nothing.",
    author: "Plato",
    note: "The more I learn, the more I realize how much I still have left to learn. At first, that can feel frustrating. For me, it ended up being motivating instead.",
  },
  {
    id: "transfo",
    quote: "Go beyond, Plus Ultra!",
    author: "All Might, My Hero Academia",
    note: "I like the idea of always trying to push a bit further. I don't get everything right on the first try, far from it. I test, I get it wrong, I try again, and little by little, it ends up working.",
  },
  {
    id: "planches",
    quote: null,
    author: null,
    note: "This portfolio is still under construction. Like quite a few things I build, actually. I could wait until it's perfect before showing it, but I'd rather let it evolve as I go.",
  },
  {
    id: "outils",
    quote: "This is incredibly exciting!",
    author: "Senku Ishigami, Dr. Stone",
    note: "I relate to Senku a little too well on this one. When I discover a new tool and finally start understanding how it works, I can easily lose way too much time in it.",
  },
  {
    id: "certifs",
    quote: null,
    author: null,
    note: "To me, a certification mostly marks a step along the way. It doesn't mean I've mastered a topic from A to Z. The Terraform Associate I'm still preparing for is a good example of that. I'm still learning, and that's exactly the point.",
  },
  {
    id: "footer",
    quote: null,
    author: null,
    note: "With AI taking up more and more space in how we work, I mainly try not to lose the habit of thinking for myself, asking questions, and understanding what I'm doing. If you made it this far, thank you. And if you want to talk, reach out.",
  },
];

export const eggsByLang: Record<Lang, EggEntry[]> = {
  fr: eggsFr,
  en: eggsEn,
};
//export const eggs = eggsFr;