export interface InfluencerListing {
  id: string;
  username: string;
  fullName: string;
  profilePicture: string;
  bio: string;
  category: string[];
  metrics: {
    followers: number;
    engagement: number;
    avgLikes: number;
    avgComments: number;
  };
  platforms: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
  location: string;
  isVerified: boolean;
  createdAt: string;
}