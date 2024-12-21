import { getApiKeys } from '../firebase/config';
import { generateCampaignPrompt } from '@/utils/prompts/campaignPrompt';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

async function callGeminiAPI(prompt: string): Promise<string> {
  try {
    const apiKeys = await getApiKeys();
    if (!apiKeys?.gemini) {
      throw new Error('Gemini API key not found');
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeys.gemini}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate content');
    }

    const data: GeminiResponse = await response.json();
    return data.candidates[0]?.content.parts[0]?.text || 'No content available';
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

export async function generateCampaignSuggestions(prompt: string, email?: string | null): Promise<string> {
  const enhancedPrompt = generateCampaignPrompt(prompt, email);
  return callGeminiAPI(enhancedPrompt);
}

export async function generateBrandInsights(prompt: string): Promise<string> {
  return callGeminiAPI(prompt);
}