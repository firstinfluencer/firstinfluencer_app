import { useState } from 'react';
import { getDocument, setDocument, updateDocument, deleteDocument, queryCollection } from '@/services/firebase/db';
import type { CollectionName } from '@/services/firebase/collections';

export function useFirestore(collectionName: CollectionName) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleOperation = async <T>(
    operation: () => Promise<T>,
    errorMessage: string
  ): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const result = await operation();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(errorMessage);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    get: (id: string) => handleOperation(
      () => getDocument(collectionName, id),
      `Failed to get document from ${collectionName}`
    ),
    set: (id: string, data: any) => handleOperation(
      () => setDocument(collectionName, id, data),
      `Failed to set document in ${collectionName}`
    ),
    update: (id: string, data: any) => handleOperation(
      () => updateDocument(collectionName, id, data),
      `Failed to update document in ${collectionName}`
    ),
    delete: (id: string) => handleOperation(
      () => deleteDocument(collectionName, id),
      `Failed to delete document from ${collectionName}`
    ),
    query: (...queryConstraints: any[]) => handleOperation(
      () => queryCollection(collectionName, ...queryConstraints),
      `Failed to query collection ${collectionName}`
    ),
  };
}