import {configureStore} from '@reduxjs/toolkit';
import channelSlice from './store/channelSlice';
import searchSlice from './store/searchSlice';
import videoSlice from './store/videoSlice';
const store = configureStore({
    reducer:{
        video: videoSlice.reducer,
        channel: channelSlice.reducer,
        search: searchSlice.reducer,
    }
})

export default store;

