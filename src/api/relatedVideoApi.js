import axiosClient from "./axiosClient";
const key = "AIzaSyBExIRi0i7yTE9MkhJYyGVDdKx_3qv0oDk"
const relatedVideoApi = {
    getRelatedVideo(videoId){
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&relatedToVideoId=${videoId}&type=video&key=${key}`;
        return axiosClient.get(url);
    },
}

export default relatedVideoApi;