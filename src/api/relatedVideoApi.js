import axiosClient from './axiosClient';
const key = 'AIzaSyAjJPWqSvuu7F-sDjy8kxjdWnvL2KXTGUo';
const relatedVideoApi = {
    getRelatedVideo(videoId) {
        const url = `/search?part=snippet&maxResults=10&relatedToVideoId=${videoId}&type=video&key=${key}`;
        return axiosClient.get(url);
    },
};

export default relatedVideoApi;
