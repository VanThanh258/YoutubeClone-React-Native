import { configureStore } from '@reduxjs/toolkit';
import channelSlice from './store/channelSlice';
import commentSlice from './store/commentSlice';
import playlistSlice from './store/playlistSlice';
import recommendSlice from './store/recommendSlice';
import relatedVideoSlice from './store/relatedVideoSilce';
import searchSlice from './store/searchSlice';
import videoCategoriesSlice from './store/videoCategoriesSlice';
import videoSlice from './store/videoSlice';
const store = configureStore({
    reducer: {
        video: videoSlice.reducer,
        channel: channelSlice.reducer,
        search: searchSlice.reducer,
        recommend: recommendSlice.reducer,
        relatedVideo: relatedVideoSlice.reducer,
        comment: commentSlice.reducer,
        videoCategories: videoCategoriesSlice.reducer,
        playlist: playlistSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     immutableCheck: false,
    //     serializableCheck: false,
    //   })
});

export default store;
