import { useContent } from "../hooks/useContent";
import TomoeEgg from "./TomoeEgg";

export default function Outils() {
  const { outils: t } = useContent();

  return (
    <section className="outils mx-auto max-w-[1100px] px-7 py-24">
      <div className="section-head">
        <h2>{t.title}</h2>
        <span>{t.subtitle}</span>
        <TomoeEgg id="outils" className="egg" />
      </div>

      <div className="tool-rows">
        {t.tools.map((tool) => (
          <div key={tool.label} className="tool-row reveal-up">
            <span className="label">{tool.label}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${tool.percent}%` }} />
              <div className="crack" style={{ left: `${tool.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}