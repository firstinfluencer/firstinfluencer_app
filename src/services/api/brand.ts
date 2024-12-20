import { generateBrandInsights } from './gemini';

export async function getBrandInsights(brandName: string) {
  try {
    const prompt = `
      Analyze the brand "${brandName}" and provide detailed insights for influencer marketing campaigns.
      Include the following sections:
      1. Brand Overview
         - Industry analysis
         - Target audience
         - Brand values and positioning
      2. Campaign Recommendations
         - Content themes
         - Ideal creator profiles
         - Platform strategy
      3. Success Metrics
         - KPIs to track
         - Benchmark metrics
         - ROI expectations
      
      Format the response in clear sections with bullet points.
    `;

    const insights = await generateBrandInsights(prompt);
    return insights;
  } catch (error) {
    console.error('Error getting brand insights:', error);
    throw error;
  }
}