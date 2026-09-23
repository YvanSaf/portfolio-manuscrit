import type { CSSProperties } from "react";
import { useContent } from "../hooks/useContent";
import TomoeEgg from "./TomoeEgg";

export default function Certifs() {
  const { certifs: t } = useContent();

  return (
    <section className="certifs mx-auto max-w-[1100px] border-t border-dashed border-guide px-7 py-24">
      <div className="section-head">
        <h2>{t.title}</h2>
        <span>{t.subtitle}</span>
        <TomoeEgg id="certifs" className="egg" />
      </div>

      <div className="stamp-grid">
        {t.items.map((item) => {
          const className = `cert-stamp reveal-up ${item.pending ? "pending" : ""}`;
          const style = { "--r": `${item.rotation}deg` } as CSSProperties;
          const content = (
            <>
              <span className="cert-name">{item.name}</span>
              {item.pending && <span className="cert-pending-tag">{t.pendingLabel}</span>}
            </>
          );

          if (item.url) {
            return (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className={className} style={style}>
                {content}
              </a>
            );
          }

          return (
            <div key={item.name} className={className} style={style}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}