import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useOctokitContext } from '@/context/OctokitProvider';

const IssueDetails = () => {
  const { issueDetail, fetchIssueDetails } = useOctokitContext();
  const router = useRouter();
  const id = router.query.id;
  console.log(issueDetail);

  const fetchIssueItem = async (id: string | string[]) => {
    try {
      fetchIssueDetails(id);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) {
      fetchIssueItem(id);
    }
  }, [id]);

  if (!issueDetail) return;

  const { number, title, user, updated_at, comments, body } = issueDetail;

  return (
    <>
      <div>{number}</div>
      <div>{title}</div>
      <Image
        src={user?.avatar_url || DEFAULT_IMAGE_URL}
        alt="프로필"
        width={80}
        height={80}
      />
      <div>{body}</div>
      <div>{updated_at}</div>
      <div>{comments}</div>
    </>
  );
};

export default IssueDetails;

const DEFAULT_IMAGE_URL = '/path/to/default/image.png';
