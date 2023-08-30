import type { AppProps } from 'next/app';

import '@/styles/globals.css';

import { OctokitProvider } from '@/context/OctokitProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OctokitProvider>
      <Component {...pageProps} />
    </OctokitProvider>
  );
}
