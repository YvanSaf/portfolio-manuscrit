import { fr } from "../content/fr";
import TomoeEgg from "./TomoeEgg";
import { IconGithub, IconDevto } from "./ContactIcons";

function ContactIcon({ icon, label }: { icon: string; label: string }) {
  if (icon === "github") return <IconGithub />;
  if (icon === "devto") return <IconDevto />;

  return (
    <img
      src={`/icons/icon-${icon}.png`}
      alt=""
      loading="lazy"
      onError={(e) => {
        const wrap = e.currentTarget.parentElement;
        if (wrap) {
          wrap.classList.add("icon-missing");
          wrap.textContent = label.charAt(0).toUpperCase();
        }
      }}
    />
  );
}

export default function Footer() {
  const { footer: t } = fr;

  return (
    <footer>
      <div>
        <h2>
          {t.titleLines[0]}
          <br />
          {t.titleLines[1]}
        </h2>
        <div className="links">
          {t.links.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <a key={l.label} href={l.href} data-cursor="stamp" className="magnetic contact-stamp" target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                <span className="contact-icon">
                  <ContactIcon icon={l.icon} label={l.label} />
                </span>
                <span className="contact-label">{l.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="stamp">
        {t.stampLines[0]}
        <br />
        {t.stampLines[1]}
        <br />
        {t.stampLines[2]}
      </div>

      <TomoeEgg id="footer" className="egg" />
    </footer>
  );
}