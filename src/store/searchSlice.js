import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import searchApi from "../api/searchApi";
const searchSlice = createSlice({
    name: 'search',
    initialState:{
        listVideoSearch: [],
        status: 'idle',
        keyWord: '',
        searchChannel: [],
        searchPlaylist:[],
    },
    reducers:{
        updateKeyWord(state, action){
            state.keyWord = action.payload
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchVideoSearch.pending, (state, action) => {
            state.status = 'loadding'
        })
        .addCase(fetchVideoSearch.fulfilled, (state, action) => {
            const list = action.payload.items;
            for(let i=0; i<list.length;i++){
                if(list[i].id.kind === "youtube#video" ){
                    state.listVideoSearch.push(list[i])
                }else if(list[i].id.kind === "youtube#channel"){
                    state.searchChannel.push(list[i]);
                }else if(list[i].id.kind === "youtube#playlist"){
                    state.searchPlaylist.push(list[i]);
                }
            }
        })
    }
})

export const searchSliceAction = searchSlice.actions;

export const fetchVideoSearch = createAsyncThunk('search/fetchVideoSearch', async (keyWord) => {
    const search = await searchApi.getVideoSearch(keyWord);
    return search
})

export default searchSlice;