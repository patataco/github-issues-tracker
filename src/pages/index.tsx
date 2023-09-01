import React from 'react';

import IssueList from '@/components/IssueList';
import Layout from '@/components/Layout';
import { IssueListContextProvider } from '@/context/IssueListProvider';
import { IssueListFetcher } from '@/fetcher/IssueListFetcher';

export default function Home() {
  return (
    <IssueListContextProvider>
      <IssueListFetcher>
        <IssueList />
      </IssueListFetcher>
    </IssueListContextProvider>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
