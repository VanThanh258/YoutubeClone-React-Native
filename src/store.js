import {configureStore} from '@reduxjs/toolkit';
import channelSlice from './store/channelSlice';
import videoSlice from './store/videoSlice';
const store = configureStore({
    reducer:{
        video: videoSlice.reducer,
        channel: channelSlice.reducer,
    }
})

export default store;

