import { Timestamp } from 'firebase/firestore';

export interface Brand {
  id: string;
  companyName: string;
  email: string;
  industry?: string;
  website?: string;
  description?: string;
  location?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CreateBrandInput = Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateBrandInput = Partial<Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>>;