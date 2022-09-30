import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import videoApi from '../api/videoApi';
const videoSlice = createSlice({
    name: 'video',
    initialState: {
        listVideoMostPopular: [],
        status: 'idle',
        videoId: '',
        listVideo: [],
        listVideoByTopic: [],
    },
    reducers: {
        updateVideoId(state, action) {
            state.videoId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideo.pending, (state, action) => {
                state.status = 'loadding';
            })
            .addCase(fetchVideo.fulfilled, (state, action) => {
                state.listVideoMostPopular = action.payload.items;
                state.status = 'idle';
            })
            .addCase(fetchOneVideo.fulfilled, (state, action) => {
                const video = state.listVideo.find(
                    (item) => item.id === action.payload.items[0].id,
                );
                if (video) {
                    state.listVideo = [...state.listVideo];
                } else {
                    state.listVideo = [
                        ...state.listVideo,
                        ...action.payload.items,
                    ];
                }
            })
            .addCase(fetchVideoByTopic.fulfilled, (state, action) => {
                state.listVideoByTopic = action.payload.items;
            });
    },
});

export const videoSliceAction = videoSlice.actions;

export const fetchVideo = createAsyncThunk('video/fetchVideo', async () => {
    const video = await videoApi.getVideo();
    return video;
});

export const fetchOneVideo = createAsyncThunk(
    'video/fetchOneVideo',
    async (videoId) => {
        const video = await videoApi.getOneVideo(videoId);
        return video;
    },
);

export const fetchVideoByTopic = createAsyncThunk(
    'video/fetchVideoByTopic',
    async (videoCategoryId) => {
        const video = await videoApi.getVideoByTopic(videoCategoryId);
        return video;
    },
);

export default videoSlice;
