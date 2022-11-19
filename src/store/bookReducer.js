import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null
};

export const bookReducer = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooksGlobal: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setBooksGlobal } = bookReducer.actions;

export default bookReducer.reducer;
