import { useEffect, useState } from "react";

export function useTokenStats(mint) {
  const [data, setData] = useState({
    marketCap: null,
    volume24h: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mint) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        // const res = await fetch(`http://localhost:3001/api/bitquery?mint=${mint}`);
        const res = await fetch(`/api/bitquery?mint=${mint}`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Unknown error");

        setData({
          marketCap: json.marketCap,
          volume24h: json.volume24h,
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        setData({ marketCap: 0, volume24h: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, [mint]);

  return { ...data, loading, error };
}
