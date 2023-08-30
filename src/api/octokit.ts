import { Octokit } from 'octokit';

export const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_OCTOKIT_TOKEN,
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
});
