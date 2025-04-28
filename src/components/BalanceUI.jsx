// "use client";

// import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
// import React, { useEffect, useState } from "react";

// const BalanceUI = () => {
//   const [tonBalance, setTonBalance] = useState(0);
//   const address = useTonAddress();
//   const wallet = useTonWallet();
//   useEffect(() => {
//     if (wallet) {
//       //   wallet.getBalance().then((balance) => {
//       //     setTonBalance(balance);
//       //   });
//       console.log("wallet useTonWallet", wallet);
//       console.log("wallet?.account.address", wallet?.account.address);
//       console.log("address useTonAddress", address);

//     }
//   }, []);

//   return <div>{address ? address : "No wallet connected"}</div>;
// };

// export default BalanceUI;

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
        setBalance(parseFloat(data.data.result.balance) / 1e9);
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
    <div>
      {address
        ? `💰 ${balance} TON`
        : "No wallet connected—please connect with TonConnectButton"}
    </div>
  );
}
