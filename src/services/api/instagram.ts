import axios from 'axios';
import { generateMockMetrics } from './mock';

interface InstagramProfile {
  username: string;
  full_name: string;
  biography: string;
  edge_followed_by: { count: number };
  is_verified: boolean;
}

export async function fetchInstagramProfile(username: string) {
  try {
    // Due to Instagram API limitations in the browser, return mock data
    return generateMockMetrics(username);
  } catch (error) {
    console.error(`Error fetching Instagram profile for ${username}:`, error);
    return generateMockMetrics(username);
  }
}