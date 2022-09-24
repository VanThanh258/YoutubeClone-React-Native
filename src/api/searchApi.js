import axiosClient from "./axiosClient";
const key = "AIzaSyCQryOlAYFiQsFN3jxMqFxDJQVYMSzM9zU"
const searchApi = {
    getVideoSearch(keyWord){
        const url = `/search?part=snippet&maxResults=25&q=${keyWord}&type=video&key=${key}`;
        return axiosClient.get(url);
    },
    getRelatedVideo(videoId){
        const url = `/search?part=snippet&maxResults=5&relatedToVideoId=${videoId}&type=video&key=${key}`;
        return axiosClient.get(url);
    },
}

export default searchApi;