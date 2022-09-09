import axiosClient from "./axiosClient";
const key = 'AIzaSyDZZnE3YXfKj_g6XrOYHc0jfrK3i3Jd7V4'
const videoApi = {
    getAll(){
        const url = `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=VN&key=${key}`;
        return axiosClient.get(url);
    },
}

export default videoApi;