import { getData } from '../api/client';

export async function getProjects(name = '', abortController) {
  const url = name.length === 0 ? '/user/projects' : `/user/projects?name=${name}`;
  return getData(url, abortController);
}
