import { useEffect, useRef, useState } from "react";
import { setNonPersonalizedAds } from "@/lib/setNonPersonalizedAds";

export default function LeftAd() {
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
          console.error("AdSense vertical error", e);
        }
      }
    };

    tryLoadAd();
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed left-4 top-40 z-50 w-[160px] h-[600px]"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "160px", height: "600px" }}
        data-ad-client="ca-pub-9509215083359372"
        data-ad-slot="1266681296"
      />
    </div>
  );
}
