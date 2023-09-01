import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { getIssueDetails } from '@/api/octokit';

import { Issue } from './IssueListProvider';

export interface IssueContextProps {
  issueDetail: Issue | null;
  fetchIssueDetails: (id: number) => Promise<void>;
  isLoading: boolean;
  isInitialLoad: boolean;
}

export const IssueContext = createContext<IssueContextProps | undefined>(
  undefined
);

export const IssueContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isError, setIsError] = useState(false);
  const [issueDetail, setIssueDetail] = useState<Issue | null>(null);

  const fetchIssueDetails = async (id: number) => {
    setIssueDetail(null);
    try {
      setIsLoading(true);
      setIsInitialLoad(false);
      if (id) {
        const data = await getIssueDetails(id);
        setIssueDetail(data);
      }
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isError) {
    throw new Error('API 호출 중 에러 발생');
  }

  return (
    <IssueContext.Provider
      value={{
        issueDetail,
        fetchIssueDetails,
        isLoading,
        isInitialLoad,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};

export const useIssueContext = () => {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error('Cannot find IssueContext');
  }
  return context;
};
