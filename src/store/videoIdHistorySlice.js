import { createSlice } from '@reduxjs/toolkit';

const videoIdHistorySlice = createSlice({
    name: 'videoIdHistory',
    initialState: {
        listVideoIdHistory: [],
    },
    reducers: {
        saveListIdVideo(state, action) {
            state.listVideoIdHistory = action.payload;
        },
    },
});

export const videoIdHistorySliceAction = videoIdHistorySlice.actions;

export default videoIdHistorySlice;
