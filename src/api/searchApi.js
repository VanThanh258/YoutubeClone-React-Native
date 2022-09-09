import axiosClient from "./axiosClient";
const key = 'AIzaSyDZZnE3YXfKj_g6XrOYHc0jfrK3i3Jd7V4'
const searchApi = {
    getAll(){
        const url = `/search?part=snippet&key=${key}`;
        return axiosClient.get(url);
    },
}

export default searchApi;