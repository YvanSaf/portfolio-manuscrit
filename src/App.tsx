import PageChrome from "./components/PageChrome";
import CoverSpread from "./components/CoverSpread";
import { EggBubbleProvider } from "./context/EggBubbleProvider";

export default function App() {
  return (
    <EggBubbleProvider>
      <PageChrome />
      <main>
        <CoverSpread />
      </main>
    </EggBubbleProvider>
  );
}