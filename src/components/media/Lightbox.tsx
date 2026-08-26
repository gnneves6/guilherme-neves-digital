import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Opens one photograph at the size it was made for.
 *
 * The artefact photographs are 1536px of dense document: compliance tables,
 * matchday timelines, printed targets in eight-point type. On the page they are
 * shown as a crop, because a whole spread reduced to a 420px column is grey
 * noise. That solves scanning and loses the detail, and the detail is the
 * argument, so the crop is now a door rather than a limit.
 *
 * Deliberately plain. No zoom, no pan, no gallery arrows: one picture, an
 * unmistakable way out, and Escape. Anything more would be a second interface
 * to learn in the middle of reading a page.
 *
 * Sits at z-120 because the resource modal already holds z-100 and this opens
 * from inside it.
 */
interface Props {
  src: string | null;
  alt: string;
  caption?: string;
  onClose: () => void;
}

const Lightbox = ({ src, alt, caption, onClose }: Props) => {
  // Escape closes, and the page underneath must not scroll while it is open,
  // or dismissing lands the reader somewhere they did not choose.
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [src, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8 md:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          style={{ background: "hsl(var(--charcoal-deep) / 0.94)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <motion.figure
            className="relative max-w-6xl w-full"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-auto max-h-[82vh] object-contain rounded-sm"
            />
            {caption && (
              <figcaption className="mt-4 text-[11px] tracking-[0.2em] uppercase font-display text-[hsl(var(--ivory)/0.55)]">
                {caption}
              </figcaption>
            )}
          </motion.figure>

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-300 text-[hsl(var(--ivory)/0.7)] hover:text-[hsl(var(--ivory))]"
            style={{ background: "hsl(var(--ivory) / 0.08)" }}
          >
            <span aria-hidden className="text-lg leading-none">✕</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Lightbox;
