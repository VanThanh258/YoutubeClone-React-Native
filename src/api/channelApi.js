import axiosClient from "./axiosClient";
const key = "AIzaSyAjJPWqSvuu7F-sDjy8kxjdWnvL2KXTGUo"
const channelApi = {
    getChannel(id){
        const url = `/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&maxResults=50&key=${key}`;
        return axiosClient.get(url);
    },
}

export default channelApi;