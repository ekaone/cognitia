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
