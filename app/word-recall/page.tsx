import WordRecallTest from "@/components/word-recall/word-recall-test";
import WordRecallHistory from "@/components/word-recall/word-recall-history";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Word Recall Test
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <WordRecallTest />
        </div>
        <div>
          <WordRecallHistory />
        </div>
      </div>
    </main>
  );
}
