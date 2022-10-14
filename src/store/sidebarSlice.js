import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: true,
    isOpen: []
};

export const sidebarSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.open = !state.open;
        },
        setMenu: (state, action) => {
            state.open = action.payload;
        },
        menuOpen: (state, action) => {
            state.isOpen = [action.payload];
        }
    }
});

export const { toggleSidebar, setMenu, menuOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
