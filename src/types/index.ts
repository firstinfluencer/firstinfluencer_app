export interface User {
  uid: string;
  email: string;
  displayName?: string;
  userType: 'brand' | 'creator';
  createdAt: Date;
}

export interface Campaign {
  id: string;
  brandId: string;
  title: string;
  description: string;
  budget: number;
  requirements: string[];
  category: string;
  status: 'draft' | 'active' | 'completed';
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

export interface Creator {
  uid: string;
  displayName: string;
  email: string;
  bio: string;
  categories: string[];
  platforms: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
  followers: {
    instagram?: number;
    tiktok?: number;
    youtube?: number;
  };
  engagementRate: number;
  location: string;
  previousBrands: string[];
  createdAt: Date;
}

export interface Brand {
  uid: string;
  companyName: string;
  email: string;
  industry: string;
  website?: string;
  description: string;
  location: string;
  createdAt: Date;
}

export interface Application {
  id: string;
  campaignId: string;
  creatorId: string;
  brandId: string;
  status: 'pending' | 'accepted' | 'rejected';
  proposal: string;
  rate: number;
  createdAt: Date;
}