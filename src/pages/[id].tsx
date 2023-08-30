import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { octokit } from '@/api/octokit';
import { Issue } from '@/context/OctokitProvider';

const IssueDetails = () => {
  const router = useRouter();
  const id = router.query.id;

  const [issueDetail, setIssueDetail] = useState<Issue | null>(null);

  const fetchIssueDetails = async () => {
    if (id) {
      const { data } = await octokit.request(`GET /issues/${id}`);
      setIssueDetail(data);
    }
  };
  console.log(issueDetail);
  useEffect(() => {
    fetchIssueDetails();
  }, [id]);

  if (!issueDetail) return;
  return (
    <>
      <div>{issueDetail.number}</div>
    </>
  );
};

export default IssueDetails;
