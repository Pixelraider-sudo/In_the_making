let enabled = false;

type Listener = (state: boolean) => void;

const listeners: Listener[] = [];

export const DevMode = {
  toggle() {
    enabled = !enabled;
    listeners.forEach((fn) => fn(enabled));
  },

  set(value: boolean) {
    enabled = value;
    listeners.forEach((fn) => fn(enabled));
  },

  isEnabled() {
    return enabled;
  },

  subscribe(fn: Listener) {
    listeners.push(fn);
    return () => {
      const i = listeners.indexOf(fn);
      if (i > -1) listeners.splice(i, 1);
    };
  },
};
