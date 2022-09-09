import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import videoApi from "../api/videoApi";
const videoSlice = createSlice({
    name: 'video',
    initialState:{
        listVideo: [],
        status: 'idle'
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchVideo.fulfilled, (state, action) => {
            state.listVideo = action.payload;
        })
    }
})

export const fetchVideo = createAsyncThunk('video/fetchVideo', async () => {
    const video = await videoApi.getAll();
    return video
})

export default videoSlice;