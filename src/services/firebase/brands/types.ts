export interface BrandProfile {
  id: string;
  companyName: string;
  email: string;
  industry: string;
  website?: string;
  description?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBrandInput {
  companyName: string;
  email: string;
  industry: string;
  website?: string;
  description?: string;
  location?: string;
}

export interface UpdateBrandInput extends Partial<Omit<BrandProfile, 'id' | 'createdAt' | 'updatedAt'>> {}