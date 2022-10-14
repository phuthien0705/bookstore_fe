import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import sidebarReducer from './sidebarSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        sidebar: sidebarReducer
    }
});
