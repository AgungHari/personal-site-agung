import { useEffect, useRef, useState } from "react";
import { setNonPersonalizedAds } from "@/lib/setNonPersonalizedAds";

export default function AdSlot() {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show || !containerRef.current) return;

    const tryLoadAd = () => {
      const adEl = containerRef.current?.querySelector(".adsbygoogle") as HTMLElement | null;
      const isAlreadyLoaded = adEl?.getAttribute("data-adsbygoogle-status") === "done";

      if (!adEl || adEl.offsetWidth === 0) {
        setTimeout(tryLoadAd, 200); //mantap
        return;
      }

      if (!isAlreadyLoaded) {
        try {
          setNonPersonalizedAds();
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense error", e);
        }
      }
    };

    tryLoadAd();
  }, [show]);

  if (!show) return null;

  return (
    <div ref={containerRef} className="my-8 w-full">
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-9509215083359372"
        data-ad-slot="7909478240"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
