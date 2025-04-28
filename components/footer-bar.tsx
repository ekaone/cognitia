"use client";

import React from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { marqueeList } from "@/data/marquee-list";

export default function FooterBar() {
  // Define a set of colors to randomly assign to icons
  const iconColors = [
    "#f87171", // red-400
    "#60a5fa", // blue-400
    "#34d399", // green-400
    "#fbbf24", // yellow-400
    "#a78bfa", // purple-400
    "#f472b6", // pink-400
    "#38bdf8", // sky-400
    "#fb7185", // rose-400
    "#4ade80", // emerald-400
    "#facc15", // amber-400
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[40px] bg-black/40 backdrop-blur-[8px] z-30 flex items-center border-b border-white/10">
      <Marquee pauseOnHover speed={50}>
        {marqueeList.map((item, index) => {
          // Pick a random color for each icon (consistent per render)
          const color = iconColors[index % iconColors.length];
          return (
            <div
              key={index}
              className="flex items-center space-x-2 md:space-x-3 mx-8"
            >
              {/* Clone the icon element and inject a color style/prop */}
              {item.icon && React.cloneElement(item.icon, { style: { color } })}
              <span className="text-gray-300 text-sm md:text-base font-medium tracking-wide">
                <Link
                  href={item.link}
                  className="text-gray-300 hover:text-gray-100"
                >
                  {item.title}
                </Link>
              </span>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
}
