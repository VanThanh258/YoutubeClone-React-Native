import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recommendApi from '../api/recommendApi';
const recommendSlice = createSlice({
    name: 'recommend',
    initialState: {
        listWord: [],
        status: 'idle',
        id: 1,
    },
    reducers: {
        updateId(state, action) {
            state.id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecommend.fulfilled, (state, action) => {
            state.listWord = action.payload;
            state.status = 'idle';
        });
    },
});

export const recommendSliceAction = recommendSlice.actions;
export const fetchRecommend = createAsyncThunk(
    'recommend/fetchRecommend',
    async (text) => {
        const recommend = await recommendApi.get(text);
        return recommend.data[1];
    },
);

export default recommendSlice;
