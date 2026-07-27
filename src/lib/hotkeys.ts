type KeyHandler = (key: string) => void;

class HotkeysManager {
  private handlers: KeyHandler[] = [];

  init(): () => void {
    const listener = (e: KeyboardEvent) => {
      this.handlers.forEach((h) => h(e.key));
    };

    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }

  onKey(handler: KeyHandler): void {
    this.handlers.push(handler);
  }
}

export const Hotkeys = new HotkeysManager();
