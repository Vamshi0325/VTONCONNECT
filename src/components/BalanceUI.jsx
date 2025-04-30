"use client";

import React, { useEffect, useState } from "react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import axios from "axios";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Loader from "./Loader";

export default function BalanceUI() {
  const address = useTonAddress(); // Get the address from TonConnect
  const [balance, setBalance] = useState(0);
  const [tonConnectUI, setOptions] = useTonConnectUI(); // Get TonConnect UI instance
  const [loading, setLoading] = useState(false);

  // Fetch balance from the TON blockchain
  const fetchBalance = async () => {
    if (!address) return; // If address is not available, do nothing
    setLoading(true);
    try {
      const data = await axios.get(
        `https://testnet.toncenter.com/api/v2/getAddressInformation?address=${address}`
      );
      if (data && data.data.ok && data.data.result?.balance) {
        const nano = data.data.result.balance;
        const updatedBalance = Number(nano) / 1e9; // Convert nanotons to TON
        setBalance(updatedBalance.toFixed(4)); // Update balance state
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch balance:", err);
      setLoading(false);
    }
  };

  // Transaction details for sending
  const makeTransaction = {
    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes validity for the transaction
    messages: [
      {
        address: "0QCz9ZT675_9laK9-Xl2ofq2BXD2MO04MWpBJTDceyIx5B2J", // Example recipient address
        amount: "1000000000", // Amount in nanotons (1 TON = 1e9 nanotons)
      },
    ],
  };

  // Send the transaction and fetch balance
  const sendTransaction = async () => {
    if (!address) {
      console.error("Address not found.");
      return;
    }
    if (!tonConnectUI) {
      console.error("TonConnect UI is not initialized.");
      return;
    }

    try {
      setLoading(true);
      const response = await tonConnectUI.sendTransaction(makeTransaction);
      console.log("Transaction sent successfully!", response);

      setTimeout(async () => {
        await fetchBalance();
      }, 10 * 1000);
    } catch (err) {
      console.error("Failed to send transaction:", err);
      setLoading(false);
    }
  };

  // Fetch the balance when the component mounts or address changes
  useEffect(() => {
    if (address) {
      fetchBalance(); // Only fetch balance if address exists
    }
  }, [address]); // Trigger balance fetch when address changes

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        {loading ? (
          <CircularProgress size={50} />
        ) : address ? (
          <Typography variant="h4" component="h4" sx={{ fontWeight: "bold" }}>
            💰 {balance} TON
          </Typography>
        ) : (
          <Typography variant="h4" component="h4" sx={{ fontWeight: "bold" }}>
            0
          </Typography>
        )}
      </Box>
      <Button variant="contained" color="primary" onClick={sendTransaction}>
        Send Transaction
      </Button>
    </Box>
  );
}
