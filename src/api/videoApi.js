import axiosClient from './axiosClient';
const key = 'AIzaSyAjJPWqSvuu7F-sDjy8kxjdWnvL2KXTGUo';
const videoApi = {
    getVideoMostPopular() {
        const url = `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=VN&key=${key}`;
        return axiosClient.get(url);
    },
    getVideo(videoId) {
        const url = `/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${key}`;
        return axiosClient.get(url);
    },
    getVideoByTopic(videoCategoryId) {
        const url = `/search?part=snippet&maxResults=25&regionCode=VN&type=video&videoCategoryId=${videoCategoryId}&key=${key}`;
        return axiosClient.get(url);
    },
};

export default videoApi;
