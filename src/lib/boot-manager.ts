type BootListener = (booted: boolean) => void;

let booted = false;

const listeners: BootListener[] = [];

export const BootManager = {
  isBooted() {
    return booted;
  },

  boot() {
    if (booted) return;

    booted = true;

    listeners.forEach((listener) => listener(booted));
  },

  reset() {
    booted = false;

    listeners.forEach((listener) => listener(booted));
  },

  subscribe(listener: BootListener) {
    listeners.push(listener);

    // immediately sync current state
    listener(booted);

    return () => {
      const index = listeners.indexOf(listener);

      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  },
};
