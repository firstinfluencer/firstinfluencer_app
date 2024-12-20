import type { Campaign } from '@/types';

function extractBudget(text: string): number {
  // Look for budget in the Compensation Details section
  const compensationSection = text.split('\n\n')
    .find(section => section.toLowerCase().includes('compensation details'))
    ?.split('\n')
    .find(line => line.toLowerCase().includes('base payment')) || '';

  // Match INR amounts with or without commas and decimals
  const budgetMatch = compensationSection.match(/₹\s*([\d,]+(?:\.\d{2})?)/);
  
  if (budgetMatch) {
    // Remove commas and convert to number
    return parseInt(budgetMatch[1].replace(/,/g, ''));
  }

  // Fallback: Look for any INR amount in the text
  const fallbackMatch = text.match(/₹\s*([\d,]+(?:\.\d{2})?)/);
  if (fallbackMatch) {
    return parseInt(fallbackMatch[1].replace(/,/g, ''));
  }

  // Default budget if no amount found
  return 50000;
}

function extractTitle(text: string): string {
  const lines = text.split('\n');
  const titleLine = lines.find(line => 
    !line.toLowerCase().includes('campaign title') && 
    line.trim().length > 0
  );
  return titleLine?.trim() || 'New Campaign';
}

function extractCategory(text: string): string {
  const contentSection = text.split('\n\n')
    .find(section => 
      section.toLowerCase().includes('content requirements') ||
      section.toLowerCase().includes('brand overview')
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
  const sections = ['content requirements', 'creator tasks', 'deliverables'];
  const requirements: string[] = [];

  const lines = text.split('\n');
  let inRelevantSection = false;

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check if we're entering a relevant section
    if (sections.some(section => 
      trimmedLine.toLowerCase().includes(section)
    )) {
      inRelevantSection = true;
      continue;
    }

    // Check if we're entering a new section (ending the current one)
    if (trimmedLine.endsWith(':') || trimmedLine.match(/^[A-Z][\w\s]+$/)) {
      inRelevantSection = false;
    }

    // Add requirements from relevant sections
    if (inRelevantSection && trimmedLine.startsWith('-')) {
      const requirement = trimmedLine.substring(1).trim();
      if (requirement && !requirements.includes(requirement)) {
        requirements.push(requirement);
      }
    }
  }

  return requirements;
}

export function parseCampaignFromAI(aiResponse: string): Omit<Campaign, 'id' | 'brandId' | 'createdAt'> {
  const budget = extractBudget(aiResponse);
  const title = extractTitle(aiResponse);
  const category = extractCategory(aiResponse);
  const requirements = extractRequirements(aiResponse);

  // Calculate campaign duration (default 30 days if not specified)
  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  return {
    title,
    description: aiResponse,
    budget,
    requirements,
    category,
    status: 'active' as const,
    startDate,
    endDate
  };
}