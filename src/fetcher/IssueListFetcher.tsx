import { PropsWithChildren, useEffect } from 'react';

import LoadingSpinner from '@/components/LoadingSpinner';
import { useIssueListContext } from '@/context/IssueListProvider';

export const IssueListFetcher = ({ children }: PropsWithChildren) => {
  const { isLoading, fetchIssues, pageNum, isInitialLoad } =
    useIssueListContext();

  useEffect(() => {
    console.log(isInitialLoad);
    fetchIssues(pageNum);
  }, [pageNum]);

  if (isInitialLoad || isLoading) {
    return <LoadingSpinner />;
  }
  console.log(isInitialLoad);
  return <>{children}</>;
};
