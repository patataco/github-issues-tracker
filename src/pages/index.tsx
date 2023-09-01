import React from 'react';

import IssueList from '@/components/IssueList';
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
