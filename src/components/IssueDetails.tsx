import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';

import { useIssueContext } from '@/context/IssueProvider';

const IssueDetails = () => {
  const { issueDetail } = useIssueContext();

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
