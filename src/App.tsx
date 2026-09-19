import PageChrome from "./components/PageChrome";
import CoverSpread from "./components/CoverSpread";
import { EggBubbleProvider } from "./context/EggBubbleProvider";
import Transfo from "./components/Transfo";
import Planches from "./components/Planches";

export default function App() {
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