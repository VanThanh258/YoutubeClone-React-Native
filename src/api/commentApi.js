import axiosClient from "./axiosClient";
const key = "AIzaSyAjJPWqSvuu7F-sDjy8kxjdWnvL2KXTGUo"
const commentApi = {
    getComment(videoId){
        const url = `/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${key}`;
        return axiosClient.get(url);
    },
}

export default commentApi;