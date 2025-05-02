// "use client";
// import { useState } from "react";
// import Script from "next/script";

// export default function TelegramAd() {
//   const [isAdControllerReady, setIsAdControllerReady] = useState(false);

//   // Initialize the controller once the tg-ob.js script loads
//   const initController = () => {
//     try {
//       console.log("[Ads] Creating TelegramAdsController instance…");
//       window.TelegramAdsController = new TelegramAdsController();

//       window.TelegramAdsController.initialize({
//         pubId: "971423",
//         appId: "2234",
//         debug: true, // Enable debug mode for development
//       });

//       setIsAdControllerReady(true);
//       console.log("[Ads] Initialized:", window.TelegramAdsController);
//     } catch (err) {
//       console.error("[Ads] Initialization failed", err);
//       setIsAdControllerReady(false);
//     }
//   };

//   // Handle ad click event to trigger the ad (async version)
//   const handleAdClick = async () => {
//     if (!isAdControllerReady || !window.TelegramAdsController) {
//       console.warn("[Ads] Controller not ready");
//       return;
//     }

//     console.log("[Ads] Triggering ad…");

//     try {
//       // Check if the controller is initialized properly before triggering
//       if (
//         window.TelegramAdsController &&
//         window.TelegramAdsController.triggerNativeNotification
//       ) {
//         await window.TelegramAdsController.triggerNativeNotification(true); // Immediate display of the ad
//         console.log("[Ads] Ad triggered successfully");
//       } else {
//         console.error("[Ads] Controller method not available");
//       }
//     } catch (err) {
//       console.error("[Ads] Error triggering ad:", err);
//     }
//   };

//   return (
//     <>
//       {/* Telegram Web App Core */}
//       <Script
//         src="https://telegram.org/js/telegram-web-app.js?56"
//         strategy="afterInteractive"
//         onLoad={() => {
//           console.log("[Scripts] telegram-web-app loaded");
//         }}
//         onError={() => {
//           console.error("[Scripts] telegram-web-app failed to load");
//         }}
//       />

//       {/* TelegramAdsController Library */}
//       <Script
//         src="https://richinfo.co/richpartners/telegram/js/tg-ob.js"
//         strategy="afterInteractive"
//         onLoad={initController}
//         onError={() => {
//           console.error("[Scripts] tg-ob.js failed to load");
//         }}
//       />

//       <button
//         onClick={handleAdClick}
//         style={{
//           color: "#fff",
//           animation: "pulse 2s infinite",
//           padding: "5px",
//           background: "rgb(255, 27, 107)",
//           borderRadius: "0.375rem",
//           fontSize: "1rem",
//           width: "95%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           margin: "auto",
//           border: "2px solid #eaff00",
//           boxShadow: "inset 0 0 10px #ffc107",
//         }}
//       >
//         Watch Premium Ad
//       </button>

//       <style jsx>{`
//         @keyframes pulse {
//           0% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.03);
//           }
//           100% {
//             transform: scale(1);
//           }
//         }
//       `}</style>
//     </>
//   );
// }

"use client";
import { useState } from "react";
import Script from "next/script";

export default function TelegramAd() {
  const [isAdControllerReady, setIsAdControllerReady] = useState(false);

  // Initialize the controller once the tg-ob.js script loads
  const initController = () => {
    try {
      console.log("[Ads] Creating TelegramAdsController instance…");
      window.TelegramAdsController = new TelegramAdsController();

      window.TelegramAdsController.initialize({
        pubId: "971423",
        appId: "2234",
        debug: false, // Disable debug mode for production
      });

      setIsAdControllerReady(true);
      console.log("[Ads] Initialized:", window.TelegramAdsController);
    } catch (err) {
      console.error("[Ads] Initialization failed", err);
      setIsAdControllerReady(false);
    }
  };

  // Handle ad click event to trigger the ad (async version)
  const handleAdClick = async () => {
    if (!isAdControllerReady || !window.TelegramAdsController) {
      console.warn("[Ads] Controller not ready");
      return;
    }

    console.log("[Ads] Triggering ad…");

    try {
      // Check if the controller is initialized properly before triggering
      if (
        window.TelegramAdsController &&
        window.TelegramAdsController.triggerNativeNotification
      ) {
        await window.TelegramAdsController.triggerNativeNotification(true); // Immediate display of the ad
        console.log("[Ads] Ad triggered successfully");
      } else {
        console.error("[Ads] Controller method not available");
      }
    } catch (err) {
      console.error("[Ads] Error triggering ad:", err);
    }
  };

  return (
    <>
      {/* Telegram Web App Core */}
      <Script
        src="https://telegram.org/js/telegram-web-app.js?56"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("[Scripts] telegram-web-app loaded");
        }}
        onError={() => {
          console.error("[Scripts] telegram-web-app failed to load");
        }}
      />

      {/* TelegramAdsController Library */}
      <Script
        src="https://richinfo.co/richpartners/telegram/js/tg-ob.js"
        strategy="afterInteractive"
        onLoad={initController}
        onError={() => {
          console.error("[Scripts] tg-ob.js failed to load");
        }}
      />

      <button
        onClick={handleAdClick}
        style={{
          color: "#fff",
          animation: "pulse 2s infinite",
          padding: "5px",
          background: "rgb(255, 27, 107)",
          borderRadius: "0.375rem",
          fontSize: "1rem",
          width: "95%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          border: "2px solid #eaff00",
          boxShadow: "inset 0 0 10px #ffc107",
        }}
      >
        Watch Premium Ad
      </button>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
