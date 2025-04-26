"use client";
import "./globals.css";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function RootLayout({ children }) {
  const tonConnectOptions = {
    manifestUrl: "https://vtonconnect.vercel.app/tonconnect-manifest.json",
  };
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <TonConnectUIProvider manifestUrl={tonConnectOptions.manifestUrl}>
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
