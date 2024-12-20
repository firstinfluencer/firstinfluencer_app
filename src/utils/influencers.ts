import { Creator } from '@/types';

export function categorizeInfluencers(creators: Creator[]) {
  return {
    nano: creators.filter(c => c.followers.instagram < 10000),
    micro: creators.filter(c => c.followers.instagram >= 10000 && c.followers.instagram < 100000),
    macro: creators.filter(c => c.followers.instagram >= 100000 && c.followers.instagram < 1000000),
    mega: creators.filter(c => c.followers.instagram >= 1000000)
  };
}

export function getTopCreatorsByEngagement(creators: Creator[], count: number) {
  return [...creators]
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, count);
}

export function getRecommendedBudget(followerCount: number): number {
  if (followerCount < 10000) return 10000; // ₹10,000 for nano
  if (followerCount < 100000) return 25000; // ₹25,000 for micro
  if (followerCount < 1000000) return 100000; // ₹100,000 for macro
  return 500000; // ₹500,000 for mega
}