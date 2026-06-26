import type { Transition, Variants } from "framer-motion";

/** Calm, premium motion. Short distances, gentle ease-out. */
export const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: easeOut } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};
