export default async function handler(req, res) {
  const mint = req.query.mint;

  if (!mint) {
    return res.status(400).json({ error: "Missing mint parameter" });
  }

  try {
    const dexRes = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${mint}`);
    const dexJson = await dexRes.json();

    if (dexJson.pairs && dexJson.pairs.length > 0) {
      const pair = dexJson.pairs[0];

      return res.status(200).json({
        marketCap: parseInt(pair.marketCap) || 0,
        volume24h: parseInt(pair.volume?.h24) || 0,
        price: parseFloat(pair.priceUsd) || 0,
        mint,
        timestamp: new Date().toISOString(),
      });
    }

    return res.status(500).json({ error: "No trading data found" });
  } catch (err) {
    console.error("Serverless fetch error:", err);
    return res.status(500).json({ error: "DexScreener request failed" });
  }
}
