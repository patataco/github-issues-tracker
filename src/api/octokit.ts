import { Octokit } from 'octokit';

import { Issue } from '@/context/IssueListProvider';

export const octokit = new Octokit({
  baseUrl: 'https://api.github.com/repos/facebook/react',
});

export const getIssuesPage = async (pageParam = 1) => {
  const { data } = await octokit.request(
    `GET /issues?state=open&sort=comments&per_page=12&page=${pageParam}`
  );
  return data;
};

export const getIssueDetails = async (id: number): Promise<Issue> => {
  const { data } = await octokit.request(`GET /issues/${id}`);
  return data;
};
