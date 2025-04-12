import WordRecallTest from "@/components/word-recall-test";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Word Recall Test</h1>
      <WordRecallTest />
    </main>
  );
}
