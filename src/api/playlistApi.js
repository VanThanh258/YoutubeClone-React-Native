import axiosClient from './axiosClient';
const key = 'AIzaSyBExIRi0i7yTE9MkhJYyGVDdKx_3qv0oDk';
const playlistApi = {
    getPlaylist(playlistId) {
        const url = `/playlistItems?part=snippet&maxResults=5&playlistId=${playlistId}&key=${key}`;
        return axiosClient.get(url);
    },
};

export default playlistApi;
