import * as motion from "motion/react-client";
import { SectionEffectProps } from "../types/component-types";

const SectionEffect = ({
  children,
  className,
  variants, // Animation variants
  initial = "hidden",
  whileInView = "visible",
  viewport = { once: true, amount: 0.3 },
}: SectionEffectProps) => {
  return (
    <motion.div
      className={`${className || ""}`}
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
};

export default SectionEffect;
