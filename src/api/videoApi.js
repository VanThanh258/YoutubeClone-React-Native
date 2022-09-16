import axiosClient from "./axiosClient";
const key = "AIzaSyBExIRi0i7yTE9MkhJYyGVDdKx_3qv0oDk"
const videoApi = {
    getVideo(){
        const url = `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=VN&key=${key}`;
        return axiosClient.get(url);
    },
    // getVideoNation(id){
    //     const url = `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=${id}&key=${key}`;
    //     return axiosClient.get(url);
    // },
}

export default videoApi;