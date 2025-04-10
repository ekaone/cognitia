import { ReactNode } from "react";
import { Variants } from "motion/react";

export interface SectionEffectProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  initial?: string;
  whileInView?: string;
  viewport?: {
    once?: boolean;
    amount?: number;
  };
}
