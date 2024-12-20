export const firebaseRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // API Keys collection
    match /api_keys/{document=**} {
      allow read: if isSignedIn();
      allow write: if false; // Only allow admin writes through backend
    }

    // Campaigns collection
    match /campaigns/{campaignId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn() && request.resource.data.brandId == request.auth.uid;
      allow update, delete: if isSignedIn() && resource.data.brandId == request.auth.uid;
    }

    // Brand profiles
    match /brands/{brandId} {
      allow read: if isSignedIn();
      allow write: if isSignedIn() && isOwner(brandId);
    }

    // Creator profiles
    match /creators/{creatorId} {
      allow read: if isSignedIn();
      allow write: if isSignedIn() && isOwner(creatorId);
    }
  }
}`;