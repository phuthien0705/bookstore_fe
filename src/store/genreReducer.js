import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null
};

export const genreSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        setGenresGlobal: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setGenresGlobal } = genreSlice.actions;

export default genreSlice.reducer;
