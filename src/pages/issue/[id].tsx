import IssueDetails from '@/components/IssueDetails';
import Layout from '@/components/Layout';
import { IssueContextProvider } from '@/context/IssueProvider';
import { IssueFetcher } from '@/fetcher/IssueFetcher';

const Issue = () => {
  return (
    <IssueContextProvider>
      <IssueFetcher>
        <IssueDetails />
      </IssueFetcher>
    </IssueContextProvider>
  );
};

export default Issue;

Issue.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
