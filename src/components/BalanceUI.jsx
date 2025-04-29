"use client";

import React, { useEffect, useState } from "react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import axios from "axios";
import { Box, Button } from "@mui/material";

export default function BalanceUI() {
  const address = useTonAddress(); // Get the address from TonConnect
  const [balance, setBalance] = useState(0);
  const [tonConnectUI, setOptions] = useTonConnectUI(); // Get TonConnect UI instance

  // Fetch balance from the TON blockchain
  const fetchBalance = async () => {
    if (!address) return; // If address is not available, do nothing
    try {
      const data = await axios.get(
        `https://testnet.toncenter.com/api/v2/getAddressInformation?address=${address}`
      );
      if (data && data.data.ok && data.data.result?.balance) {
        const nano = data.data.result.balance;
        const updatedBalance = Number(nano) / 1e9; // Convert nanotons to TON
        setBalance(updatedBalance.toFixed(4)); // Update balance state
      }
    } catch (err) {
      console.error("Failed to fetch balance:", err);
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
      const response = await tonConnectUI.sendTransaction(makeTransaction);
      console.log("Transaction sent successfully!", response);

      // Immediately fetch and set the balance after the transaction
      await fetchBalance(); // Fetch balance after the transaction is sent
    } catch (err) {
      console.error("Failed to send transaction:", err);
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
      <Box>{address ? `💰 ${balance} TON` : 0}</Box>
      <Button variant="contained" color="primary" onClick={sendTransaction}>
        Send Transaction
      </Button>
    </Box>
  );
}
