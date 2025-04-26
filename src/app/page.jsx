"use client";

import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [tonConnectUI, setOptions] = useTonConnectUI();

  useEffect(() => {
    console.log("tonConnectUI", tonConnectUI);
    console.log("setOptions", setOptions);
  }, []);

  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="loader"></div>
        <style jsx>{`
          .loader {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
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
        margin: "0",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        TON Connect Demo
      </Typography>
      <TonConnectButton
        className="my-button-class "
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
