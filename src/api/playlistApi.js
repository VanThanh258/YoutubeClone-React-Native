import axiosClient from './axiosClient';
const key = 'AIzaSyAjJPWqSvuu7F-sDjy8kxjdWnvL2KXTGUo';
const playlistApi = {
    getPlaylist(playlistId) {
        const url = `/playlistItems?part=snippet&maxResults=5&playlistId=${playlistId}&key=${key}`;
        return axiosClient.get(url);
    },
};

export default playlistApi;
