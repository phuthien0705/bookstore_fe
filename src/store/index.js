import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarReducer';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer
    }
});
