import PageChrome from "./components/PageChrome";
import CoverSpread from "./components/CoverSpread";
import { EggBubbleProvider } from "./context/EggBubbleProvider";
import { LanguageProvider } from "./context/LanguageProvider";
import Transfo from "./components/Transfo";
import Planches from "./components/Planches";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { usePanelClickSound } from "./hooks/usePanelClickSound";
import Outils from "./components/Outils";
import Certifs from "./components/Certifs";
import Footer from "./components/Footer";

export default function App() {
  useScrollReveal();
  usePanelClickSound();
  return (
    <LanguageProvider>
      <EggBubbleProvider>
        <PageChrome />
        <main>
          <CoverSpread />
          <Transfo />
          <Planches />
          <Outils />
          <Certifs />
          <Footer />
        </main>
      </EggBubbleProvider>
    </LanguageProvider>
  );
}