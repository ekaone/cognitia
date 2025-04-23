import Image from "next/image";
import Link from "next/link";

export default function FooterBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[40px] bg-black/40 backdrop-blur-[8px] z-50 flex items-center justify-center border-b border-white/10">
      <div className="flex items-center space-x-2 md:space-x-3 px-2 md:px-0">
        <Image
          src="/brand.svg"
          alt="Next.js Icon"
          width={16}
          height={16}
          className="text-gray-300"
        />
        <span className="text-gray-300 text-sm md:text-base font-medium tracking-wide">
          From the Mind of{" "}
          <Link
            href="https://x.com/twekaone"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Eka Prasetia
          </Link>
        </span>
      </div>
    </div>
  );
}
