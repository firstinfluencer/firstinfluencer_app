import { getApiKeys } from '../firebase/config';
import { generateCampaignPrompt } from '@/utils/prompts/campaignPrompt';
import { getBrandProfile } from '../firebase/brands/repository';

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

export async function generateCampaignSuggestions(prompt: string, uid: string | undefined): Promise<string> {
  try {
    // Get brand profile if UID is available
    const brandProfile = uid ? await getBrandProfile(uid) : null;
    
    // Generate enhanced prompt using brand profile data
    const enhancedPrompt = generateCampaignPrompt(prompt, brandProfile);
    
    return callGeminiAPI(enhancedPrompt);
  } catch (error) {
    console.error('Error generating campaign suggestions:', error);
    throw error;
  }
}