import { forwardRef } from 'react';
import Link from 'next/link';

import { Issue } from '@/context/IssueListProvider';

const IssueItem = forwardRef<HTMLLIElement, { issue: Issue }>(
  ({ issue }, ref) => {
    const { number, title, user, updated_at, comments } = issue;

    return (
      <li ref={ref} className=" p-4">
        <div className="flex flex-col gap-4 border-b">
          <div className="flex gap-20">
            <Link href={`/${number}`}>{number}</Link>
            <p>{title}</p>
          </div>
          <div className="flex gap-4">
            <p>{user?.login}</p>
            <p>{updated_at}</p>
            <p>{comments}</p>
          </div>
        </div>
      </li>
    );
  }
);

IssueItem.displayName = 'IssueItem';
export default IssueItem;
