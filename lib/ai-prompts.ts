export const validateWordsPrompt = (words: string[], category: string) => {
  return `
You are an AI assistant helping with a verbal fluency task. You need to be very strict and accurate in your validation.

The user has been asked to name as many items as possible from the category: "${category}".

Here is the list of words they provided:
${words.join(", ")}

Please analyze this list and provide the following in JSON format:
1. validWords: An array of words that DEFINITELY and STRICTLY belong to the category. For categories like countries, animals, etc., only include words that are actual members of that category.
2. invalidWords: An array of words that do not belong to the category. Include ANY words that are not clearly and undeniably members of the specified category.
3. similarWords: An array of objects with "word1" and "word2" properties, identifying pairs of words that are semantically very similar or duplicates (e.g., "dog" and "puppy")

Be especially careful with made-up or nonsense words - these should ALWAYS be classified as invalid.
For categories like "countries," only include actual, internationally recognized countries.
For other categories, apply similarly strict criteria.

Return ONLY the JSON object with these three arrays, nothing else.

Example response format:
{
  "validWords": ["word1", "word2"],
  "invalidWords": ["word3"],
  "similarWords": [{"word1": "word4", "word2": "word5"}]
}
`;
};

export const provideFeedbackPrompt = (
  words: string[],
  category: string,
  timeLimit: number,
  validWords: string[],
  invalidWords: string[]
) => {
  return `
You are an AI assistant analyzing a user's performance on a verbal fluency task.

Task details:
- Category: ${category}
- Time limit: ${timeLimit} seconds
- Total words entered: ${words.length}
- Valid words: ${validWords.length}
- Invalid words: ${invalidWords.length}

Valid words: ${validWords.join(", ")}
Invalid words: ${invalidWords.join(", ")}

Please analyze the performance and provide feedback in JSON format with the following:
1. score: A numerical score from 0-100 based on quantity, quality, and creativity of valid responses
2. feedback: A short, encouraging paragraph (2-3 sentences) about their performance
3. creativity: A rating of "low", "medium", or "high" based on the uniqueness of their responses
4. suggestions: An array of 2-3 short suggestions for improvement

IMPORTANT: Return ONLY the raw JSON object, with no markdown formatting, no code blocks, and no backticks. Just the plain JSON.

Example response format:
{
  "score": 75,
  "feedback": "Great job naming animals! You showed good variety in your responses.",
  "creativity": "medium",
  "suggestions": ["Try to think of more exotic animals", "Group animals by habitat to recall more"]
}
`;
};
