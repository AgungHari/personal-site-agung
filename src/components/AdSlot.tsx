import { useEffect } from "react";

export default function AdSlot() {
  useEffect(() => {
    try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div className="my-8 w-full">
      <ins className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-9509215083359372"
        data-ad-slot="7909478240"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
