import { useCallback } from 'react';
import React from 'react';

import { useIssueListContext } from '@/context/IssueListProvider';

import AD from './AD';
import IssueItem from './IssueItem';

const IssueList = () => {
  const { issues, isLoading, hasNextPage, setPageNum, intObserver } =
    useIssueListContext();

  const lastIssueRef = useCallback(
    (issue: HTMLElement | null) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((issues) => {
        if (issues[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });

      if (issue) intObserver.current.observe(issue);
    },
    [isLoading, hasNextPage]
  );
  const shouldDisplayAdd = (i: number) => (i + 1) % 4 === 0;

  return (
    <ul className="p-4">
      {issues.length > 0 ? (
        issues.map((issue, i) => (
          <React.Fragment key={issue.id}>
            <IssueItem
              issue={issue}
              ref={issues.length === i + 1 ? lastIssueRef : null}
            />
            {shouldDisplayAdd(i) && <AD />}
          </React.Fragment>
        ))
      ) : (
        <p>Empty</p>
      )}
    </ul>
  );
};

export default IssueList;
