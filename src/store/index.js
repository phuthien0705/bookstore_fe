import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarReducer';
import snackbarReducer from './snackbarReducer';
import genreReducer from './genreReducer';
import authorReducer from './authorReducer';
import publisherReducer from './publisherReducer';
import bookReducer from './bookReducer';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        snackbar: snackbarReducer,
        genres: genreReducer,
        authors: authorReducer,
        publishers: publisherReducer,
        books: bookReducer
    }
});
