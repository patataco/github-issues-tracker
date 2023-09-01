import {
  createContext,
  Dispatch,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react';
import { Endpoints } from '@octokit/types';

import { getIssuesPage } from '@/api/octokit';

export type Issue = Endpoints['GET /issues']['response']['data'][0];

export interface IssueListContextProps {
  issues: Issue[];
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  setPageNum: Dispatch<SetStateAction<number>>;
  intObserver: MutableRefObject<IntersectionObserver | undefined>;
  fetchIssues: (pageNum: number) => Promise<void>;
  pageNum: number;
  isInitialLoad: boolean;
}

export const IssueListContext = createContext<
  IssueListContextProps | undefined
>(undefined);

export const IssueListContextProvider = ({ children }: PropsWithChildren) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const controller = useRef(new AbortController());

  const intObserver = useRef<IntersectionObserver>();

  const fetchIssues = async (pageNum: number) => {
    const { signal } = controller.current;

    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  if (isError) {
    throw new Error('API 호출 중 에러 발생');
  }

  return (
    <IssueListContext.Provider
      value={{
        issues,
        isLoading,
        isError,
        hasNextPage,
        setPageNum,
        intObserver,
        fetchIssues,
        pageNum,
        isInitialLoad,
      }}
    >
      {children}
    </IssueListContext.Provider>
  );
};

export const useIssueListContext = () => {
  const context = useContext(IssueListContext);
  if (!context) {
    throw new Error('Cannot find IssueListContext');
  }
  return context;
};
