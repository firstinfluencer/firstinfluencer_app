import { getCompanyFromEmail } from '../format';
import type { Brand } from '@/types';

export function generateCampaignPrompt(prompt: string, brandProfile: Brand | null): string {
  const companyName = brandProfile?.companyName || 'the brand';
  const industry = brandProfile?.industry || 'unspecified industry';
  const companyType = brandProfile?.companyType || '';
  const revenue = brandProfile?.annualRevenue || '';

  return `
    Create a detailed influencer campaign brief for ${companyName}, a ${companyType} in the ${industry} industry with annual revenue of ${revenue}.
    Present the information in clear sections without using asterisks (*) or hash symbols (#).
    Use simple bullet points (-) for lists.
    Format all monetary values in Indian Rupees (₹).

    Structure the response as follows:

    Campaign Title
    [A clear, concise title that reflects ${companyName}'s campaign message]

    Brand Overview
    - ${companyName}'s industry and background
    - Brand values and mission
    - Target audience alignment based on ${industry} market
    - Specific considerations for ${companyType} business model

    Content Requirements
    - Required content formats (Reels, Stories, Posts)
    - Number of deliverables
    - Key visual elements to include
    - Mandatory brand elements

    Creator Tasks
    - Detailed list of required actions
    - Content creation guidelines
    - Specific hashtags to use
    - Posting schedule and timing
    - Do's and don'ts

    Engagement Guidelines
    - Expected engagement style
    - Comment response requirements
    - Story interaction requirements
    - Community engagement expectations

    Deliverables Timeline
    - Content submission deadlines
    - Review process details
    - Publishing schedule
    - Campaign duration

    Compensation Details
    - Base payment in INR (scaled appropriately for ${revenue} revenue range)
    - Performance bonuses (if any)
    - Payment schedule
    - Additional perks or benefits

    Success Metrics
    - Target engagement rate
    - Expected reach goals
    - Key performance indicators
    - Reporting requirements

    Original request: ${prompt}

    Note: Keep the response clean and professional, focusing on actionable tasks and clear expectations for the creator.
  `;
}