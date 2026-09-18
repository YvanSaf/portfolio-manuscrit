import { useContext } from "react";
import { EggBubbleContext, type EggBubbleContextValue } from "../context/eggBubbleContext";

export function useEggBubble(): EggBubbleContextValue {
  const ctx = useContext(EggBubbleContext);
  if (!ctx) {
    throw new Error("useEggBubble must be used within EggBubbleProvider");
  }
  return ctx;
}