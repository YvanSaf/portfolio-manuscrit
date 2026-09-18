import { useEffect, useRef, useState, type ReactNode } from "react";
import { eggs, type EggId } from "../content/eggs";
import { tick } from "../lib/sound";
import { EggBubbleContext } from "./eggBubbleContext";

interface BubbleState {
  visible: boolean;
  top: number;
  left: number;
  quote: string | null;
  author: string | null;
  note: string;
}

const BUBBLE_WIDTH = 320;
const BUBBLE_MARGIN = 20;

export function EggBubbleProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BubbleState>({
    visible: false,
    top: 0,
    left: 0,
    quote: null,
    author: null,
    note: "",
  });
  const bubbleRef = useRef<HTMLDivElement>(null);

  function hideBubble() {
    setState((s) => ({ ...s, visible: false }));
  }

  function showBubble(id: EggId, target: HTMLElement) {
    const entry = eggs.find((e) => e.id === id);
    if (!entry) return;

    tick();
    target.classList.add("found");

    const r = target.getBoundingClientRect();
    let top = r.bottom + 10;
    let left = r.left;
    const maxLeft = window.innerWidth - (BUBBLE_WIDTH + 20);
    if (left > maxLeft) left = Math.max(maxLeft, 12);

    const bubbleHeight = bubbleRef.current?.offsetHeight || 160;
    if (top > window.innerHeight - bubbleHeight - BUBBLE_MARGIN) {
      top = r.top - bubbleHeight - 10;
    }

    setState({
      visible: true,
      top: Math.max(12, top),
      left,
      quote: entry.quote,
      author: entry.author,
      note: entry.note,
    });
  }

  useEffect(() => {
    document.addEventListener("click", hideBubble);
    window.addEventListener("scroll", hideBubble, { passive: true });
    return () => {
      document.removeEventListener("click", hideBubble);
      window.removeEventListener("scroll", hideBubble);
    };
  }, []);

  return (
    <EggBubbleContext.Provider value={{ showBubble, hideBubble }}>
      {children}
      <div
        ref={bubbleRef}
        className={`egg-bubble ${state.visible ? "visible" : ""}`}
        style={{ top: state.top, left: state.left }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close" onClick={hideBubble}>
          ✕
        </span>
        {state.quote && <blockquote className="egg-quote">« {state.quote} »</blockquote>}
        {state.author && <cite className="egg-author">{state.author}</cite>}
        <p className="egg-note">{state.note}</p>
      </div>
    </EggBubbleContext.Provider>
  );
}