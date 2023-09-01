import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@/styles/markdown.css';

import { ErrorBoundary } from '@/components/ErrorBoundary';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ErrorBoundary
      renderFallback={(props) => (
        <div>
          에러가 발생했습니다. <button onClick={props.reset}>재시도</button>
        </div>
      )}
    >
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  );
}
