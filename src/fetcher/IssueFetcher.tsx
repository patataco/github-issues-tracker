import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';

import LoadingSpinner from '@/components/LoadingSpinner';
import { useIssueContext } from '@/context/IssueProvider';

export const IssueFetcher = ({ children }: PropsWithChildren) => {
  const { isLoading, isInitialLoad, fetchIssueDetails } = useIssueContext();
  const router = useRouter();
  const id = Number(router.query.id);

  useEffect(() => {
    fetchIssueDetails(id);
  }, [id]);

  if (isInitialLoad || isLoading) return <LoadingSpinner />;
  return <>{children}</>;
};
