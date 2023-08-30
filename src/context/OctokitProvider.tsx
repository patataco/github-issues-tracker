import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Endpoints } from '@octokit/types';

import { octokit } from '@/api/octokit';

export type Issue = Endpoints['GET /issues']['response']['data'][0];

export interface OctokitContextProps {
  issues: Issue[];
}

export const OctokitContext = createContext<OctokitContextProps | undefined>(
  undefined
);

export const OctokitProvider = ({ children }: PropsWithChildren) => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const fetchIssues = async () => {
    const { data } = await octokit.request('GET /issues');
    setIssues(data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <OctokitContext.Provider value={{ issues }}>
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
