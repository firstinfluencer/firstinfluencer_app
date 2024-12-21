import { getCompanyFromEmail } from '../format/text';

export function generateCampaignPrompt(prompt: string, email?: string | null): string {
  const brandName = email ? getCompanyFromEmail(email) : 'the brand';
  
  return `
    Create a detailed influencer campaign brief with the following structure:

    Brand: ${brandName}
    Industry: [One line about the brand's industry]

    Campaign Title: [A clear, concise title]

    Campaign Overview:
    - Primary objective
    - Target audience
    - Key message points

    Content Requirements:
    - Required content formats
    - Number of deliverables
    - Key visual elements
    - Brand elements to include

    Creator Requirements:
    - Follower range
    - Engagement rate
    - Niche focus
    - Location preferences

    Timeline:
    - Campaign start date
    - Campaign end date
    - Content submission deadline
    - Review process
    - Publishing schedule

    Compensation:
    - Per creator budget: [Amount in INR]
    - Performance bonuses
    - Payment terms

    Success Metrics:
    - Target engagement rate
    - Expected reach
    - Key performance indicators

    Original request: ${prompt}

    Note: Use plain text without any formatting. Use dashes for lists and colons for labels.
  `;
}