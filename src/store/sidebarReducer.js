import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: true,
    isOpen: []
};

export const sidebarReducer = createSlice({
    name: 'sidebar',
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

export const { toggleSidebar, setMenu, menuOpen } = sidebarReducer.actions;

export default sidebarReducer.reducer;
