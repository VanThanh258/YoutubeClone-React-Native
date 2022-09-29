import axiosClient from "./axiosClient";
const key = "AIzaSyCQryOlAYFiQsFN3jxMqFxDJQVYMSzM9zU"
const commentApi = {
    getComment(videoId){
        const url = `/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${key}`;
        return axiosClient.get(url);
    },
}

export default commentApi;