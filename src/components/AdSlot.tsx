import { useEffect, useState } from "react";

export default function AdSlot() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;

    const adEl = document.querySelector(".adsbygoogle");
    const isAlreadyLoaded = adEl?.getAttribute("data-adsbygoogle-status") === "done";

    if (!isAlreadyLoaded) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error", e);
      }
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="my-8 w-full">
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
