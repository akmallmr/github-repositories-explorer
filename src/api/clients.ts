import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const TOKEN_GITHUB = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
//logic with or without github token

const headers: Record<string, string> = {
  Accept: 'application/vnd.github.v3+json',
};

if (TOKEN_GITHUB) {
  headers.Authorization = `token ${TOKEN_GITHUB}`;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers,
});

export default api;
