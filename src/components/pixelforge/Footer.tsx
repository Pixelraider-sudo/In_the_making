import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function Footer() {
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("pf-sound");
    if (v) {
      setSound(v === "1");
    }
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
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 md:flex-row md:items-center">
        <div className="text-xs font-mono text-muted-foreground">
          © {new Date().getFullYear()} Kipkirui John · forged in Kenya
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:border-primary hover:text-primary"
          >
            {sound ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}{" "}
            audio cues
          </button>

          <span className="text-xs font-mono text-muted-foreground">v0.1.0 · build:dev</span>
        </div>
      </div>
    </footer>
  );
}
