import { useRef } from "react";
import { useCustomCursorMovement } from "../hooks/useCustomCursorMovement";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  useCustomCursorMovement(cursorRef);

  return (
    <div id="custom-cursor" ref={cursorRef} data-state="default" aria-hidden="true">
      <svg width="34" height="34" viewBox="0 0 34 34">
        <g className="c-default">
          <path
            d="M6 28 C9 23 13 19 16 16 C20 12 24 9 28 7 C25 11 21 15 18 18 C14 22 10 25 7 28 Z"
            fill="var(--paper-white)"
            stroke="var(--ink)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M9 25 L25 9" stroke="var(--red)" strokeWidth="1.1" strokeLinecap="round" />
          <circle cx="12.5" cy="21.5" r="1.5" fill="var(--paper-white)" stroke="var(--ink)" strokeWidth="1" />
          <circle cx="28" cy="7" r="1.1" fill="var(--ink)" />
        </g>
        <g className="c-link">
          <circle cx="17" cy="17" r="10" fill="none" stroke="var(--red)" strokeWidth="2" />
          <circle cx="17" cy="17" r="2.4" fill="var(--red)" />
        </g>
        <g className="c-stamp">
          <circle cx="17" cy="17" r="13" fill="none" stroke="var(--red)" strokeWidth="2.4" />
          <circle cx="17" cy="17" r="8" fill="none" stroke="var(--red)" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}