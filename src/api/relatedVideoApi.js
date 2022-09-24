import axiosClient from "./axiosClient";
const key = "AIzaSyCQryOlAYFiQsFN3jxMqFxDJQVYMSzM9zU"
const relatedVideoApi = {
    getRelatedVideo(videoId){
        const url = `/search?part=snippet&maxResults=5&relatedToVideoId=${videoId}&type=video&key=${key}`;
        return axiosClient.get(url);
    },
}

export default relatedVideoApi;