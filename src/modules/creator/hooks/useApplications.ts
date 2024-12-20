import { useState, useEffect } from 'react';
import { useFirestore } from '@/hooks/useFirestore';
import { Application } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { where } from 'firebase/firestore';

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { queryDocuments, addDocument } = useFirestore('applications');

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.uid) return;
      try {
        const results = await queryDocuments(where('creatorId', '==', user.uid));
        setApplications(results as Application[]);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const submitApplication = async (
    campaignId: string,
    brandId: string,
    proposal: string,
    rate: number
  ) => {
    if (!user?.uid) return;
    try {
      const applicationId = crypto.randomUUID();
      const application: Application = {
        id: applicationId,
        campaignId,
        creatorId: user.uid,
        brandId,
        status: 'pending',
        proposal,
        rate,
        createdAt: new Date()
      };
      await addDocument(applicationId, application);
      setApplications([...applications, application]);
      return application;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  };

  return { applications, loading, submitApplication };
}