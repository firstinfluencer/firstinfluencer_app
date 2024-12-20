import { HypeAuditorMetrics } from '@/types/api';

function generateMockPosts() {
  return Array(5).fill(null).map((_, i) => ({
    url: `https://instagram.com/p/mock${i}`,
    likes: Math.floor(Math.random() * 1000) + 500,
    comments: Math.floor(Math.random() * 100) + 20,
    engagement: Math.random() * 3 + 1,
    timestamp: new Date(Date.now() - i * 86400000).toISOString()
  }));
}

export function generateMockMetrics(username: string): HypeAuditorMetrics {
  return {
    username,
    fullName: username.split('.').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    profilePicture: `https://ui-avatars.com/api/?name=${username}&size=200&background=random`,
    followers: Math.floor(Math.random() * 100000) + 10000,
    engagement: Math.random() * 5 + 1,
    bio: "Content Creator | Lifestyle | Fashion",
    isVerified: Math.random() > 0.5,
    categories: ['Lifestyle', 'Fashion'],
    avgLikes: Math.floor(Math.random() * 5000) + 1000,
    avgComments: Math.floor(Math.random() * 500) + 100,
    audienceData: {
      genderSplit: { male: 40, female: 60 },
      topCountries: [
        { country: 'India', percentage: 80 },
        { country: 'USA', percentage: 10 },
        { country: 'UK', percentage: 10 }
      ],
      ageRanges: [
        { range: '18-24', percentage: 40 },
        { range: '25-34', percentage: 40 },
        { range: '35-44', percentage: 20 }
      ]
    },
    recentPosts: generateMockPosts()
  };
}