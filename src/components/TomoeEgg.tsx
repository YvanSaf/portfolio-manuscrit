import { forwardRef, type MouseEvent } from "react";
import type { EggId } from "../content/eggs";
import { useEggBubble } from "../hooks/useEggBubble";

type TomoeEggProps = {
  id: EggId;
  className?: string;
};

const TomoeEgg = forwardRef<HTMLSpanElement, TomoeEggProps>(function TomoeEgg({ id, className }, ref) {
  const { showBubble } = useEggBubble();

  function handleClick(e: MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    showBubble(id, e.currentTarget);
  }

  return (
    <span ref={ref} className={className} data-cursor="link" aria-label="note cachée" onClick={handleClick}>
      <svg className="tomoe-ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="tomoe-outline" cx="50" cy="50" r="46" />
        <circle cx="50" cy="50" r="27" fill="none" stroke="var(--ink)" strokeWidth="1.5" opacity=".45" />
        <path className="tomoe-comma" d="M50,50 C42,42 38,32 38,22 A12,12 0 1,1 62,22 C62,32 58,42 50,50 Z" />
        <path
          className="tomoe-comma"
          d="M50,50 C42,42 38,32 38,22 A12,12 0 1,1 62,22 C62,32 58,42 50,50 Z"
          transform="rotate(120 50 50)"
        />
        <path
          className="tomoe-comma"
          d="M50,50 C42,42 38,32 38,22 A12,12 0 1,1 62,22 C62,32 58,42 50,50 Z"
          transform="rotate(240 50 50)"
        />
        <circle className="tomoe-pupil" cx="50" cy="50" r="6" />
      </svg>
    </span>
  );
});

export default TomoeEgg;