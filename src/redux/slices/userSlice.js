import { createSlice } from '@reduxjs/toolkit';
import { ADMIN, HOST } from '../../constants/userConstants';

const mockUser = {
  id: 1,
  firstName: 'Juan',
  lastName: 'Simulador',
  email: 'juanitosimulando@gmail.com',
  picture: 'https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg',
  phone: '321 745 6359',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: mockUser,
    role: ADMIN,
  },
  reducers: {
    logged: (state, action) => {
      state.user = action.payload;
    },
    logOut: state => {
      state.user = null;
      state.role = HOST;
    },
    updateRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { logged, logOut, updateRole } = userSlice.actions;

export default userSlice.reducer;
