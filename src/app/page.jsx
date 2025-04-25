"use client";

import { Address } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";

export default function Home() {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleWalletConnection = useCallback((address) => {
    setTonWalletAddress(address);
    console.log("Wallet Connected Successfully:", address);
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("Wallet Disconnected Successfully");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        console.log("Raw Wallet Address:", tonConnectUI.account.address);
        handleWalletConnection(tonConnectUI.account.address);
      } else {
        handleWalletDisconnection();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet?.account?.address) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    setIsLoading(true);
    if (tonConnectUI.connected) {
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  const formatAddress = (address) => {
    const tempAddress = Address.parse(address).toString();
    return tempAddress;
    // return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: "0",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        TON Connect Demo
      </Typography>
      {tonWalletAddress ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              wordBreak: "break-word",
              width: "100%",
            }}
          >
            Connected Wallet Address: {formatAddress(tonWalletAddress)}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleWalletAction}
            sx={{ mt: 2, borderRadius: "50px" }}
          >
            Disconnect Wallet
          </Button>
        </div>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleWalletAction}
          sx={{ mt: 2, borderRadius: "50px" }}
        >
          Connect TON Wallet
        </Button>
      )}
    </Container>
  );
}
