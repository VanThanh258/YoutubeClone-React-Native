import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import channelApi from '../api/channelApi';
const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        listChannel: [],
        channelId: '',
    },
    reducers: {
        updateChannelId(state, action) {
            state.channelId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChannel.fulfilled, (state, action) => {
            const channel = state.listChannel.find(
                (item) => item.id === action.payload.items[0].id,
            );
            if (channel) {
                state.listChannel = [...state.listChannel];
            } else {
                state.listChannel = [
                    ...state.listChannel,
                    ...action.payload.items,
                ];
            }
        });
    },
});
export const channelSliceAction = channelSlice.actions;
export const fetchChannel = createAsyncThunk(
    'channel/fetchChannel',
    async (id) => {
        const channel = await channelApi.getChannel(id);
        return channel;
    },
);

export default channelSlice;
