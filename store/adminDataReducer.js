import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: null,
    authors: null,
    genres: null,
    publishers: null
};

export const adminDataSlice = createSlice({
    name: 'adminData',
    initialState,
    reducers: {
        setAuthorsGlobal: (state, action) => {
            state.authors = action.payload;
        },
        setGenresGlobal: (state, action) => {
            state.genres = action.payload;
        },
        setPublishersGlobal: (state, action) => {
            state.publishers = action.payload;
        },
        setBooksGlobal: (state, action) => {
            state.books = action.payload;
        }
    }
});

export const { setAuthorsGlobal, setGenresGlobal, setPublishersGlobal, setBooksGlobal } = adminDataSlice.actions;

export default adminDataSlice.reducer;
