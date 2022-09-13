import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import videoApi from "../api/videoApi";
const videoSlice = createSlice({
    name: 'video',
    initialState:{
        listVideo: {},
        status: 'idle'
    },
    reducers:{
        setListVideo(state, action){
            state.listVideo = action.payload
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchVideo.pending, (state, action) => {
            state.status = 'loadding'
        })
        .addCase(fetchVideo.fulfilled, (state, action) => {
            state.listVideo = action.payload
            state.status = 'idle'
        })
    }
})

export const videoSliceAction = videoSlice.actions;

export const fetchVideo = createAsyncThunk('video/fetchVideo', async () => {
    const video = await videoApi.getAll();
    return video
})

export default videoSlice;