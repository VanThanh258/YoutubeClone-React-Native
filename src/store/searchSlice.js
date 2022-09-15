import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import searchApi from "../api/searchApi";
const searchSlice = createSlice({
    name: 'search',
    initialState:{
        listVideoSearch: [],
        status: 'idle'
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchVideoSearch.pending, (state, action) => {
            state.status = 'loadding'
        })
        .addCase(fetchVideoSearch.fulfilled, (state, action) => {
            state.listVideoSearch = action.payload;
            state.status = 'idle'
        })
    }
})

export const fetchVideoSearch = createAsyncThunk('search/fetchVideoSearch', async (keyWord) => {
    const search = await searchApi.getVideoSearch(keyWord);
    return search.items
})

export default searchSlice;