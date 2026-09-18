type TomoeEggProps = {
  className?: string;
};

export default function TomoeEgg({ className }: TomoeEggProps) {
  return (
    <span
      className={className}
      data-cursor="link"
      aria-label="note cachée"
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
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
}