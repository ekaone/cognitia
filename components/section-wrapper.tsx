import { ReactNode, HTMLAttributes } from "react";

const SectionWrapper = ({
  children,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLElement>) => (
  <section {...props} className={`py-16 lg:py-24 ${props.className || ""}`}>
    {children}
  </section>
);

export default SectionWrapper;
