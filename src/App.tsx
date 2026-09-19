import PageChrome from "./components/PageChrome";
import CoverSpread from "./components/CoverSpread";
import { EggBubbleProvider } from "./context/EggBubbleProvider";
import Transfo from "./components/Transfo";

export default function App() {
  return (
    <EggBubbleProvider>
      <PageChrome />
      <main>
        <CoverSpread />
        <Transfo />
      </main>
    </EggBubbleProvider>
  );
}