import IssueDetails from '@/components/IssueDetails';
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
