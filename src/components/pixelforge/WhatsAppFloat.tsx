import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "254762845454";

const WHATSAPP_MESSAGE =
  "Hi Kipkirui! I came across your portfolio and would like to discuss a project or professional opportunity.";

export function WhatsAppFloat() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-6 sm:right-6">
      <span className="pointer-events-none hidden -translate-x-1 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground opacity-0 shadow-lg transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 sm:block">
        Let's talk about your project
      </span>

      <div className="relative">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact Kipkirui John on WhatsApp about a project or professional opportunity"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/10 transition duration-200 hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] active:scale-95"
        >
          <MessageCircle className="h-7 w-7" aria-hidden="true" strokeWidth={2.2} />
        </a>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hide WhatsApp contact button"
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
