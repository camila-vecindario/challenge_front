import { createSlice } from '@reduxjs/toolkit';

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    list: [],
    currentProject: null,
    projectLeads: [],
  },
  reducers: {
    load: (state, action) => {
      state.list = action.payload;
    },
    add: (state, action) => {
      state.list = [action.payload, ...state.list];
    },
    updateCurrent: (state, action) => {
      state.currentProject = state.list.find(project => project.id === action.payload);
    },
    deleteCurrent: state => {
      state.currentProject = null;
    },
    loadLeads: (state, action) => {
      state.projectLeads = action.payload;
    },
  },
});

export const { add, deleteCurrent, load, loadLeads, updateCurrent } = projectsSlice.actions;

export default projectsSlice.reducer;
