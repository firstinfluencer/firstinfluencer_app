import type { Campaign } from '@/types';

function extractBudget(text: string): number {
  // Look for per influencer budget in the Compensation Structure section
  const compensationSection = text.split('\n\n')
    .find(section => section.toLowerCase().includes('compensation structure'))
    ?.split('\n')
    .find(line => line.toLowerCase().includes('per influencer budget')) || '';

  // Match INR amounts with or without commas and decimals
  const budgetMatch = compensationSection.match(/₹\s*([\d,]+(?:\.\d{2})?)/);
  
  if (budgetMatch) {
    // Remove commas and convert to number
    return parseInt(budgetMatch[1].replace(/,/g, ''));
  }

  // Default budget if no amount found
  return 50000;
}

function extractTitle(text: string): string {
  const lines = text.split('\n');
  // Find the line after "Campaign Title:"
  const titleIndex = lines.findIndex(line => 
    line.trim().toLowerCase() === 'campaign title:');
  return lines[titleIndex + 1]?.trim() || 'New Campaign';
}

function extractCategory(text: string): string {
  const contentSection = text.split('\n\n')
    .find(section => 
      section.toLowerCase().includes('content requirements') ||
      section.toLowerCase().includes('campaign overview')
    );

  if (contentSection) {
    const categoryMatch = contentSection.match(/category:\s*(.+)/i) ||
                         contentSection.match(/industry:\s*(.+)/i);
    if (categoryMatch) {
      return categoryMatch[1].trim();
    }
  }

  return 'General';
}

function extractRequirements(text: string): string[] {
  const sections = text.split('\n\n');
  const requirements: string[] = [];

  // Look for requirements in Content Requirements and Creator Requirements sections
  const relevantSections = sections.filter(section =>
    section.toLowerCase().includes('requirements') ||
    section.toLowerCase().includes('deliverables')
  );

  relevantSections.forEach(section => {
    const lines = section.split('\n');
    lines.forEach(line => {
      if (line.trim().startsWith('-')) {
        const requirement = line.substring(1).trim();
        if (requirement && !requirements.includes(requirement)) {
          requirements.push(requirement);
        }
      }
    });
  });

  return requirements;
}

function extractBrandName(text: string): string {
  const lines = text.split('\n');
  // Find the line starting with "Brand:"
  const brandLine = lines.find(line => line.trim().startsWith('Brand:'));
  return brandLine?.replace('Brand:', '').trim() || '';
}

export function parseCampaignFromAI(aiResponse: string): Omit<Campaign, 'id' | 'brandId' | 'createdAt'> {
  const budget = extractBudget(aiResponse);
  const title = extractTitle(aiResponse);
  const brandName = extractBrandName(aiResponse);
  
  // Format the description to start with brand and campaign name
  const description = `${brandName}\n${title}\n\n${aiResponse}`;

  // Calculate campaign duration (default 30 days if not specified)
  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  return {
    title,
    description,
    budget,
    requirements: extractRequirements(aiResponse),
    category: extractCategory(aiResponse),
    status: 'active' as const,
    startDate,
    endDate
  };
}