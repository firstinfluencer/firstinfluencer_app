export interface HypeAuditorMetrics {
  username: string;
  fullName: string;
  profilePicture: string;
  followers: number;
  engagement: number;
  bio: string;
  isVerified: boolean;
  categories: string[];
  avgLikes: number;
  avgComments: number;
  audienceData: {
    genderSplit: {
      male: number;
      female: number;
    };
    topCountries: Array<{
      country: string;
      percentage: number;
    }>;
    ageRanges: Array<{
      range: string;
      percentage: number;
    }>;
  };
  recentPosts: Array<{
    url: string;
    likes: number;
    comments: number;
    engagement: number;
    timestamp: string;
  }>;
}

export interface CreatorMetrics {
  username: string;
  fullName: string;
  avatarUrl: string;
  followers: number;
  engagement: number;
  bio: string;
  isVerified: boolean;
  categories: string[];
}