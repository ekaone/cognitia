# 🧠 Cognitia — a cognitive testing and mental wellness platform

Welcome to **Cognitia** — a cognitive testing and mental wellness platform built to assist with early detection and monitoring of memory-related conditions such as dementia.  

Cognitia offers a range of cognitive tests, including verbal fluency tasks, word recall tests, and digit span tests. The platform leverages AI to analyze user inputs and provide insights into cognitive performance.

The goal is to create a user-friendly and privacy-first experience, ensuring that all data processing occurs locally in the user's browser without storing any personal information on the server.


## 🚀 Live Site  
👉 [Cognitia Space](https://cognitia.space)


## 🧰 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Hosting**: [Vercel](https://vercel.com/)
- **Styling**: [Shadcn UI](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**:
  - [OpenAI GPT API](https://platform.openai.com/)
  - [Gemini AI (Google)](https://ai.google.dev/)


## 🧪 Features

- 🗣️ Verbal Fluency Tasks (type words in a category)
- ⏱️ Word Recall Test (remember and recall words)
- 🧩 Digit Span Test (measures how many numbers (digits) a person can remember and repeat either forward or backward)
- 🤖 AI-Powered analysis of user inputs using OpenAI & Gemini
- 🔒 Data Privacy and Security
  - No data is stored on the server
  - All processing happens locally in your browser
- 🔒 User-friendly


## 📦 Getting Started

1. **Clone the repository**:

```bash
git clone https://github.com/ekaone/cognitia.git
cd cognitia
pnpm install
pnpm run dev
```

2. **Set up environment variables**:  
   Create a `.env.local` file in the root directory and add your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
```
⚠️ Keep these keys private and secure.

## 💡 Future Features
- 🗣️ Voice-based tasks (speak words in a category)
- 📊 Progress tracking and cognitive reports
- 🧬 Integration with wearable/health data (long-term)
- 🌐 Multi-language support

## 🧑‍💻 Author
Built with ❤️ by [@twekaone](https://twitter.com/twekaone)