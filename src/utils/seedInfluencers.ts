import { addInfluencerListing } from '../services/firebase/influencers';

const sampleInfluencers = [
  {
    username: 'travel.with.sarah',
    fullName: 'Sarah Johnson',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Travel enthusiast | Photography lover | Adventure seeker',
    category: ['Travel', 'Photography', 'Lifestyle'],
    metrics: {
      followers: 125000,
      engagement: 4.8,
      avgLikes: 5200,
      avgComments: 320
    },
    platforms: {
      instagram: 'travel.with.sarah',
      tiktok: '@travelwithsarah'
    },
    location: 'Los Angeles, CA',
    isVerified: true
  },
  {
    username: 'foodie.mike',
    fullName: 'Mike Chen',
    profilePicture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    bio: 'Food blogger | Recipe creator | Restaurant explorer',
    category: ['Food', 'Cooking', 'Lifestyle'],
    metrics: {
      followers: 89000,
      engagement: 5.2,
      avgLikes: 4100,
      avgComments: 280
    },
    platforms: {
      instagram: 'foodie.mike',
      youtube: 'FoodieMikeTV'
    },
    location: 'New York, NY',
    isVerified: false
  }
];

export async function seedInfluencerListings() {
  try {
    const promises = sampleInfluencers.map(influencer => 
      addInfluencerListing(influencer)
    );
    await Promise.all(promises);
    console.log('Successfully seeded influencer listings');
  } catch (error) {
    console.error('Error seeding influencer listings:', error);
    throw error;
  }
}