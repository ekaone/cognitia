# 🧠 Cognitia — a cognitive testing and mental wellness platform

> ⚠️ **Work in Progress**: This project is currently under active development. Features and functionality may change as we continue to improve the platform.

Welcome to **Cognitia** — a cognitive testing and mental wellness platform built to assist with early detection and monitoring of memory-related conditions such as dementia.  

Cognitia offers a range of cognitive tests, including verbal fluency tasks, word recall tests, and digit span tests. The platform leverages AI to analyze user inputs and provide insights into cognitive performance.

The goal is to create an AI-powered, user-friendly, and privacy-first experience, where all data processing occurs locally in the user's browser—ensuring that no personal information is stored or transmitted to any server. The AI will act as a personal assistant for each user, providing intelligent support and real-time interactions while maintaining full user control and data confidentiality.


## 🚀 Live Site  
👉 [Cognitia Space](https://cognitia.space)


## 🧰 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Hosting**: [Vercel](https://vercel.com/)
- **Styling**: [Shadcn UI](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**:
  - [OpenAI GPT API](https://platform.openai.com/)
  - [ElevenLabs](https://elevenlabs.io/)
- **AI Tool**: [Vercel AI SDK](https://sdk.vercel.ai/)


## 🧪 Features

- 🗣️ Verbal Fluency Tasks (type words in a category)
- ⏱️ Word Recall Test (remember and recall words)
- 🧩 Digit Span Test (measures how many numbers (digits) a person can remember and repeat either forward or backward)
- 🤖 AI-Powered analysis of user inputs using [OpenAI](https://platform.openai.com/)
- 🤖 AI-Powered voice assistant using [ElevenLabs](https://elevenlabs.io/) -- ⚠️currently disabled, see [VoiceCall.tsx](https://github.com/ekaone/cognitia/blob/main/components/voice-call/voice-call.tsx)
- 🔒 Data Privacy and Security
  - No data is stored on the server
  - All processing happens locally in your browser


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
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# ElevenLabs
AGENT_ID="your_agent_id"
ELEVENLABS_API_KEY="your_elevenlabs_api_key"
```
⚠️ Keep these keys private and secure.

## 💡 Future Features
- 🗣️ Voice-based tasks (speak words in a category)
- 📊 Progress tracking and cognitive reports
- 🧬 Integration with wearable/health data (long-term)
- 🌐 Multi-language support

## 🧑‍💻 Author
Built with ❤️ by [@twekaone](https://twitter.com/twekaone)