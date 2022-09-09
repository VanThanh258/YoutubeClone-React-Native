import {configureStore} from '@reduxjs/toolkit';
import videoSlice from './store/videoSlice';
const store = configureStore({
    reducer:{
        video: videoSlice.reducer,
    }
})

export default store;

