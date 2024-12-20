/**
 * Format email domain into company name
 */
export function getCompanyFromEmail(email: string): string {
  const domain = email.split('@')[1];
  if (!domain) return '';
  
  // Extract company name from domain (before the first dot)
  const companyName = domain.split('.')[0];
  
  // Convert hyphens/underscores to spaces and capitalize each word
  return companyName
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Convert string to title case
 */
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}