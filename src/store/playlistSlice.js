import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import playlistApi from "../api/playlistApi";

const playlistSlice = createSlice({
    name: 'playlist',
    initialState:{
        listPlaylist: [],
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchPlaylist.fulfilled, (state, action) => {
            state.listPlaylist.push(action.payload);
        })
    }
})

export const fetchPlaylist = createAsyncThunk('playlist/fetchPlaylist', async (playlistId) => {
    const total = await playlistApi.getPlaylist(playlistId)
    return total
})

export default playlistSlice;