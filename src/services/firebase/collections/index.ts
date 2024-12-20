export const COLLECTIONS = {
  API_KEYS: 'api_keys',
  USERS: 'users',
  BRANDS: 'brands',
  CREATORS: 'creators',
  CAMPAIGNS: 'campaigns',
  APPLICATIONS: 'applications',
  INFLUENCER_LISTINGS: 'influencer_listings',
} as const;

export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS];