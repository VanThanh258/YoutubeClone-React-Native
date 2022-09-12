import axiosClient from "./axiosClient";
const key = "AIzaSyBExIRi0i7yTE9MkhJYyGVDdKx_3qv0oDk"
const channelApi = {
    getChannel(id){
        const url = `/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&maxResults=50&key=${key}`;
        return axiosClient.get(url);
    },
}

export default channelApi;