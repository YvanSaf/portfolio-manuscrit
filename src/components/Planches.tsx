import { useContent } from "../hooks/useContent";
import TomoeEgg from "./TomoeEgg";

const panelClasses = ["panel p1 reveal-up", "panel p2 reveal-up", "panel p3 reveal-up", "panel p4 reveal-up"];

export default function Planches() {
  const { planches: t } = useContent();

  return (
    <section className="planches mx-auto max-w-[1100px] px-7 py-24">
      <div className="section-head">
        <h2>{t.title}</h2>
        <span>{t.counter}</span>
        <TomoeEgg id="planches" className="egg" />
      </div>

      <div className="panel-grid">
        {t.panels.map((p, i) => (
          <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className={panelClasses[i]}>
            <span className="tag">{p.tag}</span>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            {i === 0 && <div className="annot a1">{t.annotation}</div>}
          </a>
        ))}

        <div className="panel p5 reveal-up" style={{ opacity: 0.6 }}>
          <span className="tag">{t.nextPanel.tag}</span>
          <h3>{t.nextPanel.title}</h3>
          <p>{t.nextPanel.desc}</p>
        </div>

        <a href={t.seeAll.url} target="_blank" rel="noopener noreferrer" className="panel p6 reveal-up">
          <span className="tag">{t.seeAll.tag}</span>
          <h3 className="magnetic">{t.seeAll.title}</h3>
          <p>{t.seeAll.desc}</p>
        </a>
      </div>
    </section>
  );
}