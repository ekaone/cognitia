import { ClipboardList, Route, Clock } from "lucide-react";

export const upcomingFeatures = [
  {
    icon: <ClipboardList className="w-8 h-8" />,
    title: "MMSE/MoCA",
    description:
      "Designing form UI and scoring logic for comprehensive cognitive assessment.",
    gradient: "from-purple-600 to-pink-600",
    status: "In Development",
  },
  {
    icon: <Route className="w-8 h-8" />,
    title: "Reaction Time",
    description: "Interactive UI for Implementing accurate timer.",
    gradient: "from-blue-600 to-cyan-600",
    status: "Coming Soon",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Clock Drawing",
    description:
      "Canvas drawing interface with AI-powered analysis for detailed assessment.",
    gradient: "from-green-600 to-emerald-600",
    status: "In Development",
  },
];
