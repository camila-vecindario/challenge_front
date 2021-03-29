import { getData } from '../helpers/client';

export async function getProjects(type, abortController) {
  const url = type < 0 ? '/projects' : `/projects?type=${type}`;
  return getData(url, abortController);
}
