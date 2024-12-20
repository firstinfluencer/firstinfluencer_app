import { HypeAuditorMetrics } from '@/types/api';
import { fetchInstagramProfile } from './instagram';
import { generateMockMetrics } from './mock';

export async function fetchCreatorMetrics(username: string): Promise<HypeAuditorMetrics> {
  try {
    // Fetch Instagram profile data
    const instagramProfile = await fetchInstagramProfile(username);
    
    if (instagramProfile) {
      // Use real Instagram data when available
      return {
        username: instagramProfile.username,
        fullName: instagramProfile.full_name,
        profilePicture: instagramProfile.profile_pic_url_hd,
        followers: instagramProfile.edge_followed_by.count,
        engagement: 0, // Calculate this based on recent posts if needed
        bio: instagramProfile.biography,
        isVerified: instagramProfile.is_verified,
        categories: ['Lifestyle'], // This would need to be determined through content analysis
        avgLikes: 0,
        avgComments: 0,
        audienceData: {
          genderSplit: { male: 45, female: 55 }, // Mock data
          topCountries: [
            { country: 'India', percentage: 80 },
            { country: 'USA', percentage: 10 },
            { country: 'UK', percentage: 10 }
          ],
          ageRanges: [
            { range: '18-24', percentage: 35 },
            { range: '25-34', percentage: 45 },
            { range: '35-44', percentage: 20 }
          ]
        },
        recentPosts: [] // Would need separate API calls to fetch recent posts
      };
    }
    
    // Fallback to mock data if Instagram scraping fails
    return generateMockMetrics(username);
  } catch (error) {
    console.error('Error fetching creator metrics:', error);
    return generateMockMetrics(username);
  }
}