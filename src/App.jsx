import React from "react";
import BattleMeter from "./components/BattleMeter";
import SidePanel from "./components/SidePanel";
import Header from "./components/Header";
import { useTokenStats } from "./hooks/useTokenStats";
import { useHolderCount } from "./hooks/useHolderCount";

const App = () => {
  const BONK_MINT = "GH2rnaLDnkqGAuDyCDAASAVQWUU29rQRzv3LpV1kbonk";
  const PUMP_MINT = "cDkTvtXwJLqAS5NqpiwoTT2cbe6GkPBfBwkb5kppump"; // renamed from VS_MINT

  const bonkStats = useTokenStats(BONK_MINT);
  const pumpStats = useTokenStats(PUMP_MINT); // renamed from vsStats

  const bonkHolders = useHolderCount(BONK_MINT);
  const pumpHolders = useHolderCount(PUMP_MINT); // renamed from vsHolders

  const winningSide =
    (bonkStats.marketCap || 0) > (pumpStats.marketCap || 0) ? "bonk" : "pump"; // changed "vs" to "pump"

  const glowColor =
    winningSide === "bonk"
      ? "drop-shadow(0 0 20px #ff5c02) drop-shadow(0 0 50px #ff884d)"
      : "drop-shadow(0 0 20px #60ca8b) drop-shadow(0 0 50px #3cae6f)";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at center, #0a0a1a 0%, #000000 100%)",
        color: "#fff",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          background: "#000",
        }}
      >
        <Header />
        <BattleMeter bonkCap={bonkStats.marketCap} vsCap={pumpStats.marketCap} /> {/* keep prop name for compatibility */}
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          minHeight: "calc(100vh - 154px)",
        }}
      >
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <SidePanel
            side="bonk"
            holders={bonkHolders}
            stats={bonkStats}
            mint={BONK_MINT}
          />
        </div>

        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <SidePanel
            side="PUMP"
            holders={pumpHolders}
            stats={pumpStats}
            mint={PUMP_MINT}
          />
        </div>

        <img
          src="/vs.png"
          alt="VS"
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            height: "clamp(200px, 30vw, 400px)",
            pointerEvents: "none",
            animation: "vsPulse 3s ease-in-out infinite",
            filter: `${glowColor} brightness(1.2)`,
            transition: "filter 0.5s ease-in-out",
            opacity: 0.9,
          }}
        />
      </div>
    </div>
  );
};

export default App;
