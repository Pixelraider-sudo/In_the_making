import { TerminalApp } from "../os/terminal/TerminalApp";

/**
 * OSApp
 * Wrapper that loads PixelOS interface
 */

export function OSApp() {
  return (
    <div className="h-screen w-screen bg-black">
      <TerminalApp />
    </div>
  );
}
