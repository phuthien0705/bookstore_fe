import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: []
};

export const publisherSlice = createSlice({
    name: 'publisher',
    initialState,
    reducers: {
        setPublishersGlobal: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setPublishersGlobal } = publisherSlice.actions;

export default publisherSlice.reducer;
