import {configureStore} from '@reduxjs/toolkit';
import channelSlice from './store/channelSlice';
import nationSlice from './store/nationSlice';
import recommendSlice from './store/recommendSlice';
import searchSlice from './store/searchSlice';
import videoSlice from './store/videoSlice';
const store = configureStore({
    reducer:{
        video: videoSlice.reducer,
        channel: channelSlice.reducer,
        search: searchSlice.reducer,
        nation: nationSlice.reducer,
        recommend: recommendSlice.reducer
    }
})

export default store;

