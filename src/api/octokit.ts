import { Octokit } from 'octokit';

import { Issue } from '@/context/IssueListProvider';

export const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_OCTOKIT_TOKEN,
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export const getIssuesPage = async (pageParam = 1) => {
  const { data } = await octokit.request(
    `GET /issues?state=open&sort=comments&page=${pageParam}`
  );
  return data;
};

export const getIssueDetails = async (id: number): Promise<Issue> => {
  const { data } = await octokit.request(`GET /issues/${id}`);
  return data;
};
