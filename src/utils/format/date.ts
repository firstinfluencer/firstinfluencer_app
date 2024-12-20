/**
 * Format date for input[type="date"] fields
 */
export function formatDateForInput(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }
  return date.toISOString().split('T')[0];
}

/**
 * Format date with various output options
 */
export function formatDate(date: Date | string, format: string = 'long'): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    
    if (format === 'yyyy-MM-dd') {
      return formatDateForInput(dateObj);
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: format === 'long' ? 'long' : 'numeric',
      day: 'numeric',
    }).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }

    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days === 1 ? '' : 's'} ago`;
    if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    if (minutes > 0) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    return 'Just now';
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return 'Invalid date';
  }
}