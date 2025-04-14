import { Activity, History } from "lucide-react";
import TMTWrapper from "@/components/trail-making/tmt-wrapper";
import ScoreHistorySection from "@/components/trail-making/score-history-section";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-8 w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="w-full max-w-5xl space-y-8">
        <div className="flex justify-center w-full">
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              TrailMaking
            </h1>
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-center pb-2 mb-2 bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
          Trail Making Test
        </h1>
        <p className="text-center text-emerald-200/90 mb-8 font-medium">
          A cognitive assessment tool to measure visual attention and task
          switching
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main TMT Test Area - Takes full width on large screens */}
          <div className="lg:col-span-2">
            <TMTWrapper />
          </div>
        </div>

        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="fixed bottom-6 right-6 flex items-center justify-center border-emerald-200 text-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 h-12 w-12 rounded-full shadow-lg"
            >
              <History className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-center">
              <DrawerTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                Performance History
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-4 overflow-auto max-w-md mx-auto">
              <ScoreHistorySection />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
