import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { getIssueDetails } from '@/api/octokit';

import { Issue } from './IssueListProvider';

export interface IssueContextProps {
  issueDetail: Issue | null;
  fetchIssueDetails: (id: number) => Promise<Issue>;
  setIssueDetail: Dispatch<SetStateAction<Issue | null>>;
}

export const IssueContext = createContext<IssueContextProps | undefined>(
  undefined
);

export const IssueContextProvider = ({ children }: PropsWithChildren) => {
  const [issueDetail, setIssueDetail] = useState<Issue | null>(null);

  const fetchIssueDetails = (id: number): Promise<Issue> => {
    if (id) {
      const data = getIssueDetails(id);
      return data;
    }
    throw new Error('Invalid ID');
  };

  return (
    <IssueContext.Provider
      value={{ issueDetail, fetchIssueDetails, setIssueDetail }}
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
