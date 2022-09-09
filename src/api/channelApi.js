import axiosClient from "./axiosClient";
const key = 'AIzaSyDZZnE3YXfKj_g6XrOYHc0jfrK3i3Jd7V4'
const channelApi = {
    getAll(){
        const url = `/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCE_M8A5yxnLfW0KghEeajjw&key=${key}`;
        return axiosClient.get(url);
    },
}

export default channelApi;