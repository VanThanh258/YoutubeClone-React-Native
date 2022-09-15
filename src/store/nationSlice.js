import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import nationApi from "../api/nationApi";
const nationSlice = createSlice({
    name: 'nation',
    initialState:{
        listNation: [],
        status: 'idle'
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchNation.pending, (state, action) => {
            state.status = 'loadding'
        })
        .addCase(fetchNation.fulfilled, (state, action) => {
            state.listNation = action.payload
            state.status = 'idle'
        })
    }
})


export const fetchNation = createAsyncThunk('nation/fetchNation', async () => {
    const nation = await nationApi.getNation();
    return nation.items
})

export default nationSlice;