"use client";

import {
  Brain,
  ClipboardCheck,
  Users,
  BookOpen,
  MessageSquare,
  Hash,
  Route,
  Clock,
  Stethoscope,
  Smartphone,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useState } from "react";

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  return (
    <div id="faq" className="max-w-7xl mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-gray-50 text-4xl font-bold sm:text-5xl mb-6">
          FAQs
        </h2>
        <p className="text-xl text-gray-300">
          Common questions about Cognitia and cognitive assessment
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
          value={openItem}
          onValueChange={setOpenItem}
        >
          <AccordionItem
            value="item-1"
            className="group bg-gray-900/50 rounded-xl border border-gray-800 px-6 mb-4 relative overflow-hidden"
          >
            {openItem === "item-1" && (
              <BorderBeam
                duration={4}
                size={300}
                reverse
                className="bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              />
            )}
            <AccordionTrigger className="text-xl font-semibold text-gray-100 hover:text-gray-300">
              <div className="flex items-center gap-4">
                <Brain className="w-6 h-6 text-purple-500" />
                What is Cognitia and how does it help with dementia screening?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-lg text-left">
              Cognitia is an AI-powered app designed to assess and monitor
              cognitive functions such as memory, attention, and verbal fluency.
              It supports early detection of dementia-related changes through
              interactive, research-backed tests.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="group bg-gray-900/50 rounded-xl border border-gray-800 px-6 mb-4 relative overflow-hidden"
          >
            {openItem === "item-2" && (
              <BorderBeam
                duration={4}
                size={300}
                reverse
                className="bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              />
            )}
            <AccordionTrigger className="text-xl font-semibold text-gray-100 hover:text-gray-300">
              <div className="flex items-center gap-4">
                <ClipboardCheck className="w-6 h-6 text-blue-500" />
                How accurate are the cognitive assessments in Cognitia?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-lg text-left">
              Cognitia uses clinically-informed tests commonly used in
              neuropsychology, enhanced by AI for consistent and reliable
              scoring. While not a diagnostic tool, it provides valuable insight
              for early intervention and tracking.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="group bg-gray-900/50 rounded-xl border border-gray-800 px-6 mb-4 relative overflow-hidden"
          >
            {openItem === "item-3" && (
              <BorderBeam
                duration={4}
                size={300}
                reverse
                className="bg-gradient-to-r from-transparent via-green-500 to-transparent"
              />
            )}
            <AccordionTrigger className="text-xl font-semibold text-gray-100 hover:text-gray-300">
              <div className="flex items-center gap-4">
                <Users className="w-6 h-6 text-green-500" />
                Who can use Cognitia?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-lg text-left">
              Cognitia is built for caregivers, healthcare professionals, and
              individuals interested in monitoring cognitive health. It is
              designed to be user-friendly for both older adults and clinicians.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="group bg-gray-900/50 rounded-xl border border-gray-800 px-6 mb-4 relative overflow-hidden"
          >
            {openItem === "item-4" && (
              <BorderBeam
                duration={4}
                size={200}
                reverse
                className="bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
              />
            )}
            <AccordionTrigger className="text-xl font-semibold text-gray-100 hover:text-gray-300">
              <div className="flex items-center gap-4">
                <BookOpen className="w-6 h-6 text-yellow-500" />
                What is the Word Recall Test used for?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-lg text-left">
              This test evaluates short-term memory by asking users to remember
              and recall a list of words after a brief interval. It helps detect
              early signs of memory loss.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="group bg-gray-900/50 rounded-xl border border-gray-800 px-6 mb-4 relative overflow-hidden"
          >
            {openItem === "item-5" && (
              <BorderBeam
                duration={4}
                size={200}
                reverse
                className="bg-gradient-to-r from-transparent via-pink-500 to-transparent"
              />
            )}
            <AccordionTrigger className="text-xl font-semibold text-gray-100 hover:text-gray-300">
              <div className="flex items-center gap-4">
                <MessageSquare className="w-6 h-6 text-pink-500" />
                What does the Verbal Fluency Task assess?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-lg text-left">
              It measures language ability and executive function by asking
              users to name as many words as possible from a category or
              starting letter within a limited time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-6"
            className="group bg-gray-900/50 rounded-xl border border-gray-800 px-6 mb-4 relative overflow-hidden"
          >
            {openItem === "item-6" && (
              <BorderBeam
                duration={4}
                size={200}
                reverse
                className="bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
              />
            )}
            <AccordionTrigger className="text-xl font-semibold text-gray-100 hover:text-gray-300">
              <div className="flex items-center gap-4">
                <Hash className="w-6 h-6 text-indigo-500" />
                How does the Digit Span Test work?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-lg text-left">
              This test assesses working memory by asking users to repeat number
              sequences forward and backward. It&apos;s a simple yet effective
              measure of attention and short-term memory.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-7"
            className="group bg-gray-900/50 rounded-xl border border-gray-800 px-6 mb-4 relative overflow-hidden"
          >
            {openItem === "item-7" && (
              <BorderBeam
                duration={4}
                size={200}
                reverse
                className="bg-gradient-to-r from-transparent via-red-500 to-transparent"
              />
            )}
            <AccordionTrigger className="text-xl font-semibold text-gray-100 hover:text-gray-300">
              <div className="flex items-center gap-4">
                <Route className="w-6 h-6 text-red-500" />
                What is the Trail Making Test used for?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-lg text-left">
              The Trail Making Test examines visual attention, processing speed,
              and cognitive flexibility. Users are asked to connect a sequence
              of numbers or letters in the correct order.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-8"
            className="group bg-gray-900/50 rounded-xl border border-gray-800 px-6 mb-4 relative overflow-hidden"
          >
            {openItem === "item-8" && (
              <BorderBeam
                duration={4}
                size={200}
                reverse
                className="bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
              />
            )}
            <AccordionTrigger className="text-xl font-semibold text-gray-100 hover:text-gray-300">
              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-cyan-500" />
                Is Cognitia suitable for tracking cognitive changes over time?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-lg text-left">
              Yes, Cognitia allows for repeated testing, making it useful for
              observing changes and trends in cognitive performance over weeks
              or months.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-9"
            className="group bg-gray-900/50 rounded-xl border border-gray-800 px-6 mb-4 relative overflow-hidden"
          >
            {openItem === "item-9" && (
              <BorderBeam
                duration={4}
                size={300}
                reverse
                className="bg-gradient-to-r from-transparent via-orange-500 to-transparent"
              />
            )}
            <AccordionTrigger className="text-xl font-semibold text-gray-100 hover:text-gray-300">
              <div className="flex items-center gap-4">
                <Stethoscope className="w-6 h-6 text-orange-500" />
                Can I use Cognitia results for medical diagnosis?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-lg text-left">
              Cognitia provides helpful insights but is not a substitute for
              professional medical evaluation. Always consult a healthcare
              provider for official diagnosis and treatment planning.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-10"
            className="group bg-gray-900/50 rounded-xl border border-gray-800 px-6 mb-4 relative overflow-hidden"
          >
            {openItem === "item-10" && (
              <BorderBeam
                duration={4}
                size={200}
                reverse
                className="bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
              />
            )}
            <AccordionTrigger className="text-xl font-semibold text-gray-100 hover:text-gray-300">
              <div className="flex items-center gap-4">
                <Smartphone className="w-6 h-6 text-emerald-500" />
                Is Cognitia accessible for older adults?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-lg text-left pb-4">
              Yes, the app is designed with a simple, intuitive interface and
              clear instructions to ensure ease of use for older individuals and
              those unfamiliar with technology.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
