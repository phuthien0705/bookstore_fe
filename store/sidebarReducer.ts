import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: true,
  isOpen: [],
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.open = !state.open;
    },
    setMenu: (state, action) => {
      state.open = action.payload;
    },
    menuOpen: (state, action: any) => {
      state.isOpen = action && [action?.payload];
    },
  },
});

export const { toggleSidebar, setMenu, menuOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
