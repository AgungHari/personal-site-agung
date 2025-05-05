import { useEffect, useState } from "react";

export default function LeftAd() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Pastikan hanya jalan di client
    setShow(true);

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (e) {
      console.error("AdSense vertical error", e);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="hidden xl:block fixed left-4 top-40 z-50 w-[160px] h-[600px]">  
      <ins className="adsbygoogle"
        style={{ display: 'block', width: '160px', height: '600px' }}
        data-ad-client="ca-pub-9509215083359372"
        data-ad-slot="1266681296"
        data-ad-format="auto"
      />
    </div>
  );
}
