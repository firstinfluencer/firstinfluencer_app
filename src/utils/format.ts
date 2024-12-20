// Re-export all formatting functions from a single entry point
export { formatNumber, formatCurrency, formatPercentage } from './format/number';
export { formatDate, formatRelativeTime } from './format/date';
export { getCompanyFromEmail, truncateText, toTitleCase } from './format/text';