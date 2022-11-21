import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarReducer';
import snackbarReducer from './snackbarReducer';

import adminDataReducer from './adminDataReducer';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        snackbar: snackbarReducer,

        adminData: adminDataReducer
    }
});
