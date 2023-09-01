import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';

import LoadingSpinner from '@/components/LoadingSpinner';
import { useIssueContext } from '@/context/IssueProvider';

export const IssueFetcher = ({ children }: PropsWithChildren) => {
  const { isLoading, isInitialLoad, fetchIssueDetails } = useIssueContext();
  const router = useRouter();
  const validateId = () => {
    if (!router.isReady) return null;

    const convertedId = Number(router.query.id);
    if (isNaN(convertedId)) {
      throw new Error('잘못된 ID입니다.');
    }
    return convertedId;
  };
  const issueId = validateId();

  useEffect(() => {
    if (issueId !== null) {
      fetchIssueDetails(issueId);
    }
  }, [issueId]);

  if (isInitialLoad || isLoading) return <LoadingSpinner />;
  return <>{children}</>;
};
