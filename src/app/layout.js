"use client";
import Script from "next/script";
import "./globals.css";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function RootLayout({ children }) {
  const tonConnectOptions = {
    manifestUrl: "https://vtonconnect.vercel.app/tonconnect-manifest.json",
  };
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (window.Telegram && window.Telegram.WebApp) {
              const telegram = window.Telegram.WebApp;
              telegram.ready();
              telegram.expand();
            }
          }}
        />
        <TonConnectUIProvider manifestUrl={tonConnectOptions.manifestUrl}>
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
