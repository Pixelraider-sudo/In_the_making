import { useOSStore } from "../store";
import { TerminalApp } from "../terminal/TerminalApp";

/**
 * WindowManager (REAL KERNEL VERSION)
 * Fully connected to OS store
 */

export function WindowManager() {
  const windows = useOSStore((s) => s.windows);
  const closeWindow = useOSStore((s) => s.closeWindow);

  return (
    <>
      {windows.map((win) => {
        const baseStyle: React.CSSProperties = {
          position: "absolute",
          top: win.y,
          left: win.x,
          width: win.width,
          height: win.height,
          border: "1px solid #22c55e",
          backgroundColor: "#000",
          color: "#00ff88",
          fontFamily: "monospace",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: "6px",
          boxShadow: "0 0 20px rgba(34,197,94,0.2)",
        };

        return (
          <div key={win.id} style={baseStyle}>
            {/* Title Bar */}
            <div
              style={{
                height: "30px",
                background: "#050505",
                borderBottom: "1px solid #22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 8px",
                fontSize: "12px",
              }}
            >
              <span>{win.title}</span>

              {/* Close button */}
              <div style={{ display: "flex", gap: "6px" }}>
                <span
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => closeWindow(win.id)}
                >
                  ●
                </span>
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: "auto" }}>{renderApp(win.app)}</div>
          </div>
        );
      })}
    </>
  );
}

/**
 * App Router inside OS
 */
function renderApp(app: string) {
  switch (app) {
    case "terminal":
      return <TerminalApp />;

    case "portfolio":
      return (
        <div style={{ padding: 12 }}>
          <h1>Portfolio App</h1>
          <p>Coming soon: connected portfolio data layer.</p>
        </div>
      );

    case "explorer":
      return (
        <div style={{ padding: 12 }}>
          <h1>File Explorer</h1>
          <p>Virtual filesystem loading...</p>
        </div>
      );

    case "settings":
      return (
        <div style={{ padding: 12 }}>
          <h1>Settings</h1>
          <p>Theme, system config, personalization.</p>
        </div>
      );

    default:
      return <div style={{ padding: 12 }}>Unknown App: {app}</div>;
  }
}
