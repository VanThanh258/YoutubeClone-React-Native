import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { acc } from "react-native-reanimated";
import videoApi from "../api/videoApi";
const videoSlice = createSlice({
    name: 'video',
    initialState:{
        listVideo: [],
        status: 'idle',
        videoId: '',
        oneVideo:[],
        listVideoByTopic:[],
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
            state.listVideo = [...state.listVideo,...action.payload.items]
            state.status = 'idle'
        })
        .addCase(fetchOneVideo.fulfilled, (state, action) => {
            state.oneVideo = [...state.oneVideo, ...action.payload.items];
        })
        .addCase(fetchVideoByTopic.fulfilled, (state, action) => {
            state.listVideoByTopic = action.payload.items
        })
    }
})

export const videoSliceAction = videoSlice.actions

export const fetchVideo = createAsyncThunk('video/fetchVideo', async () => {
    const video = await videoApi.getVideo();
    return video
})

export const fetchOneVideo = createAsyncThunk('video/fetchOneVideo', async (videoId) => {
    const video = await videoApi.getOneVideo(videoId);
    return video
})

export const fetchVideoByTopic = createAsyncThunk('video/fetchVideoByTopic', async (videoCategoryId) => {
    const video = await videoApi.getVideoByTopic(videoCategoryId);
    return video
})

export default videoSlice;