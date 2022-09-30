import axiosClient from './axiosClient';
const key = 'AIzaSyBExIRi0i7yTE9MkhJYyGVDdKx_3qv0oDk';
const searchApi = {
    getVideoSearch(keyWord) {
        const url = `/search?part=snippet&maxResults=25&q=${keyWord}&key=${key}`;
        return axiosClient.get(url);
    },
    getRelatedVideo(videoId) {
        const url = `/search?part=snippet&maxResults=5&relatedToVideoId=${videoId}&type=video&key=${key}`;
        return axiosClient.get(url);
    },
};

export default searchApi;
