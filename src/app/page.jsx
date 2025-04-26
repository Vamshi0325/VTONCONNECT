"use client";

import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state to control loader visibility
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  // Set isClient to true after the component mounts (only runs in client-side)
  useEffect(() => {
    setIsClient(true);
    // Set loader visibility for 3 seconds after component mounts
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader after 3 seconds
    }, 3000);

    // Clean up the timeout on unmount
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("tonConnectUI", tonConnectUI);
    console.log("setOptions", setOptions);
  }, [tonConnectUI, setOptions]);

  // Show the loader until `isLoading` is false
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        margin: "auto",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        TON Connect Demo
      </Typography>
      <TonConnectButton
        className="my-button-class"
        ui={tonConnectUI}
        options={setOptions}
      />
      {userFriendlyAddress && (
        <div
          style={{
            textAlign: "center",
            width: "90%",
            margin: "0 auto",
            wordWrap: "break-word",
            marginTop: "20px",
          }}
        >
          <span>
            User-friendly address: <br />
            {userFriendlyAddress}
          </span>
          <br />
          <br />
          <span>
            Raw address: <br />
            {rawAddress}
          </span>
        </div>
      )}
    </Container>
  );
}
