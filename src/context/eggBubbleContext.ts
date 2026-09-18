import { createContext } from "react";
import type { EggId } from "../content/eggs";

export interface EggBubbleContextValue {
  showBubble: (id: EggId, target: HTMLElement) => void;
  hideBubble: () => void;
}

export const EggBubbleContext = createContext<EggBubbleContextValue | null>(null);