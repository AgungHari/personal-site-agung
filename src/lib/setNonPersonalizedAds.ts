export function setNonPersonalizedAds(): void {
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    if (typeof window !== "undefined") {
      
      const ads = (window.adsbygoogle as any);
      ads.requestNonPersonalizedAds = 1;
    }
  }