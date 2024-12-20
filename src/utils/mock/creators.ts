import { Creator } from '@/types';

export function generateMockCreators(count: number): Creator[] {
  return Array.from({ length: count }, (_, i) => ({
    uid: `creator-${i}`,
    displayName: `Creator ${i + 1}`,
    email: `creator${i + 1}@example.com`,
    bio: 'Content creator passionate about lifestyle and travel',
    categories: ['Lifestyle', 'Travel', 'Fashion'],
    platforms: {
      instagram: `creator${i + 1}`,
      tiktok: `@creator${i + 1}`,
    },
    followers: {
      instagram: Math.floor(Math.random() * 900000) + 100000,
      tiktok: Math.floor(Math.random() * 500000) + 50000,
    },
    engagementRate: Math.random() * 5 + 2,
    location: 'Mumbai, India',
    previousBrands: ['Brand A', 'Brand B'],
    createdAt: new Date()
  }));
}