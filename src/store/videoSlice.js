import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import videoApi from "../api/videoApi";
const videoSlice = createSlice({
    name: 'video',
    initialState:{
        listVideo: [],
        status: 'idle',
        videoId: '',
    },
    reducers:{
        updateVideoId(state, action){
            state.videoId = action.payload;
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchVideo.pending, (state, action) => {
            state.status = 'loadding'
        })
        .addCase(fetchVideo.fulfilled, (state, action) => {
            state.listVideo = [...state.listVideo, ...action.payload]
            state.status = 'idle'
        })
        .addCase(fetchVideoNation.fulfilled, (state, action) => {
            state.listVideo = [...state.listVideo, ...action.payload]
        })
    }
})

export const videoSliceAction = videoSlice.actions

export const fetchVideo = createAsyncThunk('video/fetchVideo', async () => {
    const video = await videoApi.getVideo();
    return video.items
})

export const fetchVideoNation = createAsyncThunk('video/fetchVideoNation', async (id) => {
    const videoNation = await videoApi.getVideoNation(id);
    return videoNation.items
})

export default videoSlice;