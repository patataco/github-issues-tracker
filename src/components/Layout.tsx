import { PropsWithChildren } from 'react';

import Error from './Error';
import { ErrorBoundary } from './ErrorBoundary';
import Header from './Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex h-full">
        <div className="m-auto flex h-screen w-[600px] flex-col items-center border ">
          <Header />
          <ErrorBoundary
            renderFallback={({ error, reset }) => (
              <Error error={error} reset={reset} />
            )}
          >
            <div className="w-full flex-1 overflow-scroll">{children}</div>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default Layout;
