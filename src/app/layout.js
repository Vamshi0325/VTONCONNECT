"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <TonConnectUIProvider manifestUrl="https://vtonconnect.vercel.app/tonconnect-manifest.json">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
