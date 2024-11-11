'use client';

import { createRef, useEffect } from "react";

declare const window: any;

export default function Map() {
  const ref = createRef<HTMLDivElement>();
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    console.log(ref)
    if (!ref || !ref.current)
      return;

    (async () => {
      let js = await fetch(atob('aHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2xpYnJhcmllcz1tYXBzJmtleT1BSXphU3lCNDFEUlViS1dKSFB4YUZqTUF3ZHJ6V3piVkthcnROR2c=')).then(e => e.text());
      const common = await fetch('/api/maps-common').then(e => e.text());
      js = js.replace('e.appendChild(a)', '!a.src.includes("common.js") && e.appendChild(a)');

      window.eval(js);
      window.eval(common);

      while (!window.google) {
        await sleep(100);
      }

      const map = new window.google.maps.Map(ref.current, {
        center: { lat: -10.228213450580272, lng: -48.33304777369817 },
        zoom: 12,
        disableDefaultUI: true,
      });
    })();
  }, [ref]);

  return (
    <div ref={ref} className="w-screen h-screen"></div>
  );
}