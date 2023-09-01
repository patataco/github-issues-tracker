import { forwardRef } from 'react';
import Link from 'next/link';

import { Issue } from '@/context/IssueListProvider';

import { convertDate } from '../utils/index';

const IssueItem = forwardRef<HTMLLIElement, { issue: Issue }>(
  ({ issue }, ref) => {
    const { number, title, user, created_at, comments } = issue;
    const convertedDate = convertDate(created_at);
    return (
      <li ref={ref} className="flex h-[100px] w-full  border-b p-4">
        <div className="flex grow flex-col justify-between">
          <Link href={`/${number}`}>
            <div className="flex w-full items-center gap-4 text-lg font-black">
              {`#${number}`}
              <div className="max-w-[360px] truncate">{title}</div>
            </div>
          </Link>
          <div className="flex gap-4">
            <p>{`작성자: ${user?.login},`}</p>
            <p>{`작성일: ${convertedDate}`}</p>
          </div>
        </div>
        <div className="flex grow items-end justify-end whitespace-nowrap">{`코멘트: ${comments}`}</div>
      </li>
    );
  }
);

IssueItem.displayName = 'IssueItem';
export default IssueItem;
