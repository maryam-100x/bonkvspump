const express = require("express");
const cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/bitquery", async (req, res) => {
  const { mint } = req.query;
  if (!mint) return res.status(400).json({ error: "Missing mint parameter" });

  try {
    const dexRes = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${mint}`);
    const dexJson = await dexRes.json();

    if (dexJson.pairs && dexJson.pairs.length > 0) {
      const pair = dexJson.pairs[0];
      return res.json({
        marketCap: parseInt(pair.marketCap) || 0,
        volume24h: parseInt(pair.volume?.h24) || 0,
        price: parseFloat(pair.priceUsd) || 0,
        mint,
        timestamp: new Date().toISOString()
      });
    }

    return res.status(500).json({ error: "No trading data found" });
  } catch (err) {
    console.error("Proxy fetch error:", err.message);
    return res.status(500).json({ error: "Proxy failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy running at http://localhost:${PORT}`);
});
