import { useEffect, useRef } from "react";

export const FRAME_COUNT = 121;
const FRAME_PATH = (i: number) => `/images/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

export function useCharFrames(canvasId: string, stageId: string) {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const firstDrawnRef = useRef(false);
  const frameIndexRef = useRef(0);
  const drawFrameRef = useRef<(index: number) => void>(() => {});

  useEffect(() => {
    const stage = document.getElementById(stageId);
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");
    if (!stage || !canvas || !ctx) return;

    stage.classList.add("loading");

    function drawFrame(index: number) {
      frameIndexRef.current = index;
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.drawImage(img, 0, 0, canvas!.width, canvas!.height);
      if (!firstDrawnRef.current) {
        firstDrawnRef.current = true;
        stage!.classList.remove("loading");
      }
    }
    drawFrameRef.current = drawFrame;

    const images = new Array<HTMLImageElement>(FRAME_COUNT);
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = () => {
        if (i === 0) drawFrame(0);
      };
      img.onerror = () => {
        console.warn("Missing frame:", FRAME_PATH(i + 1));
      };
      img.src = FRAME_PATH(i + 1);
      images[i] = img;
    }
    imagesRef.current = images;

    function handleResize() {
      drawFrame(frameIndexRef.current);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasId, stageId]);

  return drawFrameRef;
}