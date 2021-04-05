import { getData } from '../api/client';

export async function getCities(abortController) {
  const url = `/locations`;
  return getData(url, abortController);
}
