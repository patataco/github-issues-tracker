import { PropsWithChildren } from 'react';

import Header from './Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex h-full">
        <div className="m-auto flex h-screen w-[600px] flex-col items-center border ">
          <Header />
          <div className="w-full flex-1 overflow-scroll">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
