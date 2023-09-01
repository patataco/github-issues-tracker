import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';

import { useIssueContext } from '@/context/IssueProvider';
import { convertDate } from '@/utils';

const IssueDetails = () => {
  const { issueDetail } = useIssueContext();

  if (!issueDetail) return;

  const { number, title, user, created_at, comments, body } = issueDetail;
  const convertedDate = convertDate(created_at);

  return (
    <article className="mt-4 p-4">
      <div className="flex gap-4 border-b pb-4">
        <Image
          src={user?.avatar_url || DEFAULT_IMAGE_URL}
          alt="프로필"
          width={80}
          height={80}
        />
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-2 text-2xl font-black">
            <div>{`#${number}`}</div>
            <div>{title}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <p>{`작성자: ${user?.login},`}</p>
              <p>{`작성일: ${convertedDate}`}</p>
            </div>
            <div className="flex items-end justify-end whitespace-nowrap">{`코멘트: ${comments}`}</div>
          </div>
        </div>
      </div>
      <section className="px-10 pt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown-body">
          {body as string}
        </ReactMarkdown>
      </section>
    </article>
  );
};

export default IssueDetails;

const DEFAULT_IMAGE_URL = '/path/to/default/image.png';
