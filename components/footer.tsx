import Link from "next/link";
import Image from "next/image";
import { SparklesText } from "@/components/magicui/sparkles-text";

export default function Footer() {
  return (
    <footer className="mt-16 py-2 bg-gray-900/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Brand Section - Centered */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/brand.svg"
              alt="Cognitia Logo"
              width={32}
              height={32}
              className="text-purple-500"
            />
            <SparklesText>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                Cognitia
              </span>
            </SparklesText>
          </div>
          <p className="text-gray-300 max-w-md text-center">
            Cognitive assessment tool for early detection of dementia-related
            changes.
          </p>
        </div>

        {/* Connect Links - Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 border-t border-gray-800">
          <Link
            href="https://github.com/ekaone/cognitia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-400 hover:text-white transition group"
          >
            <div className="relative p-2 rounded-full flex items-center justify-center w-9 h-9 overflow-hidden transition-all duration-300 group-hover:shadow-md">
              <div className="absolute inset-0 bg-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 transition-all duration-300"></div>
              <Image
                src="/icon-github.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="brightness-200 invert relative z-10"
              />
            </div>
            <span>Cognitia Repository</span>
          </Link>

          <Link
            href="https://x.com/twekaone"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-400 hover:text-white transition group"
          >
            <div className="relative p-2 rounded-full flex items-center justify-center w-9 h-9 overflow-hidden transition-all duration-300 group-hover:shadow-md">
              <div className="absolute inset-0 bg-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 transition-all duration-300"></div>
              <Image
                src="/icon-x.svg"
                alt="Twitter/X"
                width={20}
                height={20}
                className="brightness-200 invert relative z-10"
              />
            </div>
            <span>@twekaone</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
