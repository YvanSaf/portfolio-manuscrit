export interface PanelContent {
  tag: string;
  title: string;
  desc: string;
  url: string;
}

export interface NextPanelContent {
  tag: string;
  title: string;
  desc: string;
}

export interface SeeAllContent {
  tag: string;
  title: string;
  desc: string;
  url: string;
}

export interface ToolContent {
  label: string;
  percent: number;
}

export interface CertItemContent {
  name: string;
  rotation: number;
  pending: boolean;
  url: string | null;
}

export interface ContactLinkContent {
  label: string;
  href: string;
  icon: string;
}

export interface SiteContent {
  coverSpread: {
    plateLabel: string;
    titleBefore: string;
    titleEm: string;
    titleAfter: string;
    role: string;
    hint: string;
    bio: string;
    noteLine1: string;
    noteLine2: string;
    noteLine3: string;
  };
  chrome: {
    soundToggleLabel: string;
    sideMarginRight: string;
  };
  transfo: {
    label: string;
    caption: string;
  };
  planches: {
    title: string;
    counter: string;
    annotation: string;
    panels: PanelContent[];
    nextPanel: NextPanelContent;
    seeAll: SeeAllContent;
  };
  outils: {
    title: string;
    subtitle: string;
    tools: ToolContent[];
  };
  certifs: {
    title: string;
    subtitle: string;
    pendingLabel: string;
    items: CertItemContent[];
  };
  footer: {
    titleLines: [string, string];
    links: ContactLinkContent[];
  };
}