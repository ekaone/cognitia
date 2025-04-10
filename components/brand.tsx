import Image from "next/image";

const Brand = ({ ...props }) => (
  <Image
    src="/brand.svg"
    alt="Brand logo"
    {...props}
    width={30}
    height={30}
    priority
  />
);
export default Brand;
