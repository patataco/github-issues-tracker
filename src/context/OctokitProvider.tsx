import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Endpoints } from '@octokit/types';

import { getIssuesPage, octokit } from '@/api/octokit';

export type Issue = Endpoints['GET /issues']['response']['data'][0];

export interface OctokitContextProps {
  issues: Issue[];
  issueDetail: Issue | null;
  fetchIssueDetails: (id: string | string[]) => void;
  isLoading: boolean;
  isError: boolean;
  error: { message?: string } | null;
  hasNextPage: boolean;
  setPageNum: Dispatch<SetStateAction<number>>;
}

export const OctokitContext = createContext<OctokitContextProps | undefined>(
  undefined
);

export const OctokitProvider = ({ children }: PropsWithChildren) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [issueDetail, setIssueDetail] = useState<Issue | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);
  const controller = new AbortController();

  const fetchIssues = async (pageNum: number) => {
    const { signal } = controller;

    try {
      const data = await getIssuesPage(pageNum);
      setIssues((prev) => {
        const newIssues = data.filter(
          (newIssue: Issue) =>
            !prev.some((prevIssue) => prevIssue.id === newIssue.id)
        );
        return [...prev, ...newIssues];
      });

      setHasNextPage(Boolean(data.length));
    } catch (e: any) {
      if (signal.aborted) return;
      setIsError(true);
      setError({ message: e.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});
    fetchIssues(pageNum);
  }, [pageNum]);

  const fetchIssueDetails = async (id: string | string[]) => {
    if (id) {
      const { data } = await octokit.request(`GET /issues/${id}`);
      setIssueDetail(data);
    }
  };

  return (
    <OctokitContext.Provider
      value={{
        issues,
        issueDetail,
        fetchIssueDetails,
        isLoading,
        isError,
        error,
        hasNextPage,
        setPageNum,
      }}
    >
      {children}
    </OctokitContext.Provider>
  );
};

export const useOctokitContext = () => {
  const context = useContext(OctokitContext);
  if (!context) {
    throw new Error('Cannot find OctokitProvider');
  }
  return context;
};
