import { createSelector } from 'reselect';

export const selectProjects = state => state.projects.list;

export const selectProjectsName = createSelector(
  state => state.projects.list,
  projects =>
    projects.map(project => {
      return { id: project.id, name: project.name };
    }),
);

export const selectCurrentProject = state => state.projects.currentProject;

export const selectProjectLeads = state => state.projects.projectLeads;
