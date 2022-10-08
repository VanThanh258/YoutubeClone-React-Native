import { createSlice } from '@reduxjs/toolkit';

const videoIdHistorySlice = createSlice({
    name: 'videoIdHistory',
    initialState: {
        listVideoIdHistory: [],
    },
    reducers: {
        saveListVideoID(state, action) {
            state.listVideoIdHistory = action.payload;
        },
    },
});

export const videoIdHistorySliceAction = videoIdHistorySlice.actions;

export default videoIdHistorySlice;
