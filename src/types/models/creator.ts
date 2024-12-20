import { Timestamp } from 'firebase/firestore';

export interface Creator {
  id: string;
  fullName: string;
  email: string;
  bio?: string;
  categories: string[];
  platforms: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
  location?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CreateCreatorInput = Omit<Creator, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCreatorInput = Partial<Omit<Creator, 'id' | 'createdAt' | 'updatedAt'>>;