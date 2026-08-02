/**
 * Switch — small accessible toggle, used for the Engineering Mode
 * control in Nav. Native role="switch" + aria-checked so it announces
 * correctly to screen readers, and it's a real <button> so it's
 * keyboard-operable (Enter/Space) with no extra wiring.
 */
export function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="group inline-flex items-center gap-2"
    >
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full border transition-standard ${
          checked ? "border-primary bg-primary/30" : "border-border bg-card"
        }`}
      >
        <span
          className={`absolute top-0.5 h-3.5 w-3.5 rounded-full transition-standard ${
            checked ? "left-[18px] bg-primary" : "left-0.5 bg-muted-foreground"
          }`}
        />
      </span>
      <span className="text-label uppercase text-muted-foreground transition-standard group-hover:text-foreground">
        {label}
      </span>
    </button>
  );
}
