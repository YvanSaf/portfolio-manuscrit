import PageChrome from "./components/PageChrome";
import CoverSpread from "./components/CoverSpread";
import { EggBubbleProvider } from "./context/EggBubbleProvider";
import Transfo from "./components/Transfo";
import Planches from "./components/Planches";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { usePanelClickSound } from "./hooks/usePanelClickSound";

export default function App() {
  useScrollReveal();
  usePanelClickSound();
  return (
    <EggBubbleProvider>
      <PageChrome />
      <main>
        <CoverSpread />
        <Transfo />
        <Planches />
      </main>
    </EggBubbleProvider>
  );
}