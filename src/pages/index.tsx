import { useCallback, useRef } from 'react';
import Image from 'next/image';

import { useOctokitContext } from '@/context/OctokitProvider';

import IssueItem from '../components/IssueItem';

export default function Home() {
  const { issues, isLoading, isError, error, hasNextPage, setPageNum } =
    useOctokitContext();

  const intObserver = useRef<IntersectionObserver>();
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

  if (isError && error) return <p>Error: {error.message}</p>;

  const items = issues.map((issue, i) => {
    const shouldDisplayAdd = (i + 1) % 5 === 0;

    if (shouldDisplayAdd) {
      return (
        <a
          href={AD_URl}
          target="_blank"
          rel="noopener noreferrer"
          key={issue.id}
        >
          <Image
            src={AD_IMG_URL}
            alt="광고"
            width={110}
            height={110}
            className="p-4"
          />
        </a>
      );
    } else if (issues.length === i + 1) {
      return <IssueItem issue={issue} key={issue.id} ref={lastIssueRef} />;
    } else {
      return <IssueItem issue={issue} key={issue.id} />;
    }
  });

  return (
    <>
      <ul className="p-8">{issues.length > 0 ? items : <p>Empty</p>}</ul>
      {isLoading && <p>Loading More Issues...</p>}
    </>
  );
}

const AD_IMG_URL =
  'https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100';

const AD_URl = 'https://www.wanted.co.kr/';
