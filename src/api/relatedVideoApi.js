import axiosClient from './axiosClient';
const key = 'AIzaSyBExIRi0i7yTE9MkhJYyGVDdKx_3qv0oDk';
const relatedVideoApi = {
    getRelatedVideo(videoId) {
        const url = `/search?part=snippet&maxResults=10&relatedToVideoId=${videoId}&type=video&key=${key}`;
        return axiosClient.get(url);
    },
};

export default relatedVideoApi;
