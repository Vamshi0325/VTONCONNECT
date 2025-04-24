"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <TonConnectUIProvider manifestUrl="">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
