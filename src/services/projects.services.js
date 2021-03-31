import { getData, postData } from '../api/client';

export async function getProjects(type, abortController) {
  const url = type < 0 ? '/projects' : `/projects?type=${type}`;
  return getData(url, abortController);
}

export async function findProjectById(id, abortController) {
  const url = `/projects/${id}`;
  return getData(url, abortController);
}

export async function createLead(projectId, data) {
  const url = `/projects/${projectId}/leads`;
  return postData(url, data);
}

export async function getProjectLeads(id, abortController) {
  const url = `/projects/${id}/leads`;
  return getData(url, abortController);
}
