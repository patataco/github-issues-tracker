import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@/styles/markdown.css';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { IssueListContextProvider } from '@/context/IssueListProvider';
import { IssueContextProvider } from '@/context/IssueProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary
      renderFallback={(props) => (
        <div>
          에러가 발생했습니다. <button onClick={props.reset}>재시도</button>
        </div>
      )}
    >
      <IssueListContextProvider>
        <IssueContextProvider>
          <Component {...pageProps} />
        </IssueContextProvider>
      </IssueListContextProvider>
    </ErrorBoundary>
  );
}
