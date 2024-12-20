import axios from 'axios';

const HYPE_AUDITOR_API = 'https://cmp.hypeauditor.com/api/v2/influencers';

interface HypeAuditorResponse {
  // Define the response type based on the API response
  data: {
    username: string;
    fullName: string;
    followers: number;
    engagement: number;
    categories: string[];
    profilePicture: string;
    // Add other relevant fields
  }[];
}

export async function fetchCreatorDetails(username: string) {
  try {
    const response = await axios.post<HypeAuditorResponse>(
      HYPE_AUDITOR_API,
      { urls: `instagram/${username}` },
      {
        headers: {
          'accept': '/',
          'accept-language': 'en',
          'content-type': 'application/json',
          'x-auth-hash': 'a9b76cf11206ffad41986a80f0632c7ec5c33f668faa5502b467580cc8e6ef3',
          'x-auth-id': '2488028',
          'x-csrf-token': 'f3a87d9a:6deaa3dab75be8aa1ad5b61ff3e27244'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching creator details:', error);
    throw error;
  }
}