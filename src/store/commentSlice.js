import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentApi from "../api/commentApi";

const commentSlice = createSlice({
    name: 'comment',
    initialState:{
        listComment:[]
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchComment.fulfilled, (state, action) => {
            state.listComment =  action.payload.items
        })
    }
})

export const fetchComment = createAsyncThunk('comment/fetchComment', async (videoId) => {
    const comment = await commentApi.getComment(videoId);
    return comment;
})

export default commentSlice;