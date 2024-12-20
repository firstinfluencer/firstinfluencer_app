import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createBrand } from '../brands/repository';
import { getCompanyFromEmail } from '@/utils/format';
import { generateBrandInsights } from '@/services/api/gemini';

export async function signUpBrand(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const companyName = getCompanyFromEmail(email);
  
  // Get AI-generated insights about the brand
  const prompt = `Analyze the brand "${companyName}" and provide:
    1. Industry category
    2. Brief description
    3. Target audience
    Format as JSON with fields: industry, description, targetAudience`;
  
  const insights = await generateBrandInsights(prompt);
  const { industry, description } = JSON.parse(insights);

  // Create brand profile with AI-generated data
  await createBrand(userCredential.user.uid, {
    companyName,
    email,
    industry,
    description,
    website: '',
    location: ''
  });

  return userCredential.user;
}