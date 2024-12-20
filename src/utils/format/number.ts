/**
 * Format large numbers into human-readable format with K/M suffixes
 */
export function formatNumber(num: number | undefined): string {
  if (num === undefined || num === null) return '0';
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

const USD_TO_INR = 83; // Current approximate exchange rate

/**
 * Format currency in INR
 */
export function formatCurrency(amount: number): string {
  const inrAmount = Math.round(amount * USD_TO_INR);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(inrAmount);
}

/**
 * Format percentage with specified decimal places
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}