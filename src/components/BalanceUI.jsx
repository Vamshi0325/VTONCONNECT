"use client";

import React, { useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import axios from "axios";

export default function BalanceUI() {
  const address = useTonAddress();
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const data = await axios.get(
        `https://testnet.toncenter.com/api/v2/getAddressInformation?address=${address}`
      );
      console.log("data", data.data);
      if (data && data.data.ok && data.data.result?.balance) {
        const nano = data.data.result.balance;
        const balance = Number(nano) / 1e9;
        setBalance(balance.toFixed(2));
      }
    } catch (err) {
      console.error("Failed to fetch balance:", err);
    }
  };

  useEffect(() => {
    if (!address) return;
    console.log("address", address);
    fetchBalance();
  }, [address]);

  return (
    <>
      <div>{address ? `💰 ${balance} TON` : 0}</div>
    </>
  );
}
