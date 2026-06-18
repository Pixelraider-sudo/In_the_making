import { useEffect, useState } from "react";
import { Volume2, VolumeX, Github } from "lucide-react";

export function Footer() {
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("pf-sound");
    if (v) setSound(v === "1");
  }, []);

  const toggle = () => {
    const v = !sound;
    setSound(v);
    localStorage.setItem("pf-sound", v ? "1" : "0");

    if (v) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (
            window as Window & {
              webkitAudioContext?: typeof AudioContext;
            }
          ).webkitAudioContext;

        if (!AudioCtx) return;

        const ctx = new AudioCtx();
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.frequency.value = 880;
        gain.gain.value = 0.05;

        oscillator.connect(gain);
        gain.connect(ctx.destination);

        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.08);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div className="flex flex-col gap-1">
            <div className="text-xs font-mono text-muted-foreground">
              © {new Date().getFullYear()} Kipkirui John · Nairobi, Kenya
            </div>
            <div className="text-[10px] font-mono text-muted-foreground/50">
              forged with React 18 · TypeScript · Vite · Tailwind CSS · deployed on Vercel
            </div>
          </div>

          {/* Center — open source */}
          <a
            href="https://github.com/Kipkirui-John/in-the-making"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            view source · open-source
          </a>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {sound ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              audio cues
            </button>

            <span className="text-xs font-mono text-muted-foreground">
              v2.0.0 · build:{" "}
              <span className="text-primary">
                {new Date().toISOString().slice(0, 10).replace(/-/g, "")}
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
