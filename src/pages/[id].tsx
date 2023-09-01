import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { useRouter } from 'next/router';
import remarkGfm from 'remark-gfm';

import { useIssueContext } from '@/context/IssueProvider';

const IssueDetails = () => {
  const { issueDetail, fetchIssueDetails, setIssueDetail } = useIssueContext();
  const router = useRouter();
  const id = Number(router.query.id);
  console.log(issueDetail);

  const fetchIssueItem = async (id: number) => {
    try {
      const data = await fetchIssueDetails(id);
      setIssueDetail(data);
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
      <section className=" px-10">
        {!body && <p className="text-center">등록된 이슈가 없습니다.</p>}
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown-body">
          {body as string}
        </ReactMarkdown>
      </section>
      <div>{updated_at}</div>
      <div>{comments}</div>
    </>
  );
};

export default IssueDetails;

const DEFAULT_IMAGE_URL = '/path/to/default/image.png';
