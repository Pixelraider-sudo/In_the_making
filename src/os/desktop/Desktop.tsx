import { useOSStore } from "../store";

/**
 * PixelOS Desktop
 * Window-based launcher surface
 */

const APPS = [
  {
    id: "terminal",
    name: "Terminal",
    icon: "💻",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    icon: "🌐",
  },
  {
    id: "explorer",
    name: "Files",
    icon: "📁",
  },
  {
    id: "settings",
    name: "Settings",
    icon: "⚙️",
  },
];

export function Desktop() {
  const openWindow = useOSStore((s) => s.openWindow);

  function handleLaunch(appId: string) {
    const baseWindow = {
      id: `${appId}-${Date.now()}`,
      app: appId,
      title: appId.charAt(0).toUpperCase() + appId.slice(1),
      x: 120,
      y: 120,
      width: 700,
      height: 450,
      minimized: false,
      maximized: false,
    };

    openWindow(baseWindow);
  }

  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black opacity-90" />

      {/* Desktop Icons */}
      <div className="relative p-10 grid grid-cols-6 gap-8">
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => handleLaunch(app.id)}
            className="flex flex-col items-center justify-center text-center hover:scale-110 transition"
          >
            <div className="text-3xl">{app.icon}</div>
            <div className="text-xs mt-2 text-gray-300">{app.name}</div>
          </button>
        ))}
      </div>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/80 border-t border-green-900 flex items-center px-3">
        <div className="text-green-400 text-sm">PixelOS</div>

        <div className="ml-auto text-xs text-gray-400">Window System Active</div>
      </div>
    </div>
  );
}
