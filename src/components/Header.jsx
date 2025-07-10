const Header = () => {
  return (
    <div
      style={{
        padding: '30px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(255, 92, 2, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 50%, rgba(96, 202, 139, 0.15) 0%, transparent 40%)
          `,
          zIndex: -1,
        }}
      />

      <span
        style={{
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: '900',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          background: 'linear-gradient(to right, #ff5c02, #60ca8b, #7dd9a3)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          position: 'relative',
          display: 'inline-block',
          padding: '0 20px',
        }}
      >
        <span
          style={{
            position: 'absolute',
            content: '""',
            left: 0,
            right: 0,
            bottom: '-5px',
            height: '3px',
            background: 'linear-gradient(to right, #ff5c02, #60ca8b)',
            borderRadius: '3px',
          }}
        />
        TEAM BONK vs TEAM PUMP
      </span>

      <div
        style={{
          fontSize: '16px',
          marginTop: '12px',
          fontWeight: '500',
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '1px',
        }}
      >
        THE PVP LAUNCHPAD WAR ON SOLANA
      </div>
    </div>
  );
};

export default Header;
