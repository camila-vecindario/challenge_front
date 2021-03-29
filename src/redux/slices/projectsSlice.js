import { createSlice } from '@reduxjs/toolkit';

const projects = [];

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    list: projects,
    filter: -1,
    currentProject: null,
    projectLeads: [],
  },
  reducers: {
    load: (state, action) => {
      state.list = action.payload;
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
    add: (state, action) => {
      state.list = [action.payload, ...state.list];
    },
    updateCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    deleteCurrentProject: state => {
      state.currentProject = null;
    },
    loadLeads: (state, action) => {
      state.projectLeads = action.payload;
    },
  },
});

export const {
  add,
  updateFilter,
  deleteCurrentProject,
  load,
  loadLeads,
  updateCurrentProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
