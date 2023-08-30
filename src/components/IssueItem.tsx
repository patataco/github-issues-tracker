import Link from 'next/link';

import { Issue } from '@/context/OctokitProvider';

const IssueItem = ({ issue }: { issue: Issue }) => {
  const { number } = issue;

  return (
    <li>
      <Link href={`/${number}`}>{number}</Link>
    </li>
  );
};

export default IssueItem;
