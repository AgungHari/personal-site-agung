import { type AppType } from "next/dist/shared/lib/utils";
import Script from "next/script";

import "@/styles/globals.css";
import "@/styles/locomotive-scroll.css";

import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      {/* AdSense Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9509215083359372"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Main App */}
      <div lang="en" className={dmSans.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default MyApp;
