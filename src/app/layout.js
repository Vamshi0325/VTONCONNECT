"use client";
import "./globals.css";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" style={{ top: "auto" }}>
        <TonConnectUIProvider manifestUrl="https://vtonconnect.vercel.app/tonconnect-manifest.json">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
