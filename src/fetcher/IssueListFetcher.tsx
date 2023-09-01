import { PropsWithChildren, useEffect } from 'react';

import LoadingSpinner from '@/components/LoadingSpinner';
import { useIssueListContext } from '@/context/IssueListProvider';

export const IssueListFetcher = ({ children }: PropsWithChildren) => {
  const { isLoading, fetchIssues, pageNum, isInitialLoad } =
    useIssueListContext();

  useEffect(() => {
    fetchIssues(pageNum);
  }, [pageNum]);

  if (isInitialLoad) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {children}
      {isLoading && <LoadingSpinner />}
    </>
  );
};
