import { useEffect, useState } from "react";

export function useImagePreloader(imageUrls: string[]) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!imageUrls.length) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;

    const preload = (url: string) => {
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          loadedCount++;
          setProgress((loadedCount / imageUrls.length) * 100);
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setProgress((loadedCount / imageUrls.length) * 100);
          resolve(); // resolve even on error
        };
        img.src = url;
      });
    };

    Promise.all(imageUrls.map(preload)).then(() => {
      setLoaded(true);
    });
  }, [imageUrls]);

  return { loaded, progress };
}
