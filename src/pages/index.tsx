import Image from 'next/image';

import { useOctokitContext } from '@/context/OctokitProvider';

import IssueItem from '../components/IssueItem';

export default function Home() {
  const { issues } = useOctokitContext();

  const filteredAndSortedIssues = issues
    .filter((issue) => issue.state === 'open')
    .sort((a, b) => b.comments - a.comments);

  return (
    <>
      <div>안녕하세요</div>
      <ul>
        {filteredAndSortedIssues.length > 0 ? (
          filteredAndSortedIssues.map((issue, index) => {
            const shouldDisplayAd = (index + 1) % 5 === 0;
            return (
              <li key={issue.id}>
                <IssueItem issue={issue} />
                {shouldDisplayAd && (
                  <a href={AD_URl} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={AD_IMG_URL}
                      alt="광고"
                      width={110}
                      height={110}
                    />
                  </a>
                )}
              </li>
            );
          })
        ) : (
          <p>Empty</p>
        )}
      </ul>
    </>
  );
}

const AD_IMG_URL =
  'https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100';

const AD_URl = 'https://www.wanted.co.kr/';
