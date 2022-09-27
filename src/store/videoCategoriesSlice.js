import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import videoCategoriesApi from "../api/videoCategoriesApi";

const videoCategoriesSlice = createSlice({
    name: 'videoCategories',
    initialState: {
        listVideoCategories: []
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchVideoCategories.fulfilled, (state, action) => {
            state.listVideoCategories = action.payload.items
        })
    }
})

export const fetchVideoCategories = createAsyncThunk('videoCategories/fetchVideoCategories', async () => {
    const video = await videoCategoriesApi.getVideoCategories();
    return video
})

export default videoCategoriesSlice