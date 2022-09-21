import axiosClient from "./axiosClient";
const key = "AIzaSyCQryOlAYFiQsFN3jxMqFxDJQVYMSzM9zU"
const videoApi = {
    getVideo(){
        const url = `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=VN&key=${key}`;
        return axiosClient.get(url);
    },
    getOneVideo(videoId){
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${key}`;
        return axiosClient.get(url);
    }
}

export default videoApi;