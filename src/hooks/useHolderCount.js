import { useEffect, useState } from "react";

export function useHolderCount(mint) {
  const [holders, setHolders] = useState(null);

  useEffect(() => {
    if (!mint) return;

    const fetchHolders = async () => {
      let allOwners = new Set();
      let cursor = undefined;

      try {
        while (true) {
          const params = { limit: 1000, mint };
          if (cursor !== undefined) params.cursor = cursor;

          const response = await fetch(import.meta.env.VITE_HELIUS_RPC, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: "get-holders",
              method: "getTokenAccounts",
              params,
            }),
          });

          const data = await response.json();

          if (!data.result || data.result.token_accounts.length === 0) break;

          data.result.token_accounts.forEach((acc) => {
            allOwners.add(acc.owner);
          });

          cursor = data.result.cursor;
          if (!cursor) break;
        }

        setHolders(allOwners.size);
      } catch (err) {
        console.error(`❌ Failed to fetch holders for ${mint}:`, err);
        setHolders(0);
      }
    };

    fetchHolders();
    const interval = setInterval(fetchHolders, 15000);
    return () => clearInterval(interval);
  }, [mint]);

  return holders;
}
