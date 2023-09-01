import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@/styles/markdown.css';

import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary
      renderFallback={(props) => (
        <div>
          에러가 발생했습니다. <button onClick={props.reset}>재시도</button>
        </div>
      )}
    >
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
