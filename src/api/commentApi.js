import axiosClient from './axiosClient';
const key = 'AIzaSyBExIRi0i7yTE9MkhJYyGVDdKx_3qv0oDk';
const commentApi = {
    getComment(videoId) {
        const url = `/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${key}`;
        return axiosClient.get(url);
    },
};

export default commentApi;
