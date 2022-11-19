import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: []
};

export const authorSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        setAuthorsGlobal: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setAuthorsGlobal } = authorSlice.actions;

export default authorSlice.reducer;
