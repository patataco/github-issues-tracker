import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

import { useIssueListContext } from '@/context/IssueListProvider';

import IssueItem from '../components/IssueItem';

export default function Home() {
  const { issues, isLoading, hasNextPage, setPageNum } = useIssueListContext();
  const [error, setError] = useState<Error>();
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

  if (error) {
    throw error;
  }

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
      <button
        onClick={() => {
          setError(new Error('hihi'));
        }}
      >
        error
      </button>
      <ul className="p-8">{issues.length > 0 ? items : <p>Empty</p>}</ul>
      {isLoading && <p>Loading More Issues...</p>}
    </>
  );
}

const AD_IMG_URL =
  'https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100';

const AD_URl = 'https://www.wanted.co.kr/';
